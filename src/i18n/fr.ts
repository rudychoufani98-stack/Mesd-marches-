/** Libellés de l'interface commune (en-tête, pied de page, éléments partagés). Le texte des pages est dans src/views. */
export const fr = {
  common: {
    skipToContent: "Aller au contenu",
    primaryCta: "📞 Appel gratuit",
    login: "Connexion",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNavigation: "Navigation principale",
    language: "Langue",
    switchTo: "English version",
    switchLabel: "EN",
    readGuide: "Lire le guide",
    officialSources: "Sources officielles",
    newTab: "(nouvel onglet)",
    draft: "Brouillon",
    minRead: "min de lecture",
    lastVerified: "Dernière vérification",
    loading: "Chargement",
  },
  nav: [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Nos services" },
    { href: "/guides", label: "Guides pratiques" },
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/tarifs", label: "Tarifs" },
  ],
  footer: {
    tagline: "Vos démarches, en toute simplicité.",
    rights: "Tous droits réservés.",
    disclaimer:
      "MesDémarches est un service privé indépendant et ne constitue pas un site officiel de l'administration française.",
    groups: [
      {
        title: "Découvrir",
        items: [
          { href: "/services", label: "Nos services" },
          { href: "/guides", label: "Guides pratiques" },
          { href: "/comment-ca-marche", label: "Comment ça marche" },
          { href: "/tarifs", label: "Tarifs" },
          { href: "/professionnels", label: "Notaires, banques, courtiers" },
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
    ],
  },
  cookieNotice: {
    region: "Information sur les cookies",
    title: "Aucun cookie publicitaire ni de mesure d'audience.",
    text: "Votre plan d'action et vos checklists sont enregistrés uniquement sur votre appareil.",
    more: "En savoir plus",
    ok: "J'ai compris",
  },
  site: {
    independence:
      "Nous vous orientons vers les sources officielles ; vous restez toujours libre de choisir vos interlocuteurs.",
    unverifiedNotice: "Information à vérifier auprès de l'organisme compétent.",
    defaultTitle: "MesDémarches — Organisez vos démarches en France",
    description:
      "MesDémarches est un service privé d'accompagnement qui vous aide à organiser vos démarches administratives et pratiques en France : plans d'action, checklists et liens vers les sources officielles.",
  },
};

export type Dictionary = typeof fr;
