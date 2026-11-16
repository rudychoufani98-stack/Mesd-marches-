/** Libellés de l'interface commune (en-tête, pied de page, éléments partagés). Le texte des pages est dans src/views. */
export const fr = {
  common: {
    skipToContent: "Aller au contenu",
    primaryCta: "Appel gratuit",
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
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/tarifs", label: "Tarifs" },
  ],
  footer: {
    tagline: "Un conseiller dédié pour toutes vos démarches en France, en français ou en anglais.",
    cta: "Réserver mon appel gratuit",
    rights: "Tous droits réservés.",
    disclaimer:
      "MesDémarches est un service privé indépendant et ne constitue pas un site officiel de l'administration française.",
    groups: [
      {
        title: "Nos accompagnements",
        items: [
          { href: "/services/logement", label: "Immobilier & logement" },
          { href: "/services/fiscalite", label: "Fiscalité & impôts" },
          { href: "/services/sante", label: "Santé & assurances" },
          { href: "/services/banque", label: "Banque & finances" },
          { href: "/services/emploi", label: "Emploi & vie professionnelle" },
          { href: "/services/immigration", label: "Immigration & titre de séjour" },
          { href: "/services/quotidien", label: "Vie quotidienne & installation" },
          { href: "/services/business", label: "Offre entreprises" },
        ],
      },
      {
        title: "MesDémarches",
        items: [
          { href: "/services", label: "Nos services" },
          { href: "/comment-ca-marche", label: "Comment ça marche" },
          { href: "/tarifs", label: "Tarifs" },
          { href: "/rendez-vous", label: "Réserver un rendez-vous" },
          { href: "/professionnels", label: "Professionnels partenaires" },
          { href: "/faq", label: "Questions fréquentes" },
          { href: "/contact", label: "Contact" },
        ],
      },
      {
        title: "Informations légales",
        items: [
          { href: "/mentions-legales", label: "Mentions légales" },
          { href: "/confidentialite", label: "Politique de confidentialité" },
          { href: "/cookies", label: "Cookies" },
          { href: "/mes-donnees", label: "Mes données personnelles" },
          { href: "/cgv", label: "Conditions générales de vente" },
        ],
      },
    ],
  },
  cookieNotice: {
    region: "Information sur les cookies",
    title: "Aucun cookie publicitaire ni de mesure d'audience.",
    text: "Seuls des cookies techniques indispensables sont utilisés.",
    more: "En savoir plus",
    ok: "J'ai compris",
  },
  site: {
    independence:
      "Nous vous orientons vers les sources officielles ; vous restez toujours libre de choisir vos interlocuteurs.",
    unverifiedNotice: "Information à vérifier auprès de l'organisme compétent.",
    defaultTitle: "MesDémarches — Organisez vos démarches en France",
    description:
      "MesDémarches est un service privé d'accompagnement qui vous aide à organiser vos démarches administratives en France, avec un conseiller dédié.",
  },
};

export type Dictionary = typeof fr;
