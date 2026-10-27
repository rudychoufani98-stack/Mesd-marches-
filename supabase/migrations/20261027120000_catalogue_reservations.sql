-- MesDémarches : catalogue (catégories + services), disponibilités et réservations.
-- À coller dans Supabase > SQL Editor (projet MesDémarches), puis « Run ». Peut être relancé sans risque.
-- Ensuite : espace admin > Catalogue > « Importer le catalogue ».

-- ---------------------------------------------------------------------------
-- 1. Catégories (prix fixe par catégorie) et services
-- ---------------------------------------------------------------------------
create table if not exists public.service_categories (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(id) <= 40),
  kind text not null default 'particulier' check (kind in ('particulier', 'business')),
  name text not null check (char_length(name) between 2 and 80),
  description text not null default '' check (char_length(description) <= 300),
  price numeric(8, 2) not null check (price >= 0 and price < 100000),
  price_from boolean not null default false,
  icon text not null default 'quotidien',
  includes text[] not null default '{}',
  texts_en jsonb check (texts_en is null or jsonb_typeof(texts_en) = 'object'),
  sort integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.service_categories enable row level security;
drop policy if exists "catégories visibles" on public.service_categories;
create policy "catégories visibles" on public.service_categories for select using (active or public.is_admin());
drop policy if exists "catégories admin" on public.service_categories;
create policy "catégories admin" on public.service_categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.services (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(id) <= 80),
  category_id text not null references public.service_categories (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  question text not null default '' check (char_length(question) <= 300),
  description text not null default '' check (char_length(description) <= 600),
  texts_en jsonb check (texts_en is null or jsonb_typeof(texts_en) = 'object'),
  sort integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
-- Pour une base créée avant l'ajout des descriptions :
alter table public.services add column if not exists description text not null default '';
create index if not exists services_category_idx on public.services (category_id);
alter table public.services enable row level security;
drop policy if exists "services visibles" on public.services;
create policy "services visibles" on public.services for select using (active or public.is_admin());
drop policy if exists "services admin" on public.services;
create policy "services admin" on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 2. Disponibilités (une seule ligne de réglages, lisible par tous : aucune donnée personnelle)
-- ---------------------------------------------------------------------------
create table if not exists public.booking_settings (
  id integer primary key default 1 check (id = 1),
  settings jsonb not null default '{}' check (jsonb_typeof(settings) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.booking_settings enable row level security;
drop policy if exists "réglages visibles" on public.booking_settings;
create policy "réglages visibles" on public.booking_settings for select using (true);
drop policy if exists "réglages admin" on public.booking_settings;
create policy "réglages admin" on public.booking_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 3. Réservations
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique check (reference ~ '^[A-Z0-9-]{4,40}$'),
  kind text not null check (kind in ('appel', 'accompagnement')),
  category_id text,
  category_name text not null default '',
  service_id text,
  service_name text not null default '',
  price numeric(8, 2) not null default 0,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'en_attente_paiement'
    check (status in ('en_attente_paiement', 'confirme', 'annule', 'termine')),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 160),
  phone text not null default '' check (char_length(phone) <= 24),
  country text not null default '' check (char_length(country) <= 80),
  situation text not null default '' check (char_length(situation) <= 1000),
  need text not null default '' check (char_length(need) <= 2000),
  goal text not null default '' check (char_length(goal) <= 1000),
  extra text not null default '' check (char_length(extra) <= 1000),
  mode text not null default 'visio' check (mode in ('visio', 'telephone')),
  language text not null default 'fr' check (language in ('fr', 'en')),
  stripe_session_id text,
  consent_at timestamptz not null,
  consent_version text not null,
  created_at timestamptz not null default now()
);
create index if not exists bookings_starts_idx on public.bookings (starts_at);
create index if not exists bookings_email_idx on public.bookings (lower(email));
alter table public.bookings enable row level security;
-- Le public ne lit ni n'écrit directement : uniquement via les fonctions ci-dessous.
drop policy if exists "réservations admin" on public.bookings;
create policy "réservations admin" on public.bookings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Un créneau est pris s'il est confirmé, ou réservé il y a moins de 30 min (paiement en cours).
create or replace function public.slot_is_taken(p_start timestamptz)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.bookings
    where starts_at = p_start
      and (status = 'confirme' or (status = 'en_attente_paiement' and created_at > now() - interval '30 minutes'))
  );
$$;
revoke all on function public.slot_is_taken(timestamptz) from public;

-- Créneaux pris sur une période : seulement des heures, aucune donnée personnelle.
create or replace function public.taken_slots(p_from timestamptz, p_to timestamptz)
returns setof timestamptz
language sql
stable
security definer
set search_path = public
as $$
  select starts_at from public.bookings
  where starts_at >= p_from and starts_at < p_to
    and (status = 'confirme' or (status = 'en_attente_paiement' and created_at > now() - interval '30 minutes'));
$$;
revoke all on function public.taken_slots(timestamptz, timestamptz) from public;
grant execute on function public.taken_slots(timestamptz, timestamptz) to anon, authenticated;

-- Réserver un créneau (verrou pour éviter deux réservations au même moment).
create or replace function public.book_slot(p jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_start timestamptz := (p ->> 'starts_at')::timestamptz;
  v_kind text := p ->> 'kind';
begin
  if v_start <= now() then raise exception 'creneau_passe'; end if;
  perform pg_advisory_xact_lock(hashtext('slot:' || v_start::text));
  if public.slot_is_taken(v_start) then return null; end if;
  insert into public.bookings (
    reference, kind, category_id, category_name, service_id, service_name, price, starts_at, ends_at, status,
    name, email, phone, country, situation, need, goal, extra, mode, language, stripe_session_id, consent_at, consent_version
  ) values (
    p ->> 'reference', v_kind, nullif(p ->> 'category_id', ''), coalesce(p ->> 'category_name', ''),
    nullif(p ->> 'service_id', ''), coalesce(p ->> 'service_name', ''), coalesce((p ->> 'price')::numeric, 0),
    v_start, (p ->> 'ends_at')::timestamptz,
    case when v_kind = 'appel' then 'confirme' else 'en_attente_paiement' end,
    p ->> 'name', p ->> 'email', coalesce(p ->> 'phone', ''), coalesce(p ->> 'country', ''),
    coalesce(p ->> 'situation', ''), coalesce(p ->> 'need', ''), coalesce(p ->> 'goal', ''), coalesce(p ->> 'extra', ''),
    coalesce(p ->> 'mode', 'visio'), coalesce(p ->> 'language', 'fr'), nullif(p ->> 'stripe_session_id', ''),
    now(), p ->> 'consent_version'
  );
  return p ->> 'reference';
end;
$$;
revoke all on function public.book_slot(jsonb) from public;
grant execute on function public.book_slot(jsonb) to anon, authenticated;

-- Confirmer après paiement : il faut la référence ET l'identifiant de session Stripe (secret).
create or replace function public.confirm_booking(p_reference text, p_session text)
returns boolean
language sql
security definer
set search_path = public
as $$
  update public.bookings set status = 'confirme'
  where reference = p_reference and stripe_session_id = p_session and status = 'en_attente_paiement'
  returning true;
$$;
revoke all on function public.confirm_booking(text, text) from public;
grant execute on function public.confirm_booking(text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. RGPD : les réservations sont supprimées 12 mois après le rendez-vous
-- ---------------------------------------------------------------------------
create or replace function public.purge_expired_requests()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted integer;
  deleted_bookings integer;
begin
  delete from public.requests where created_at < now() - interval '12 months';
  get diagnostics deleted = row_count;
  delete from public.bookings where starts_at < now() - interval '12 months';
  get diagnostics deleted_bookings = row_count;
  insert into public.privacy_log (action, details)
    values ('purge', deleted || ' demande(s) et ' || deleted_bookings || ' réservation(s) de plus de 12 mois supprimée(s)');
  return deleted + deleted_bookings;
end;
$$;
revoke all on function public.purge_expired_requests() from public, anon, authenticated;
