/**
 * Configuration générale du site.
 * Les valeurs sensibles ou propres à l'environnement viennent des variables d'environnement
 * (voir .env.example). Aucune clé secrète ne doit être lue ici : ce fichier est importé côté client.
 */
export const siteConfig = {
  name: "MesDémarches",
  slogan: "Vos démarches, en toute simplicité.",
  promise:
    "Nous vous aidons à organiser vos démarches en France, comprendre les étapes et avancer à votre rythme.",
  description:
    "MesDémarches est un service privé d'accompagnement qui vous aide à organiser vos démarches administratives et pratiques en France : plans d'action, checklists et liens vers les sources officielles.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",
  /** Adresse affichée au public. Laissée vide tant qu'elle n'est pas configurée. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  disclaimer:
    "MesDémarches est un service privé indépendant et ne constitue pas un site officiel de l'administration française.",
  unverifiedNotice: "Information à vérifier auprès de l'organisme compétent.",
  /** Liberté de choix du client (ne dit rien des relations commerciales avec les partenaires). */
  independence: "Nous vous orientons vers les sources officielles ; vous restez toujours libre de choisir vos interlocuteurs.",
} as const;
