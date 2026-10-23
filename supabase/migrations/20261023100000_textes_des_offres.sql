-- MesDémarches : textes des offres modifiables depuis l'admin (titre affiché, « pourquoi », version anglaise).
-- À coller dans Supabase > SQL Editor (projet MesDémarches), puis « Run ». Peut être relancé sans risque.

alter table public.offers add column if not exists headline text;
alter table public.offers add column if not exists why text;
alter table public.offers add column if not exists texts_en jsonb;

alter table public.offers drop constraint if exists offers_headline_check;
alter table public.offers add constraint offers_headline_check check (headline is null or char_length(headline) <= 120);
alter table public.offers drop constraint if exists offers_why_check;
alter table public.offers add constraint offers_why_check check (why is null or char_length(why) <= 300);
alter table public.offers drop constraint if exists offers_texts_en_check;
alter table public.offers add constraint offers_texts_en_check check (texts_en is null or jsonb_typeof(texts_en) = 'object');
