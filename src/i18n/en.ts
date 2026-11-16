import type { Dictionary } from "./fr";

/** Shared interface labels in English. Page copy lives in src/views. */
export const en: Dictionary = {
  common: {
    skipToContent: "Skip to content",
    primaryCta: "Free call",
    login: "Log in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    language: "Language",
    switchTo: "Version française",
    switchLabel: "FR",
    readGuide: "Read the guide",
    officialSources: "Official sources",
    newTab: "(opens in a new tab)",
    draft: "Draft",
    minRead: "min read",
    lastVerified: "Last checked",
    loading: "Loading",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Our services" },
    { href: "/comment-ca-marche", label: "How it works" },
    { href: "/tarifs", label: "Pricing" },
  ],
  footer: {
    tagline: "A dedicated advisor for all your paperwork in France, in English or French.",
    cta: "Book my free call",
    rights: "All rights reserved.",
    disclaimer:
      "MesDémarches is an independent private service and is not an official website of the French administration.",
    groups: [
      {
        title: "Our support",
        items: [
          { href: "/services/logement", label: "Housing & property" },
          { href: "/services/fiscalite", label: "Tax & income tax" },
          { href: "/services/sante", label: "Health & insurance" },
          { href: "/services/banque", label: "Banking & finance" },
          { href: "/services/emploi", label: "Jobs & working life" },
          { href: "/services/immigration", label: "Immigration & residence permit" },
          { href: "/services/quotidien", label: "Everyday life & settling in" },
          { href: "/services/business", label: "For companies" },
        ],
      },
      {
        title: "MesDémarches",
        items: [
          { href: "/services", label: "Our services" },
          { href: "/comment-ca-marche", label: "How it works" },
          { href: "/tarifs", label: "Pricing" },
          { href: "/rendez-vous", label: "Book an appointment" },
          { href: "/professionnels", label: "Partner professionals" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
        ],
      },
      {
        title: "Legal information",
        items: [
          { href: "/mentions-legales", label: "Legal notice" },
          { href: "/confidentialite", label: "Privacy policy" },
          { href: "/cookies", label: "Cookies" },
          { href: "/mes-donnees", label: "My personal data" },
          { href: "/cgv", label: "Terms of sale" },
        ],
      },
    ],
  },
  cookieNotice: {
    region: "Cookie information",
    title: "No advertising or audience-tracking cookies.",
    text: "Only essential technical cookies are used.",
    more: "Learn more",
    ok: "Got it",
  },
  site: {
    independence:
      "We point you to the official sources; you always remain free to choose who you work with.",
    unverifiedNotice: "Information to be checked with the relevant authority.",
    defaultTitle: "MesDémarches — Organise your paperwork in France",
    description:
      "MesDémarches is a private support service that helps you organise your administrative procedures in France, with a dedicated advisor.",
  },
};
