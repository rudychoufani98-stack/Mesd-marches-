# Registre des activités de traitement — MesDémarches

> **Brouillon à compléter et à faire valider.** Le RGPD (article 30) impose de tenir ce registre.
> Modèle inspiré de la démarche proposée par la CNIL :
> https://www.cnil.fr/fr/me-mettre-en-conformite/rgpd-par-ou-commencer
>
> Dernière mise à jour : 21/10/2026 — version de la politique de confidentialité : `2026-10-21`
> (constante `PRIVACY_VERSION` dans `src/config/privacy.ts`).

**Responsable du traitement :** [raison sociale, adresse, représentant légal]
**Contact pour les données :** [adresse e-mail dédiée]

---

## Traitement 1 — Demandes de contact

| Rubrique | Contenu |
|---|---|
| Finalité | Répondre aux questions envoyées via le formulaire de contact |
| Base légale | [à valider : intérêt légitime / mesures précontractuelles] |
| Personnes concernées | Visiteurs du site qui écrivent |
| Données | Nom, e-mail, sujet, message ; date et version du consentement |
| Données exclues | Aucune donnée sensible, aucun numéro d'identification (rappelé sur le formulaire) |
| Destinataires | Équipe MesDémarches (espace admin, un seul compte administrateur) |
| Sous-traitants | Vercel (hébergement), Supabase (base de données) — [région, DPA, garanties de transfert] |
| Durée de conservation | 12 mois après réception, suppression automatique (tâche quotidienne `purge-demandes`) |
| Sécurité | HTTPS, validation serveur, anti-spam, règles d'accès (RLS) : dépôt public, lecture admin uniquement |

## Traitement 2 — Demandes de rendez-vous

| Rubrique | Contenu |
|---|---|
| Finalité | Organiser un rendez-vous d'accompagnement |
| Base légale | [à valider : mesures précontractuelles] |
| Personnes concernées | Prospects et clients |
| Données | Nom, e-mail, offre choisie, mode, disponibilités, message facultatif ; date et version du consentement |
| Destinataires / sous-traitants / sécurité | Identiques au traitement 1 |
| Durée de conservation | 12 mois après réception pour une demande sans suite ; [durée applicable aux clients à valider] |

## Traitement 3 — Compte administrateur

| Rubrique | Contenu |
|---|---|
| Finalité | Sécuriser l'accès à l'espace de gestion |
| Données | E-mail et mot de passe (chiffré par Supabase Auth), cookie de session |
| Durée | Tant que le compte existe |

## Traitements sans collecte côté serveur

- **Plan d'action, checklists, budget** : stockés uniquement dans le navigateur de la personne (localStorage). Rien n'est transmis au serveur.
- **Mesure d'audience** : aucune à ce jour. Tout ajout nécessite de vérifier les règles sur les cookies et le consentement.

---

## Exercice des droits (procédure)

1. La personne écrit via le formulaire de contact (sujet « Mes données personnelles ») ou par e-mail.
2. Vérifier que la demande vient bien de la personne (réponse depuis l'adresse concernée).
3. Espace admin → **Données personnelles** → rechercher l'adresse.
4. Accès / portabilité : bouton **Exporter** (fichier JSON à transmettre à la personne).
5. Effacement : bouton **Tout supprimer**.
6. Répondre dans un délai d'un mois. Chaque export et suppression est inscrit au journal (sans l'adresse).

## Violation de données

En cas de violation de données personnelles : documenter l'incident et évaluer s'il doit être notifié à la CNIL
(dans les 72 heures lorsque la notification est requise) et aux personnes concernées. [procédure interne à rédiger]
