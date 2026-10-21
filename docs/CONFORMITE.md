# Conformité — checklist avant commercialisation

> Ce document liste les vérifications à faire. **Il ne vaut pas validation juridique.**
> L'existence des pages Mentions légales, Confidentialité et CGV ne rend pas le site conforme :
> elles sont des brouillons à compléter et à faire relire par un professionnel du droit.

## 1. Marque et identité

- [ ] Vérifier la disponibilité du nom « MesDémarches » et des marques proches (INPI, EUIPO).
- [ ] Vérifier la disponibilité des noms de domaine envisagés.
- [ ] S'assurer que le nom, le logo et le design ne créent pas de confusion avec un site public
      (pas de Marianne, de drapeau, de mention « officiel », de domaine trompeur).
- [ ] Conserver la mention « service privé indépendant » visible sur toutes les pages (pied de page).

## 2. Qualification juridique des prestations

**Modèle visé (21/10/2026) : revenus des clients ET de partenaires (banques, courtiers, notaires…),
de façon légale sans statut contraignant.** Le site ne fait donc AUCUNE promesse « sans commission ».
Pistes à faire valider par un avocat avant toute rémunération par un partenaire :
- **Indicateur (banque/crédit, assurance)** : une simple mise en relation (transmettre les coordonnées
  d'un client consentant, sans présenter d'offre ni aider à monter le dossier de crédit) peut être
  rémunérée sans inscription ORIAS (art. R. 519-2 C. mon. fin. pour la banque). Dès qu'on présente,
  conseille ou aide à conclure → statut IOBSP / intermédiaire d'assurance obligatoire.
- **Rémunération forfaitaire non liée aux clients** : publicité ou mise en avant clairement signalée,
  atelier ou formation facturé au partenaire, prestation B2B (ex. employeur qui paie l'installation
  de ses salariés). À vérifier : règles de publicité pour le crédit.
- **Notaires et avocats** : leurs règles déontologiques encadrent strictement la rémunération
  d'apporteurs d'affaires → privilégier des partenariats sans rémunération ou facturer un service.
- **Agences immobilières** : partage d'honoraires encadré par la loi Hoguet.
- **Transparence** : si un partenaire vous rémunère, l'indiquer clairement au client avant toute
  mise en relation, et ne transmettre ses coordonnées qu'avec son accord exprès (RGPD).
- Dans tous les cas : pas de conseil personnalisé en crédit, pas de consultation juridique.

- [ ] Faire qualifier les prestations (information, organisation, orientation) et vérifier
      qu'elles ne relèvent pas d'une activité réglementée (conseil juridique, intermédiation
      en opérations de banque ou en crédit, conseil en investissement, etc.).
- [ ] Banque / crédit : le contenu reste pédagogique. Aucune recommandation de crédit, aucune
      mise en relation rémunérée avec des prêteurs tant que le cadre applicable n'est pas validé.
- [ ] Impôts : aucune stratégie fiscale individualisée.
- [ ] Vérifier les éventuelles obligations d'assurance (responsabilité civile professionnelle).

## 3. Vente à distance et abonnements

- [ ] Informations précontractuelles obligatoires (prix TTC, caractéristiques, durée, modalités).
- [ ] Droit de rétractation : délai, formulaire type, et modalités si le service commence
      avant la fin du délai à la demande expresse du client.
- [ ] Abonnement « Suivi administratif » : modalités de résiliation (y compris en ligne),
      information sur la reconduction.
- [ ] Désignation d'un médiateur de la consommation et mention de ses coordonnées.
- [ ] Prix : valider les prix de test dans `src/config/pricing.ts` et passer
      `PRICES_ARE_TEST_VALUES` à `false`.

## 4. Données personnelles (RGPD)

- [ ] Désigner le responsable de traitement et un contact « données ».
- [ ] Compléter et valider le registre des traitements : `docs/registre-traitements.md` (brouillon prêt).
- [ ] Valider les bases légales et les durées de conservation (voir page Confidentialité).
- [x] Suppression automatique des demandes après 12 mois (tâche `purge-demandes` + bouton dans l'admin).
      À faire : vérifier dans Supabase que la tâche planifiée existe (Database > Cron).
- [ ] Lister les sous-traitants (hébergeur, outil de réception des formulaires, messagerie) et
      vérifier la localisation des données et les clauses contractuelles.
- [x] Outil d'exercice des droits dans l'admin (recherche, export JSON, effacement, journal).
      Procédure décrite dans `docs/registre-traitements.md`.
- [x] Consentement horodaté avec la version de la politique (`PRIVACY_VERSION`).
- [ ] Choisir une région européenne pour le projet Supabase et signer les DPA (Supabase, Vercel).
- [ ] Rédiger la procédure en cas de violation de données.
- [ ] Ne pas ajouter d'outil de mesure d'audience ou de cookie non essentiel sans vérifier
      les obligations de consentement (recommandations de la CNIL).
- [ ] Ne jamais collecter de documents sensibles, de mots de passe ou de codes d'accès
      aux services publics.

Ressource : https://www.cnil.fr/fr/me-mettre-en-conformite/rgpd-par-ou-commencer

## 5. Contenus

- [ ] Relire chaque guide face à ses sources, puis renseigner `lastVerified` (date de relecture).
- [ ] Définir une fréquence de revue des guides (ex. tous les 6 mois) et des liens officiels.
- [ ] N'ajouter des avis clients que s'ils sont réels, avec une procédure de contrôle transparente.

## 6. Sécurité informatique

**Déjà en place dans le code :**
- [x] En-têtes de sécurité : CSP (ressources du site uniquement), HSTS (HTTPS forcé), anti-iframe, COOP, Referrer-Policy, Permissions-Policy.
- [x] Espace admin : vérification de la session ET du rôle à chaque page/action, jamais mis en cache ni indexé.
- [x] Cookies de session admin `httpOnly`, `secure`, `sameSite=lax` ; aucun cookie pour les visiteurs.
- [x] Limitation des tentatives de connexion admin (par IP et par compte) et des envois de formulaires.
- [x] Base de données : règles d'accès (RLS) sur toutes les tables, clé publique uniquement côté application (jamais `service_role`).
- [x] Validation serveur de toutes les saisies (Zod), champ anti-robots.
- [x] `/.well-known/security.txt` pour signaler une faille.
- [x] Audit des dépendances : `npm audit --omit=dev` (0 vulnérabilité au 21/10/2026).

**À faire de votre côté :**
- [ ] Activer la double authentification (2FA) sur Supabase, Vercel, GitHub et la messagerie liée.
- [ ] Supabase → Authentication → désactiver « Allow new users to sign up ».
- [ ] Supabase → Authentication → mot de passe minimum 12 caractères.
- [ ] Mot de passe admin unique et long, stocké dans un gestionnaire de mots de passe.
- [ ] Ne jamais coller de mot de passe ou de clé `service_role` dans un message, une capture ou le code.
- [ ] Renouveler la date `Expires` de security.txt chaque année.
- [ ] Relancer `npm audit` et mettre à jour les dépendances chaque mois.
- [ ] Sauvegardes : vérifier l'offre de sauvegarde du plan Supabase (le plan gratuit est limité).

## 7. Avant d'activer Stripe

- [ ] CGV finalisées (rétractation, exécution anticipée, résiliation de l'abonnement) et acceptées avant paiement.
- [ ] Entreprise immatriculée, facturation conforme, prix validés (`PRICES_ARE_TEST_VALUES = false`).
- [ ] Stripe ajouté comme sous-traitant dans la politique de confidentialité et le registre.
- [ ] Utiliser Stripe Checkout (page hébergée par Stripe : aucune donnée de carte ne transite par le site).
- [ ] Adapter la CSP (js.stripe.com, api.stripe.com) et la page Cookies (cookies anti-fraude de Stripe).
- [ ] Tester uniquement en mode test (clés `sk_test_` / `pk_test_`) avant la mise en production.
