import type { CategoryId } from "./categories";
import type { SourceId } from "./sources";

/**
 * Catalogue des services, regroupés par domaine.
 * Chaque domaine a sa page de détail (/services/[domaine]).
 * `active: false` masque un domaine ou un service sans supprimer son contenu
 * (en attendant l'espace administrateur prévu en phase 2).
 */
export type ServiceFormat = "guide" | "outil" | "accompagnement";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  format: ServiceFormat;
  /** Lien interne vers le guide ou l'outil correspondant. */
  href?: string;
  active: boolean;
};

export type ServiceDomain = {
  category: CategoryId;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  items: ServiceItem[];
  /** Limites du service, affichées clairement sur la page. */
  limits: string[];
  sourceIds: SourceId[];
  active: boolean;
};

export const serviceFormatLabels: Record<ServiceFormat, string> = {
  guide: "Guide gratuit",
  outil: "Outil gratuit",
  accompagnement: "Avec accompagnement",
};

export const serviceDomains: ServiceDomain[] = [
  {
    category: "installation",
    slug: "installation-en-france",
    seoTitle: "Organiser son installation en France",
    seoDescription:
      "Checklist des premières démarches, priorités, calendrier d'installation et organisation des documents pour bien démarrer en France.",
    intro:
      "Arriver en France implique de nombreuses démarches en parallèle. Nous vous aidons à les lister, à les classer par priorité et à les répartir dans le temps.",
    items: [
      {
        id: "checklist-premieres-demarches",
        title: "Checklist des premières démarches",
        description:
          "Une liste structurée des démarches généralement rencontrées lors d'une installation, à adapter à votre situation.",
        format: "guide",
        href: "/guides/premieres-demarches-installation",
        active: true,
      },
      {
        id: "organisation-priorites",
        title: "Organisation des priorités",
        description:
          "Identifier ce qui conditionne le reste (adresse, compte bancaire, documents d'identité) pour avancer dans le bon ordre.",
        format: "outil",
        href: "/plan-action",
        active: true,
      },
      {
        id: "calendrier-installation",
        title: "Calendrier d'installation",
        description:
          "Un découpage semaine par semaine de vos démarches, construit avec vous lors d'un rendez-vous.",
        format: "accompagnement",
        href: "/tarifs",
        active: true,
      },
      {
        id: "organisation-documents",
        title: "Organisation des documents",
        description:
          "Une méthode simple pour classer vos justificatifs, papier et numériques, et les retrouver rapidement.",
        format: "guide",
        href: "/guides/organiser-ses-documents-numeriques",
        active: true,
      },
      {
        id: "organismes-utiles",
        title: "Liens vers les organismes utiles",
        description:
          "Les sites officiels à connaître, avec une explication de leur rôle.",
        format: "guide",
        href: "/guides/premieres-demarches-installation",
        active: true,
      },
    ],
    limits: [
      "Nous ne déterminons pas votre situation administrative ni vos droits au séjour.",
      "Les démarches liées au titre de séjour relèvent exclusivement des autorités compétentes.",
    ],
    sourceIds: ["service-public", "sp-etranger", "anef", "france-services"],
    active: true,
  },
  {
    category: "logement",
    slug: "logement",
    seoTitle: "Logement : préparer sa location et son emménagement",
    seoDescription:
      "Checklist du dossier locatif, étapes d'une location, emménagement et assurance habitation, avec les ressources officielles.",
    intro:
      "Trouver un logement demande un dossier complet et une bonne compréhension des étapes. Nous vous aidons à vous préparer et à ne rien oublier lors de l'emménagement.",
    items: [
      {
        id: "dossier-locatif",
        title: "Checklist pour préparer un dossier locatif",
        description:
          "Les pièces habituellement demandées et les ressources publiques pour constituer votre dossier.",
        format: "guide",
        href: "/guides/preparer-dossier-locatif",
        active: true,
      },
      {
        id: "etapes-location",
        title: "Les étapes d'une location expliquées",
        description:
          "De la visite à la remise des clés : bail, état des lieux, dépôt de garantie, expliqués simplement.",
        format: "guide",
        href: "/guides/preparer-dossier-locatif",
        active: true,
      },
      {
        id: "emmenagement",
        title: "Organisation des démarches d'emménagement",
        description:
          "Énergie, internet, assurance, changement d'adresse : une liste pour ne rien oublier.",
        format: "guide",
        href: "/guides/checklist-demenagement",
        active: true,
      },
      {
        id: "assurance-habitation",
        title: "Assurance habitation et contrats liés au logement",
        description:
          "Comprendre le rôle de l'assurance habitation et des contrats d'énergie, sans recommandation commerciale.",
        format: "guide",
        href: "/guides/checklist-demenagement",
        active: true,
      },
      {
        id: "ressources-logement",
        title: "Repérage des ressources officielles",
        description: "Les sites publics à consulter pour le logement et les aides.",
        format: "guide",
        href: "/guides/preparer-dossier-locatif",
        active: true,
      },
    ],
    limits: [
      "Nous ne sommes pas une agence immobilière et ne proposons pas de logements.",
      "Nous ne garantissons pas l'acceptation d'un dossier par un propriétaire.",
    ],
    sourceIds: ["sp-logement", "dossierfacile", "visale", "caf"],
    active: true,
  },
  {
    category: "banque",
    slug: "banque-et-budget",
    seoTitle: "Banque : comprendre l'ouverture d'un compte et le crédit",
    seoDescription:
      "Contenus pédagogiques sur l'ouverture d'un compte bancaire, le vocabulaire bancaire, le TAEG et la préparation d'un rendez-vous bancaire.",
    intro:
      "Des explications pédagogiques pour comprendre le fonctionnement bancaire en France et préparer vos rendez-vous. Ces contenus sont informatifs uniquement.",
    items: [
      {
        id: "ouvrir-compte",
        title: "Comprendre les démarches pour ouvrir un compte",
        description: "Les étapes habituelles et les justificatifs généralement demandés.",
        format: "guide",
        href: "/guides/comprendre-ouverture-compte-bancaire",
        active: true,
      },
      {
        id: "glossaire-bancaire",
        title: "Glossaire bancaire",
        description: "RIB, IBAN, découvert, frais de tenue de compte : les mots expliqués.",
        format: "guide",
        href: "/guides/comprendre-ouverture-compte-bancaire",
        active: true,
      },
      {
        id: "comprendre-credit",
        title: "TAEG, mensualités et coût total du crédit",
        description:
          "Une explication pédagogique pour savoir lire une offre de crédit. Aucune recommandation personnalisée.",
        format: "guide",
        href: "/guides/comprendre-le-cout-d-un-credit",
        active: true,
      },
      {
        id: "questions-conseiller",
        title: "Questions à poser à un conseiller bancaire",
        description: "Une liste de questions pour préparer votre rendez-vous.",
        format: "guide",
        href: "/guides/comprendre-ouverture-compte-bancaire",
        active: true,
      },
      {
        id: "preparation-rdv-bancaire",
        title: "Préparation administrative d'un rendez-vous bancaire",
        description: "Rassembler et classer les documents avant le rendez-vous.",
        format: "accompagnement",
        href: "/tarifs",
        active: true,
      },
    ],
    limits: [
      "Nous ne recommandons aucun crédit, aucune banque et aucun produit financier.",
      "Nous ne mettons pas en relation avec des prêteurs et ne percevons aucune rémunération d'établissements financiers.",
      "Nous ne fournissons pas de conseil en investissement.",
    ],
    sourceIds: ["banque-france", "mesquestionsdargent", "sp-argent"],
    active: true,
  },
  {
    category: "travail",
    slug: "travail-et-salaire",
    seoTitle: "Travail et salaire : documents d'embauche et fiche de paie",
    seoDescription:
      "Organiser les documents liés à l'embauche, comprendre les rubriques d'une fiche de paie et gérer un changement de situation professionnelle.",
    intro:
      "Un nouvel emploi s'accompagne de documents à fournir et à conserver. Nous vous aidons à vous y retrouver et à comprendre votre fiche de paie.",
    items: [
      {
        id: "documents-embauche",
        title: "Organisation des documents liés à l'embauche",
        description: "Ce qui est généralement demandé et ce qu'il faut conserver.",
        format: "guide",
        href: "/guides/comprendre-sa-fiche-de-paie",
        active: true,
      },
      {
        id: "fiche-paie",
        title: "Les rubriques d'une fiche de paie expliquées",
        description: "Brut, cotisations, net, prélèvement à la source : lecture guidée.",
        format: "guide",
        href: "/guides/comprendre-sa-fiche-de-paie",
        active: true,
      },
      {
        id: "glossaire-travail",
        title: "Glossaire des termes professionnels",
        description: "Les termes courants du contrat et de la paie, expliqués simplement.",
        format: "guide",
        href: "/guides/comprendre-sa-fiche-de-paie",
        active: true,
      },
      {
        id: "changement-situation",
        title: "Checklist lors d'un changement de situation professionnelle",
        description:
          "Les points d'organisation à vérifier lors d'un départ, d'un nouveau poste ou d'une période sans emploi.",
        format: "accompagnement",
        href: "/tarifs",
        active: true,
      },
    ],
    limits: [
      "Nous ne fournissons pas de conseil juridique en droit du travail.",
      "En cas de litige, adressez-vous aux organismes compétents ou à un professionnel du droit.",
    ],
    sourceIds: ["sp-travail", "sp-fiche-paie", "travail-emploi", "france-travail"],
    active: true,
  },
  {
    category: "sante",
    slug: "sante-et-protection-sociale",
    seoTitle: "Santé et protection sociale : s'orienter vers les bons sites",
    seoDescription:
      "Orientation vers les sites officiels de l'Assurance Maladie et de la protection sociale, checklists documentaires générales.",
    intro:
      "La protection sociale française repose sur plusieurs organismes. Nous vous aidons à identifier lesquels consulter et à préparer vos documents.",
    items: [
      {
        id: "orientation-sante",
        title: "Orientation vers les sites officiels",
        description: "Quel organisme fait quoi, et où trouver l'information à jour.",
        format: "guide",
        href: "/guides/s-orienter-protection-sociale",
        active: true,
      },
      {
        id: "checklist-sante",
        title: "Checklists documentaires générales",
        description: "Les documents habituellement utiles pour vos démarches de santé.",
        format: "guide",
        href: "/guides/s-orienter-protection-sociale",
        active: true,
      },
      {
        id: "etapes-sante",
        title: "Explication des étapes administratives usuelles",
        description: "Les grandes étapes, présentées de façon générale.",
        format: "guide",
        href: "/guides/s-orienter-protection-sociale",
        active: true,
      },
    ],
    limits: [
      "Nous ne déterminons pas vos droits à l'assurance maladie ou aux prestations sociales.",
      "Nous ne donnons aucun avis médical.",
    ],
    sourceIds: ["ameli", "sp-social-sante", "caf"],
    active: true,
  },
  {
    category: "impots",
    slug: "impots-et-budget",
    seoTitle: "Impôts et budget : s'organiser simplement",
    seoDescription:
      "Outil de budget mensuel, checklist de documents pour préparer une déclaration et glossaire fiscal pédagogique.",
    intro:
      "Un budget clair et des documents bien rangés facilitent toutes les démarches financières. Nos outils restent pédagogiques et généraux.",
    items: [
      {
        id: "budget-mensuel",
        title: "Outil simple de budget mensuel",
        description: "Calculez votre reste à vivre en quelques lignes, directement dans votre navigateur.",
        format: "outil",
        href: "/outils/budget",
        active: true,
      },
      {
        id: "checklist-declaration",
        title: "Checklist de documents pour préparer une déclaration",
        description: "Les documents généralement utiles à rassembler avant de déclarer.",
        format: "guide",
        href: "/guides/preparer-sa-declaration-de-revenus",
        active: true,
      },
      {
        id: "glossaire-fiscal",
        title: "Glossaire fiscal pédagogique",
        description: "Foyer fiscal, prélèvement à la source, avis d'imposition : les termes expliqués.",
        format: "guide",
        href: "/guides/preparer-sa-declaration-de-revenus",
        active: true,
      },
      {
        id: "liens-fiscaux",
        title: "Liens vers les services officiels",
        description: "Les espaces en ligne de l'administration fiscale.",
        format: "guide",
        href: "/guides/preparer-sa-declaration-de-revenus",
        active: true,
      },
    ],
    limits: [
      "Nous ne produisons pas de stratégie fiscale individualisée.",
      "Nous ne déterminons pas vos obligations fiscales personnelles : seule l'administration fiscale ou un professionnel habilité peut le faire.",
    ],
    sourceIds: ["impots", "sp-declaration-revenus", "mesquestionsdargent"],
    active: true,
  },
  {
    category: "famille",
    slug: "famille-et-vie-quotidienne",
    seoTitle: "Famille et vie quotidienne : école, déménagement, contrats",
    seoDescription:
      "Organiser les démarches scolaires, le déménagement, les contrats internet, énergie et assurance, et se protéger des arnaques.",
    intro:
      "La vie quotidienne apporte son lot de contrats et d'inscriptions. Nous vous aidons à les organiser et à repérer les tentatives d'arnaque.",
    items: [
      {
        id: "scolarite",
        title: "Organisation des démarches scolaires",
        description: "Les étapes générales et les interlocuteurs à contacter.",
        format: "accompagnement",
        href: "/tarifs",
        active: true,
      },
      {
        id: "demenagement",
        title: "Checklist de déménagement",
        description: "Avant, pendant et après le déménagement.",
        format: "guide",
        href: "/guides/checklist-demenagement",
        active: true,
      },
      {
        id: "contrats-telecom",
        title: "Contrats de téléphone et d'internet",
        description: "Les points à vérifier avant de signer un contrat.",
        format: "guide",
        href: "/guides/checklist-demenagement",
        active: true,
      },
      {
        id: "energie-assurance",
        title: "Électricité, gaz et assurance habitation",
        description: "Comprendre les contrats et où trouver une information neutre.",
        format: "guide",
        href: "/guides/checklist-demenagement",
        active: true,
      },
      {
        id: "arnaques",
        title: "Prévention des arnaques administratives",
        description: "Reconnaître les faux sites, faux appels et messages frauduleux.",
        format: "guide",
        href: "/guides/eviter-les-arnaques-administratives",
        active: true,
      },
    ],
    limits: [
      "Nous ne recommandons aucun fournisseur d'énergie, d'internet ou d'assurance.",
    ],
    sourceIds: ["sp-famille", "sp-demenagement", "energie-info", "signalconso"],
    active: true,
  },
  {
    category: "numerique",
    slug: "demarches-numeriques",
    seoTitle: "Démarches numériques : portails officiels et sécurité",
    seoDescription:
      "Repérer les portails officiels, sécuriser ses comptes en ligne, télécharger et classer ses justificatifs.",
    intro:
      "La plupart des démarches se font en ligne. Nous vous aidons à identifier les vrais portails et à protéger vos accès.",
    items: [
      {
        id: "portails-officiels",
        title: "Repérage des portails officiels",
        description: "Comment reconnaître un site officiel et éviter les intermédiaires trompeurs.",
        format: "guide",
        href: "/guides/eviter-les-arnaques-administratives",
        active: true,
      },
      {
        id: "securite-numerique",
        title: "Conseils de sécurité numérique",
        description: "Mots de passe, double authentification, messages suspects.",
        format: "guide",
        href: "/guides/organiser-ses-documents-numeriques",
        active: true,
      },
      {
        id: "organisation-documents-num",
        title: "Organisation des documents",
        description: "Une arborescence simple pour vos fichiers.",
        format: "guide",
        href: "/guides/organiser-ses-documents-numeriques",
        active: true,
      },
      {
        id: "classer-justificatifs",
        title: "Télécharger et classer les justificatifs",
        description: "Nommer, ranger et sauvegarder vos documents.",
        format: "guide",
        href: "/guides/organiser-ses-documents-numeriques",
        active: true,
      },
    ],
    limits: [
      "Nous ne vous demanderons jamais vos identifiants ou mots de passe d'accès aux sites administratifs.",
    ],
    sourceIds: ["franceconnect", "cybermalveillance", "cnil"],
    active: true,
  },
];

export function getActiveDomains(): ServiceDomain[] {
  return serviceDomains.filter((d) => d.active);
}

export function getDomainBySlug(slug: string): ServiceDomain | undefined {
  return serviceDomains.find((d) => d.slug === slug && d.active);
}

export function getDomainByCategory(category: CategoryId): ServiceDomain | undefined {
  return serviceDomains.find((d) => d.category === category && d.active);
}
