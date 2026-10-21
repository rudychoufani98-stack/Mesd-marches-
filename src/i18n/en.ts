import type { Dictionary } from "./fr";

/** Shared interface labels in English. Page copy lives in src/views. */
export const en: Dictionary = {
  common: {
    skipToContent: "Skip to content",
    primaryCta: "Organise my paperwork",
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
    { href: "/guides", label: "Practical guides" },
    { href: "/comment-ca-marche", label: "How it works" },
    { href: "/tarifs", label: "Pricing" },
  ],
  footer: {
    tagline: "Your paperwork in France, made simple.",
    rights: "All rights reserved.",
    disclaimer:
      "MesDémarches is an independent private service and is not an official website of the French administration.",
    groups: [
      {
        title: "Discover",
        items: [
          { href: "/services", label: "Our services" },
          { href: "/guides", label: "Practical guides" },
          { href: "/comment-ca-marche", label: "How it works" },
          { href: "/tarifs", label: "Pricing" },
          { href: "/professionnels", label: "Notaries, banks, brokers" },
        ],
      },
      {
        title: "Tools",
        items: [
          { href: "/plan-action", label: "Create my action plan" },
          { href: "/outils/budget", label: "Monthly budget" },
          { href: "/rendez-vous", label: "Book an appointment" },
        ],
      },
      {
        title: "Help",
        items: [
          { href: "/contact", label: "Contact" },
          { href: "/faq", label: "FAQ" },
        ],
      },
      {
        title: "Legal information",
        items: [
          { href: "/mentions-legales", label: "Legal notice" },
          { href: "/confidentialite", label: "Privacy policy" },
          { href: "/cookies", label: "Cookies and local storage" },
          { href: "/mes-donnees", label: "My personal data" },
          { href: "/cgv", label: "Terms of sale" },
        ],
      },
    ],
  },
  cookieNotice: {
    region: "Cookie information",
    title: "No advertising or audience-tracking cookies.",
    text: "Your action plan and checklists are stored only on your device.",
    more: "Learn more",
    ok: "Got it",
  },
  site: {
    independence:
      "We point you to the official sources; you always remain free to choose who you work with.",
    unverifiedNotice: "Information to be checked with the relevant authority.",
    defaultTitle: "MesDémarches — Organise your paperwork in France",
    description:
      "MesDémarches is a private support service that helps you organise your administrative and practical procedures in France: action plans, checklists and links to official sources.",
  },
};
