import type { Locale } from "@/i18n";

/** Libellés partagés par les pages Services (liste et détail). */
export const servicesCopy = {
  fr: {
    cta: "Être accompagné·e",
    eyebrow: "Catalogue",
    title: "Nos services",
    description: "Un conseiller dédié pour chacune de vos démarches en France. Choisissez votre domaine, on s'occupe du reste avec vous.",
    metaDescription:
      "Accompagnement personnalisé pour étrangers et expatriés en France : installation, titre de séjour, logement, banque, travail, santé, impôts et numérique.",
    filters: "Filtres",
    allDomains: "Tous les domaines",
    allFormats: "Tous les formats",
    empty: "Aucun service ne correspond à ces filtres.",
    reset: "Réinitialiser les filtres",
    domainDetail: "Voir le détail du domaine",
    breadcrumb: "Fil d'Ariane",
    whatWeOffer: "Ce que nous proposons",
    relatedGuides: "Guides associés",
    sources: "Sources officielles utiles",
    limits: "Les limites de ce service",
    helpTitle: "Besoin d'y voir plus clair ?",
    helpText: "15 minutes offertes avec un conseiller pour savoir exactement quoi faire.",
    helpCta: "Réserver mon appel offert",
  },
  en: {
    cta: "Get support",
    eyebrow: "Catalogue",
    title: "Our services",
    description: "A dedicated advisor for each of your procedures in France. Pick your topic, we handle the rest with you.",
    metaDescription:
      "Personal support for foreigners and expats in France: settling in, residence permits, housing, banking, work, health, tax and digital.",
    filters: "Filters",
    allDomains: "All topics",
    allFormats: "All formats",
    empty: "No service matches these filters.",
    reset: "Reset filters",
    domainDetail: "See this topic in detail",
    breadcrumb: "Breadcrumb",
    whatWeOffer: "What we offer",
    relatedGuides: "Related guides",
    sources: "Useful official sources",
    limits: "The limits of this service",
    helpTitle: "Need a clearer picture?",
    helpText: "15 free minutes with an advisor to know exactly what to do.",
    helpCta: "Book my free call",
  },
} satisfies Record<Locale, unknown>;
