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
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/guides", label: "Guides pratiques" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/tarifs", label: "Tarifs" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Découvrir",
    items: [
      { href: "/services", label: "Nos services" },
      { href: "/guides", label: "Guides pratiques" },
      { href: "/comment-ca-marche", label: "Comment ça marche" },
      { href: "/tarifs", label: "Tarifs" },
    ],
  },
  {
    title: "Outils",
    items: [
      { href: "/plan-action", label: "Créer mon plan d'action" },
      { href: "/outils/budget", label: "Budget mensuel" },
      { href: "/rendez-vous", label: "Demander un rendez-vous" },
    ],
  },
  {
    title: "Aide",
    items: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Informations légales",
    items: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Politique de confidentialité" },
      { href: "/cookies", label: "Cookies et stockage local" },
      { href: "/mes-donnees", label: "Mes données personnelles" },
      { href: "/cgv", label: "Conditions générales de vente" },
    ],
  },
];
