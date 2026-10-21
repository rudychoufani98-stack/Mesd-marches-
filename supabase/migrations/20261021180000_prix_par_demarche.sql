-- MesDémarches : nouveau modèle de prix (appel gratuit, prix par démarche, pack, abonnement)
-- À coller dans Supabase > SQL Editor (projet Mesdemarches), puis "Run". Peut être relancé sans risque.
-- Ensuite : espace admin > Tableau de bord ou Tarifs > « Importer le contenu par défaut ».

-- 1. Autoriser une offre gratuite (appel découverte)
alter table public.offers drop constraint if exists offers_price_check;
alter table public.offers add constraint offers_price_check check (price >= 0 and price < 10000);

-- 2. Type d'offre et domaine de la démarche
alter table public.offers add column if not exists kind text not null default 'pack';
alter table public.offers drop constraint if exists offers_kind_check;
alter table public.offers add constraint offers_kind_check check (kind in ('decouverte', 'demarche', 'pack', 'abonnement'));
alter table public.offers add column if not exists category text;

-- 3. Retirer les anciennes offres du site (elles restent en base, masquées)
update public.offers set active = false where id in ('bilan', 'installation', 'suivi');
