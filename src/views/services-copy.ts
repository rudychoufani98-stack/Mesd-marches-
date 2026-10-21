import type { Locale } from "@/i18n";
import type { ServiceFormat } from "@/content/services";

/** Libellés partagés par les pages Services (liste et détail). */
export const servicesCopy = {
  fr: {
    formats: { guide: "Guide gratuit", outil: "Outil gratuit", accompagnement: "Avec accompagnement" } as Record<ServiceFormat, string>,
    cta: { guide: "Lire le guide", outil: "Utiliser l'outil", accompagnement: "Voir les offres" } as Record<ServiceFormat, string>,
    eyebrow: "Catalogue",
    title: "Nos services",
    description: "Des guides et outils gratuits pour comprendre et organiser vos démarches, et un accompagnement humain en option.",
    metaDescription:
      "Guides gratuits, outils et accompagnement humain pour organiser vos démarches en France : installation, logement, banque, travail, santé, impôts, famille et numérique.",
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
    helpText: "Créez votre plan d'action gratuit en quelques questions.",
    helpCta: "Créer mon plan d'action",
  },
  en: {
    formats: { guide: "Free guide", outil: "Free tool", accompagnement: "With personal support" } as Record<ServiceFormat, string>,
    cta: { guide: "Read the guide", outil: "Use the tool", accompagnement: "See our offers" } as Record<ServiceFormat, string>,
    eyebrow: "Catalogue",
    title: "Our services",
    description: "Free guides and tools to understand and organise your procedures, with optional one-to-one support.",
    metaDescription:
      "Free guides, tools and personal support to organise your procedures in France: settling in, housing, banking, work, health, tax, family and digital.",
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
    helpText: "Create your free action plan in a few questions.",
    helpCta: "Create my action plan",
  },
} satisfies Record<Locale, unknown>;
