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

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Zod, lucide-react, Vitest.
Pas de base de données, pas d'authentification, pas de paiement dans cette version.

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
  integrations/
    delivery.ts         Acheminement des formulaires (console / webhook)
  i18n/                 Libellés de l'interface (français ; prêt pour en / ar)
docs/CONFORMITE.md      Checklist juridique et RGPD avant commercialisation
```

## Configuration

Variables d'environnement : voir `.env.example`.

- **Prix et offres** : `src/config/pricing.ts`.
- **Services** : `src/content/services.ts` (`active: false` masque un domaine ou un service).
- **Guides** : `src/content/guides.ts`. Un guide `draft` n'est visible qu'en développement.
  Tant que `lastVerified` vaut `null`, la page affiche « Information à vérifier auprès de
  l'organisme compétent ».
- **Sources officielles** : `src/content/sources.ts`. Un test refuse toute URL hors des domaines
  publics autorisés. Les URL ont été testées le 21/10/2026 (réponse et titre de page) ; le
  contenu des guides, lui, n'a pas encore été relu face aux sources.
- **Plan d'action** : ajouter une tâche dans `tasks.ts`, puis une règle dans `rules.ts`.
  Aucune IA : seules les tâches de la bibliothèque peuvent apparaître.
- **Formulaires** : `FORMS_DELIVERY=webhook` + `FORMS_WEBHOOK_URL` pour recevoir les demandes
  (Make, Zapier, n8n, Slack…). En production sans configuration, les formulaires affichent un
  message d'indisponibilité au lieu de perdre la demande en silence.
- **Indexation** : `robots.txt` bloque tout tant que `NEXT_PUBLIC_ALLOW_INDEXING` n'est pas à `true`.

## Choix faits par défaut (à valider)

- Délai de réponse : 2 jours ouvrés ; annulation gratuite jusqu'à 24 h avant le rendez-vous.
- Offre Suivi : 5 questions écrites par mois, sans engagement, résiliation effective en fin de mois.
- Créneaux proposés : matin, après-midi, début de soirée, en semaine.
- Progression des checklists, plan d'action et budget : stockés uniquement dans le navigateur.

## Limites actuelles

- Pas de comptes utilisateurs : la page Connexion explique que l'espace client arrive bientôt.
- Pas de base de données : les demandes de contact / rendez-vous sont transmises par webhook,
  pas stockées par l'application.
- Pas de paiement ni de réservation avec calendrier.
- La limitation de débit des formulaires est en mémoire (une seule instance).
- Les pages légales sont des brouillons avec des champs `[à compléter]`.
- Aucun guide n'a encore de date de « dernière vérification ».
- Interface en français uniquement.

## Prochaines étapes suggérées

1. Relire et dater chaque guide ; compléter les pages légales (voir `docs/CONFORMITE.md`).
2. Vérifier la disponibilité de la marque et des noms de domaine.
3. Brancher le webhook des formulaires et déployer (ex. Vercel) avec indexation désactivée.
4. Phase 2 : base de données (ex. Supabase) pour comptes, sauvegarde des plans, tableau de bord,
   espace administrateur (services, guides, prix), e-mails transactionnels.
5. Phase 3 : réservation avec calendrier, paiement et abonnements (après validation juridique),
   guides en anglais et en arabe (`src/i18n`).
