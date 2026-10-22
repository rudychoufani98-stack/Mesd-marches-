# Registre des activités de traitement — MesDémarches

> Registre obligatoire (article 30 du RGPD), à tenir à jour et à présenter à la CNIL sur demande.
> Modèle inspiré de la démarche CNIL : https://www.cnil.fr/fr/me-mettre-en-conformite/rgpd-par-ou-commencer
>
> Dernière mise à jour : 22/10/2026 — version de la politique de confidentialité : `2026-10-22`
> (constante `PRIVACY_VERSION` dans `src/config/privacy.ts`).

**Responsable du traitement :** [raison sociale, adresse, représentant légal] (à renseigner aussi dans `src/config/legal.ts`)
**Contact pour les données :** [adresse e-mail]

**Sous-traitants** (tous liés par un accord de traitement des données, DPA, accepté dans leurs conditions) :

| Prestataire | Rôle | Localisation / garanties |
|---|---|---|
| Vercel Inc. | Hébergement du site | États-Unis — Data Privacy Framework + clauses contractuelles types |
| Supabase | Base de données (demandes, admin) | [région du projet à vérifier dans Supabase → Settings → General] — DPA Supabase |
| Stripe | Paiement, reçus et factures | Irlande / États-Unis — DPF + clauses contractuelles types, certifié PCI DSS |
| Calendly | Prise de rendez-vous après paiement | États-Unis — DPF + clauses contractuelles types |

---

## Traitement 1 — Demandes d'appel et de rendez-vous

| Rubrique | Contenu |
|---|---|
| Finalité | Recontacter le prospect et organiser l'appel offert ou le rendez-vous |
| Base légale | Mesures précontractuelles (art. 6.1.b) |
| Personnes concernées | Prospects, clients |
| Données | Nom, e-mail, téléphone (facultatif), besoin, mode, disponibilités, message ; date et version du consentement |
| Destinataires | Équipe MesDémarches (espace admin) |
| Sous-traitants | Vercel, Supabase |
| Conservation | 12 mois après réception, suppression automatique (tâche quotidienne `purge-demandes`) |
| Sécurité | HTTPS, validation serveur, anti-spam, RLS : dépôt public, lecture admin uniquement |

## Traitement 2 — Formulaire de contact

| Rubrique | Contenu |
|---|---|
| Finalité | Répondre aux messages |
| Base légale | Intérêt légitime (art. 6.1.f) |
| Données | Nom, e-mail, sujet, message ; date et version du consentement |
| Destinataires / sous-traitants / sécurité / conservation | Identiques au traitement 1 |

## Traitement 3 — Paiements et facturation

| Rubrique | Contenu |
|---|---|
| Finalité | Encaisser les paiements, émettre reçus et factures, suivre les paiements dans l'admin |
| Base légale | Exécution du contrat (6.1.b) ; obligations comptables (6.1.c) |
| Personnes concernées | Clients |
| Données | Nom, e-mail, adresse de facturation, prestation, montant, date. Données de carte : traitées uniquement par Stripe, jamais par le site |
| Sous-traitant | Stripe (Checkout hébergé) |
| Conservation | Factures : 10 ans (art. L123-22 du Code de commerce). Données client : durée de l'accompagnement + 5 ans |
| Sécurité | Clé secrète Stripe côté serveur uniquement ; montants recalculés côté serveur ; clé live bloquée sans `STRIPE_LIVE_ENABLED` |

## Traitement 4 — Prise de rendez-vous (Calendly)

| Rubrique | Contenu |
|---|---|
| Finalité | Planifier le rendez-vous après paiement |
| Base légale | Exécution du contrat (6.1.b) |
| Données | Nom, e-mail, créneau, réponses éventuelles, référence de paiement |
| Sous-traitant | Calendly (agenda intégré en iframe ; Calendly gère le consentement à ses cookies) |
| Conservation | Durée de l'accompagnement + 5 ans ; supprimer les rendez-vous anciens dans Calendly |

## Traitement 5 — Documents des dossiers clients

| Rubrique | Contenu |
|---|---|
| Finalité | Vérifier et préparer le dossier du client (titre de séjour, naturalisation, logement…) |
| Base légale | Exécution du contrat (6.1.b) |
| Données | Pièces transmises par le client : identité, état civil, titre de séjour, justificatifs. Peut inclure le numéro de sécurité sociale : ne jamais le demander s'il n'est pas indispensable |
| Destinataires | Le conseiller en charge uniquement |
| Conservation | Supprimés au plus tard 3 mois après la fin de l'accompagnement (boîte mail et stockage compris) |
| Sécurité | Échanges par un moyen sécurisé ; aucun mot de passe demandé ; suppression vérifiée en fin de dossier |

## Traitement 6 — Compte administrateur

| Rubrique | Contenu |
|---|---|
| Finalité | Sécuriser l'accès à l'espace de gestion |
| Données | E-mail et mot de passe (chiffré par Supabase Auth), cookie de session |
| Conservation | Tant que le compte existe |

## Sans collecte côté serveur

- **Checklists des guides et budget** : stockés uniquement dans le navigateur (localStorage).
- **Liens des guides clients** : signés, sans aucune donnée personnelle.
- **Mesure d'audience** : aucune. Tout ajout nécessite le consentement préalable (bandeau Accepter / Refuser).

---

## Exercice des droits (procédure)

1. La personne écrit via la page « Mes données personnelles », le formulaire de contact ou par e-mail.
2. Vérifier que la demande vient bien de la personne (réponse depuis l'adresse concernée).
3. Espace admin → **Données personnelles** → rechercher l'adresse ; exporter ou supprimer.
4. Supprimer aussi, si besoin, dans Calendly et dans la boîte mail. Les factures Stripe sont conservées 10 ans (obligation légale).
5. Répondre dans un délai d'un mois. Chaque export et suppression est inscrit au journal (sans l'adresse).

## Violation de données

1. Documenter l'incident (date, données touchées, nombre de personnes, mesures prises).
2. Notifier la CNIL dans les 72 heures si l'incident présente un risque pour les personnes (notifications.cnil.fr).
3. Informer les personnes concernées si le risque est élevé.
4. Changer immédiatement les clés exposées (Supabase, Stripe, `GUIDES_LINK_SECRET`) dans Vercel.
