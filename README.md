# MesDémarches

Plateforme web d'accompagnement administratif en France : guides pratiques, checklists,
plan d'action généré par des règles explicites et demandes de rendez-vous.

> MesDémarches est un service privé indépendant et ne constitue pas un site officiel de
> l'administration française.

## Prérequis

- Node.js 20.19+ (testé avec Node 24)
- npm

## Installation

```bash
npm install
cp .env.example .env.local
```

## Commandes

| Commande            | Rôle                                              |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Serveur de développement (http://localhost:3000)  |
| `npm run build`     | Build de production                               |
| `npm start`         | Lance le build de production                      |
| `npm run typecheck` | Vérification TypeScript                           |
| `npm run lint`      | ESLint                                            |
| `npm test`          | Tests unitaires (Vitest)                          |
| `npm run check`     | Typecheck + lint + tests                          |

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Zod, lucide-react, Vitest,
Supabase (base de données + connexion de l'administrateur). Pas de paiement dans cette version.
Sans Supabase configuré, le site fonctionne avec le contenu par défaut du code (l'admin est alors indisponible).

## Espace admin (mise en place, une seule fois)

1. Créer un projet sur https://supabase.com — **choisir une région européenne** (ex. Paris ou Francfort).
2. Supabase → **SQL Editor** → coller tout le fichier `supabase/migrations/20261021120000_admin_rgpd.sql` → **Run**.
3. Supabase → **Authentication → Users → Add user** : votre e-mail + un mot de passe solide (cocher « Auto Confirm User »).
   Puis **Authentication → Sign In / Providers** : désactiver « Allow new users to sign up ».
4. SQL Editor : autoriser votre compte comme administrateur (en minuscules) :
   ```sql
   insert into public.admin_emails (email) values ('votre.adresse@exemple.com');
   ```
5. Supabase → **Project Settings → API** : copier « Project URL » et la clé « anon public » dans `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) **et** dans Vercel (Settings → Environment Variables),
   puis redéployer. Ne jamais utiliser la clé `service_role`.
6. Ouvrir `/admin`, se connecter, cliquer **Importer le contenu par défaut**.

Ce que permet l'admin : demandes reçues (statut, suppression), offres et prix, guides (création, édition,
publication, date de vérification), visibilité des domaines et services, données personnelles
(export, effacement, purge, journal).

Sécurité : chaque page et action admin vérifie la session **et** le rôle administrateur ; la base applique
ses propres règles (RLS) : un visiteur peut seulement déposer une demande et lire le contenu publié.

## Organisation du code

```
src/
  app/                  Pages (une route = un dossier) + sitemap.ts, robots.ts
  components/           Composants visuels (ui, layout, home, guides, plan, forms, tools)
  config/
    site.ts             Nom, slogan, mention légale, navigation
    pricing.ts          Offres et prix (configuration centrale)
  content/
    categories.ts       Les 8 domaines
    services.ts         Catalogue des services par domaine (active: true/false)
    guides.ts           Guides pratiques (statut, date de dernière vérification)
    sources.ts          Registre des sources officielles (seules URL autorisées)
  lib/
    plan/questions.ts   Questions du questionnaire + validation
    plan/tasks.ts       Bibliothèque de tâches validées
    plan/rules.ts       Moteur de règles du plan d'action
    forms/              Schémas Zod, Server Actions, limitation de débit
    data/content.ts     Lecture des contenus (base Supabase, sinon contenu par défaut), mise en cache
    admin/              Actions de l'espace admin, format texte de l'éditeur de guides
    supabase/           Clients Supabase (visiteur sans cookie, session admin)
  app/(site)/           Site public
  app/admin/            Espace admin (/admin, /admin/connexion)
  proxy.ts              Protège /admin (session)
  config/privacy.ts     Version de la politique de confidentialité, durée de conservation
  integrations/
    delivery.ts         Acheminement des formulaires (console / webhook)
  i18n/                 Libellés de l'interface (français ; prêt pour en / ar)
supabase/migrations/    SQL à appliquer dans Supabase
docs/CONFORMITE.md      Checklist juridique et RGPD avant commercialisation
docs/registre-traitements.md  Registre RGPD (brouillon) + procédure d'exercice des droits
```

## Configuration

Variables d'environnement : voir `.env.example`.

- **Prix et offres** : espace admin → Tarifs (valeurs par défaut : `src/config/pricing.ts`).
- **Services** : contenu dans `src/content/services.ts` ; visibilité réglée dans l'admin → Services.
- **Guides** : espace admin → Guides (contenu par défaut : `src/content/guides.ts`). Un guide en brouillon
  n'est pas visible sur le site.
  Tant que `lastVerified` vaut `null`, la page affiche « Information à vérifier auprès de
  l'organisme compétent ».
- **Sources officielles** : `src/content/sources.ts`. Un test refuse toute URL hors des domaines
  publics autorisés. Les URL ont été testées le 21/10/2026 (réponse et titre de page) ; le
  contenu des guides, lui, n'a pas encore été relu face aux sources.
- **Plan d'action** : ajouter une tâche dans `tasks.ts`, puis une règle dans `rules.ts`.
  Aucune IA : seules les tâches de la bibliothèque peuvent apparaître.
- **Formulaires** : avec Supabase, les demandes sont enregistrées en base et visibles dans l'admin.
  `FORMS_DELIVERY=webhook` + `FORMS_WEBHOOK_URL` ajoute une notification (sans donnée personnelle).
  Sans Supabase, le webhook reçoit la demande complète ; sans rien, les formulaires affichent un
  message d'indisponibilité au lieu de perdre la demande en silence.
- **RGPD** : durée de conservation et version de la politique dans `src/config/privacy.ts`
  (la durée doit rester alignée avec la migration SQL).
- **Indexation** : `robots.txt` bloque tout tant que `NEXT_PUBLIC_ALLOW_INDEXING` n'est pas à `true`.

## Choix faits par défaut (à valider)

- Délai de réponse : 2 jours ouvrés ; annulation gratuite jusqu'à 24 h avant le rendez-vous.
- Offre Suivi : 5 questions écrites par mois, sans engagement, résiliation effective en fin de mois.
- Créneaux proposés : matin, après-midi, début de soirée, en semaine.
- Progression des checklists, plan d'action et budget : stockés uniquement dans le navigateur.

## Limites actuelles

- Pas de comptes utilisateurs : la page Connexion explique que l'espace client arrive bientôt.
- Un seul compte administrateur ; pas de comptes clients.
- Les textes des services (hors visibilité) se modifient encore dans le code.
- Pas de paiement ni de réservation avec calendrier.
- La limitation de débit des formulaires est en mémoire (une seule instance).
- Les pages légales sont des brouillons avec des champs `[à compléter]`.
- Aucun guide n'a encore de date de « dernière vérification ».
- Interface en français uniquement.

## Prochaines étapes suggérées

1. Relire et dater chaque guide ; compléter les pages légales (voir `docs/CONFORMITE.md`).
2. Vérifier la disponibilité de la marque et des noms de domaine.
3. Brancher le webhook des formulaires et déployer (ex. Vercel) avec indexation désactivée.
4. Phase 2 : comptes clients, sauvegarde des plans, tableau de bord client, e-mails transactionnels.
5. Phase 3 : réservation avec calendrier, paiement et abonnements (après validation juridique),
   guides en anglais et en arabe (`src/i18n`).
