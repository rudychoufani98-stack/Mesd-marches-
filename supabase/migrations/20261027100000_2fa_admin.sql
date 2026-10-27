-- MesDémarches : double authentification (2FA) exigée par la base de données.
-- À coller dans Supabase > SQL Editor (projet MesDémarches), puis « Run ». Peut être relancé sans risque.
--
-- Effet : un administrateur qui a activé la 2FA n'a accès aux données (demandes, journal, offres…)
-- qu'après avoir saisi son code. Un mot de passe volé ne suffit plus.
-- Tant qu'aucune 2FA n'est activée, le fonctionnement reste identique.

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
  )
  and (
    coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
    or not exists (
      select 1 from auth.mfa_factors f
      where f.user_id = auth.uid() and f.status = 'verified'
    )
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
