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
- [ ] Tenir un registre des traitements (contact, rendez-vous, futurs comptes clients).
- [ ] Valider les bases légales et les durées de conservation (voir page Confidentialité).
- [ ] Mettre en place une procédure de suppression (purge des demandes au-delà de la durée retenue).
- [ ] Lister les sous-traitants (hébergeur, outil de réception des formulaires, messagerie) et
      vérifier la localisation des données et les clauses contractuelles.
- [ ] Procédure de réponse aux demandes d'exercice des droits (accès, effacement…).
- [ ] Ne pas ajouter d'outil de mesure d'audience ou de cookie non essentiel sans vérifier
      les obligations de consentement (recommandations de la CNIL).
- [ ] Ne jamais collecter de documents sensibles, de mots de passe ou de codes d'accès
      aux services publics.

Ressource : https://www.cnil.fr/fr/me-mettre-en-conformite/rgpd-par-ou-commencer

## 5. Contenus

- [ ] Relire chaque guide face à ses sources, puis renseigner `lastVerified` (date de relecture).
- [ ] Définir une fréquence de revue des guides (ex. tous les 6 mois) et des liens officiels.
- [ ] N'ajouter des avis clients que s'ils sont réels, avec une procédure de contrôle transparente.
