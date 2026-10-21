-- MesDémarches : espace administrateur + protection des données (RGPD)
-- À coller dans Supabase > SQL Editor, puis "Run". Peut être relancé sans risque.

-- ---------------------------------------------------------------------------
-- 1. Administrateurs
-- ---------------------------------------------------------------------------
create table if not exists public.admin_emails (
  email text primary key check (email = lower(email))
);
alter table public.admin_emails enable row level security;
-- Aucune policy : personne ne lit ni ne modifie cette table via l'API.
-- L'ajout d'un administrateur se fait uniquement dans le SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_emails
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2. Offres et prix
-- ---------------------------------------------------------------------------
create table if not exists public.offers (
  id text primary key check (id ~ '^[a-z0-9-]{2,40}$'),
  name text not null check (char_length(name) between 2 and 80),
  tagline text not null default '' check (char_length(tagline) <= 160),
  price numeric(8, 2) not null check (price > 0 and price < 10000),
  billing text not null check (billing in ('unique', 'mensuel')),
  duration text not null default '' check (char_length(duration) <= 120),
  includes text[] not null default '{}',
  excludes text[] not null default '{}',
  response_time text not null default '' check (char_length(response_time) <= 300),
  cancellation text not null default '' check (char_length(cancellation) <= 300),
  highlighted boolean not null default false,
  active boolean not null default true,
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.offers enable row level security;
drop policy if exists "offres visibles" on public.offers;
create policy "offres visibles" on public.offers for select using (active or public.is_admin());
drop policy if exists "offres admin" on public.offers;
create policy "offres admin" on public.offers for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 3. Guides
-- ---------------------------------------------------------------------------
create table if not exists public.guides (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 5 and 160),
  description text not null check (char_length(description) between 10 and 300),
  category text not null,
  reading_minutes integer not null default 5 check (reading_minutes between 1 and 60),
  intro text not null default '',
  steps jsonb not null default '[]',
  checklist jsonb not null default '[]',
  glossary jsonb not null default '[]',
  source_ids text[] not null default '{}',
  last_verified date,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);
alter table public.guides enable row level security;
drop policy if exists "guides publiés visibles" on public.guides;
create policy "guides publiés visibles" on public.guides for select
  using (status = 'published' or public.is_admin());
drop policy if exists "guides admin" on public.guides;
create policy "guides admin" on public.guides for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 4. Visibilité des services (le contenu reste dans le code)
-- ---------------------------------------------------------------------------
create table if not exists public.service_visibility (
  id text primary key,
  kind text not null check (kind in ('domain', 'item')),
  active boolean not null,
  updated_at timestamptz not null default now()
);
alter table public.service_visibility enable row level security;
drop policy if exists "visibilité lisible" on public.service_visibility;
create policy "visibilité lisible" on public.service_visibility for select using (true);
drop policy if exists "visibilité admin" on public.service_visibility;
create policy "visibilité admin" on public.service_visibility for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 5. Demandes reçues (contact, rendez-vous) — données personnelles
-- ---------------------------------------------------------------------------
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  kind text not null check (kind in ('contact', 'rendez-vous')),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 160),
  data jsonb not null default '{}',
  consent_at timestamptz not null,
  consent_version text not null,
  status text not null default 'nouveau' check (status in ('nouveau', 'en_cours', 'traite')),
  created_at timestamptz not null default now()
);
create index if not exists requests_email_idx on public.requests (lower(email));
create index if not exists requests_created_idx on public.requests (created_at);
alter table public.requests enable row level security;
-- Le public peut uniquement déposer une demande (jamais la relire).
drop policy if exists "dépôt public" on public.requests;
create policy "dépôt public" on public.requests for insert to anon, authenticated
  with check (status = 'nouveau' and consent_at is not null);
drop policy if exists "demandes admin lecture" on public.requests;
create policy "demandes admin lecture" on public.requests for select to authenticated using (public.is_admin());
drop policy if exists "demandes admin modification" on public.requests;
create policy "demandes admin modification" on public.requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "demandes admin suppression" on public.requests;
create policy "demandes admin suppression" on public.requests for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- 6. Journal RGPD (exports, suppressions, purges) — sans donnée personnelle
-- ---------------------------------------------------------------------------
create table if not exists public.privacy_log (
  id bigint generated always as identity primary key,
  action text not null check (action in ('export', 'suppression', 'purge')),
  details text not null default '',
  performed_by text not null default 'système',
  created_at timestamptz not null default now()
);
alter table public.privacy_log enable row level security;
drop policy if exists "journal admin lecture" on public.privacy_log;
create policy "journal admin lecture" on public.privacy_log for select to authenticated using (public.is_admin());
drop policy if exists "journal admin ajout" on public.privacy_log;
create policy "journal admin ajout" on public.privacy_log for insert to authenticated with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 7. Purge automatique : demandes de plus de 12 mois
-- ---------------------------------------------------------------------------
create or replace function public.purge_expired_requests()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted integer;
begin
  delete from public.requests where created_at < now() - interval '12 months';
  get diagnostics deleted = row_count;
  insert into public.privacy_log (action, details)
    values ('purge', deleted || ' demande(s) de plus de 12 mois supprimée(s)');
  return deleted;
end;
$$;
-- Non appelable depuis l'API : uniquement par la tâche planifiée ci-dessous.
revoke all on function public.purge_expired_requests() from public, anon, authenticated;

-- Tâche quotidienne à 3 h (UTC) si l'extension pg_cron est disponible.
do $$
begin
  create extension if not exists pg_cron;
  perform cron.unschedule(jobid) from cron.job where jobname = 'purge-demandes';
  perform cron.schedule('purge-demandes', '0 3 * * *', 'select public.purge_expired_requests()');
exception when others then
  raise notice 'pg_cron indisponible : utilisez le bouton de purge dans l''espace admin.';
end;
$$;
