import type { Locale } from "@/i18n";

/**
 * Catalogue MesDémarches : catégories à prix fixe et services qu'elles regroupent.
 *
 * - Le prix est fixé par CATÉGORIE (pas de prix par service).
 * - Les particuliers paient un prix fixe ; « MesDémarches Business » est « à partir de ».
 * - Une fois la base configurée, tout se modifie dans l'admin (Catalogue) ; ce fichier
 *   sert de contenu initial et de secours.
 * - Les intitulés restent dans l'accompagnement (« comprendre / préparer ») : aucune prestation
 *   réglementée (carte T, courtage, conseil juridique ou financier personnalisé).
 */

export type CategoryKind = "particulier" | "business";

export type CategoryIcon = "logement" | "fiscalite" | "sante" | "banque" | "emploi" | "immigration" | "quotidien" | "business";

export type CatalogService = {
  id: string;
  categoryId: string;
  name: string;
  /** Question d'identification du besoin (« Vous souhaitez… ? »). */
  question: string;
  sort: number;
  active: boolean;
  en?: { name?: string; question?: string };
};

export type CatalogCategory = {
  id: string;
  kind: CategoryKind;
  name: string;
  description: string;
  /** Prix TTC en euros. */
  price: number;
  /** « À partir de » (offre entreprises uniquement). */
  priceFrom: boolean;
  icon: CategoryIcon;
  /** Ce qui est compris dans l'accompagnement (périmètre précis). */
  includes: string[];
  sort: number;
  active: boolean;
  en?: { name?: string; description?: string; includes?: string[] };
};

export type Catalog = { categories: CatalogCategory[]; services: CatalogService[] };

/** Appel découverte : gratuit, 15 minutes, sans engagement. */
export const DISCOVERY = {
  id: "decouverte",
  minutes: 15,
  name: { fr: "Appel découverte gratuit", en: "Free discovery call" },
} as const;

const INCLUDES_FR = [
  "Un rendez-vous individuel de 45 minutes, en visio ou par téléphone",
  "Une analyse de votre situation et de vos documents",
  "Un plan d'action clair et la liste des pièces à préparer",
  "7 jours de questions par e-mail après le rendez-vous",
];
const INCLUDES_EN = [
  "A 45-minute one-to-one appointment, by video or phone",
  "A review of your situation and your documents",
  "A clear action plan and the list of documents to prepare",
  "7 days of email questions after the appointment",
];

type Seed = [id: string, fr: [string, string], en: [string, string]];

function services(categoryId: string, seeds: Seed[]): CatalogService[] {
  return seeds.map(([id, [name, question], [nameEn, questionEn]], i) => ({
    id: `${categoryId}-${id}`,
    categoryId,
    name,
    question,
    sort: i,
    active: true,
    en: { name: nameEn, question: questionEn },
  }));
}

export const defaultCategories: CatalogCategory[] = [
  {
    id: "logement",
    kind: "particulier",
    name: "Immobilier & logement",
    description: "Trouver, louer ou acheter un logement en comprenant chaque étape.",
    price: 59,
    priceFrom: false,
    icon: "logement",
    includes: INCLUDES_FR,
    sort: 0,
    active: true,
    en: { name: "Housing & property", description: "Find, rent or buy a home, understanding every step.", includes: INCLUDES_EN },
  },
  {
    id: "fiscalite",
    kind: "particulier",
    name: "Fiscalité & impôts",
    description: "Déclarer vos revenus et comprendre vos impôts en France.",
    price: 49,
    priceFrom: false,
    icon: "fiscalite",
    includes: INCLUDES_FR,
    sort: 1,
    active: true,
    en: { name: "Tax & income tax", description: "File your income and understand your taxes in France.", includes: INCLUDES_EN },
  },
  {
    id: "sante",
    kind: "particulier",
    name: "Santé & assurances",
    description: "Sécurité sociale, carte Vitale, remboursements et assurances.",
    price: 39,
    priceFrom: false,
    icon: "sante",
    includes: INCLUDES_FR,
    sort: 2,
    active: true,
    en: { name: "Health & insurance", description: "Social security, carte Vitale, reimbursements and insurance.", includes: INCLUDES_EN },
  },
  {
    id: "banque",
    kind: "particulier",
    name: "Banque & finances personnelles",
    description: "Compte bancaire, services, budget : reprendre la main sur vos finances.",
    price: 39,
    priceFrom: false,
    icon: "banque",
    includes: INCLUDES_FR,
    sort: 3,
    active: true,
    en: { name: "Banking & personal finance", description: "Bank account, services, budget: take control of your finances.", includes: INCLUDES_EN },
  },
  {
    id: "emploi",
    kind: "particulier",
    name: "Emploi & vie professionnelle",
    description: "CV, entretien, contrat, fiche de paie : réussir votre vie professionnelle.",
    price: 39,
    priceFrom: false,
    icon: "emploi",
    includes: INCLUDES_FR,
    sort: 4,
    active: true,
    en: { name: "Jobs & working life", description: "CV, interview, contract, payslip: succeed in your working life.", includes: INCLUDES_EN },
  },
  {
    id: "immigration",
    kind: "particulier",
    name: "Immigration & démarches administratives",
    description: "Titre de séjour, nationalité, courriers : des dossiers complets et organisés.",
    price: 49,
    priceFrom: false,
    icon: "immigration",
    includes: INCLUDES_FR,
    sort: 5,
    active: true,
    en: { name: "Immigration & paperwork", description: "Residence permit, nationality, letters: complete, organised files.", includes: INCLUDES_EN },
  },
  {
    id: "quotidien",
    kind: "particulier",
    name: "Vie quotidienne & installation",
    description: "Les premières démarches, les contrats et les factures du quotidien.",
    price: 29,
    priceFrom: false,
    icon: "quotidien",
    includes: INCLUDES_FR,
    sort: 6,
    active: true,
    en: { name: "Everyday life & settling in", description: "First steps, everyday contracts and bills.", includes: INCLUDES_EN },
  },
  {
    id: "business",
    kind: "business",
    name: "MesDémarches Business",
    description: "Accueillir et accompagner vos collaborateurs internationaux.",
    price: 199,
    priceFrom: true,
    icon: "business",
    includes: [
      "Un échange pour comprendre vos besoins et vos recrutements",
      "Une proposition adaptée : accompagnement individuel, guide, atelier",
      "Un interlocuteur unique pour vos équipes RH et vos collaborateurs",
    ],
    sort: 7,
    active: true,
    en: {
      name: "MesDémarches Business",
      description: "Welcome and support your international employees.",
      includes: [
        "A call to understand your needs and your hires",
        "A tailored proposal: one-to-one support, guide, workshop",
        "A single point of contact for your HR team and your employees",
      ],
    },
  },
];

export const defaultServices: CatalogService[] = [
  ...services("logement", [
    ["recherche", ["Préparer votre recherche de logement", "Vous souhaitez trouver un logement en France et ne savez pas par où commencer ?"], ["Prepare your home search", "You want to find a home in France and don't know where to start?"]],
    ["dossier-locatif", ["Préparation du dossier locatif", "Vous avez besoin de constituer un dossier solide pour rassurer un propriétaire ou une agence ?"], ["Prepare your rental file", "You need a strong file to reassure a landlord or an agency?"]],
    ["bail", ["Comprendre un bail et les documents immobiliers", "Vous souhaitez mieux comprendre les documents liés à votre location ?"], ["Understand a lease and property documents", "You want to better understand the documents for your rental?"]],
    ["achat", ["Comprendre les étapes d'un achat immobilier", "Vous envisagez d'acheter un bien et souhaitez comprendre les étapes, les frais et les intervenants ?"], ["Understand the steps of buying a property", "You are thinking of buying and want to understand the steps, costs and people involved?"]],
    ["rentabilite", ["Comprendre le calcul de rentabilité", "Vous souhaitez comprendre comment se calcule la rentabilité d'un investissement locatif ?"], ["Understand rental yield calculations", "You want to understand how the yield of a rental investment is calculated?"]],
    ["financement", ["Préparer votre dossier de financement", "Vous souhaitez savoir quels documents réunir et comment présenter votre dossier avant de solliciter une banque ?"], ["Prepare your financing file", "You want to know which documents to gather and how to present your file before approaching a bank?"]],
    ["rdv-bancaire", ["Préparation d'un rendez-vous bancaire", "Vous souhaitez savoir quels documents préparer et quelles questions poser à votre banque ?"], ["Prepare a bank appointment", "You want to know which documents to prepare and which questions to ask your bank?"]],
  ]),
  ...services("fiscalite", [
    ["premiere-declaration", ["Première déclaration de revenus", "Vous déclarez vos impôts en France pour la première fois et souhaitez être guidé ?"], ["Your first tax return", "You are filing taxes in France for the first time and want guidance?"]],
    ["avis", ["Comprendre son avis d'imposition", "Vous avez reçu un avis d'impôt et souhaitez comprendre les montants et les informations indiqués ?"], ["Understand your tax notice", "You received a tax notice and want to understand the amounts and information on it?"]],
    ["espace-fiscal", ["Création de votre espace fiscal", "Vous souhaitez créer ou accéder à votre espace personnel sur impots.gouv.fr ?"], ["Create your online tax account", "You want to create or access your personal account on impots.gouv.fr?"]],
    ["prelevement", ["Comprendre le prélèvement à la source", "Vous souhaitez savoir comment fonctionne le prélèvement de vos impôts sur votre salaire ?"], ["Understand withholding tax", "You want to know how tax is deducted from your salary?"]],
    ["changement", ["Changement de situation personnelle", "Vous avez déménagé, changé de situation familiale ou de travail et souhaitez savoir quelles démarches effectuer ?"], ["Change in personal situation", "You moved, or your family or work situation changed, and want to know what to do?"]],
    ["documents", ["Organisation de vos documents fiscaux", "Vous souhaitez savoir quels justificatifs conserver et comment organiser vos documents ?"], ["Organise your tax documents", "You want to know which proofs to keep and how to organise your documents?"]],
  ]),
  ...services("sante", [
    ["assurance-maladie", ["Inscription à l'Assurance Maladie", "Vous venez d'arriver en France et souhaitez ouvrir vos droits à la Sécurité sociale ?"], ["Register with French health insurance", "You have just arrived in France and want to open your social security rights?"]],
    ["carte-vitale", ["Demande de carte Vitale", "Vous souhaitez obtenir votre carte Vitale ou comprendre comment en faire la demande ?"], ["Apply for your carte Vitale", "You want to get your carte Vitale or understand how to apply?"]],
    ["ameli", ["Création du compte Ameli", "Vous souhaitez accéder à vos remboursements et gérer votre dossier de santé en ligne ?"], ["Create your Ameli account", "You want to access your reimbursements and manage your health file online?"]],
    ["remboursements", ["Comprendre les remboursements de santé", "Vous souhaitez comprendre ce que rembourse la Sécurité sociale et ce qui reste à votre charge ?"], ["Understand health reimbursements", "You want to understand what social security covers and what you pay yourself?"]],
    ["complementaire", ["Comprendre la complémentaire santé", "Vous souhaitez comprendre le fonctionnement d'une mutuelle et comment comparer les garanties ?"], ["Understand top-up health insurance", "You want to understand how a mutuelle works and how to compare cover?"]],
    ["assurances", ["Comprendre vos démarches d'assurance", "Vous avez besoin de mieux comprendre les assurances obligatoires ou utiles dans votre situation ?"], ["Understand your insurance steps", "You need to better understand the compulsory or useful insurance in your situation?"]],
  ]),
  ...services("banque", [
    ["ouverture", ["Ouverture d'un compte bancaire", "Vous souhaitez ouvrir un compte bancaire en France et connaître les documents nécessaires ?"], ["Open a bank account", "You want to open a bank account in France and know which documents you need?"]],
    ["services", ["Comprendre les services bancaires", "Vous souhaitez comprendre les frais, les cartes, les virements et les services proposés par votre banque ?"], ["Understand banking services", "You want to understand the fees, cards, transfers and services your bank offers?"]],
    ["rdv", ["Préparer un rendez-vous bancaire", "Vous avez un rendez-vous avec un conseiller et souhaitez bien préparer vos questions ?"], ["Prepare a bank appointment", "You have a meeting with an adviser and want to prepare your questions?"]],
    ["releve", ["Comprendre un relevé bancaire", "Vous souhaitez identifier les opérations, prélèvements et frais présents sur votre relevé ?"], ["Understand a bank statement", "You want to identify the transactions, direct debits and fees on your statement?"]],
    ["budget", ["Organiser votre budget personnel", "Vous souhaitez mieux gérer vos revenus, vos dépenses et votre épargne ?"], ["Organise your personal budget", "You want to better manage your income, spending and savings?"]],
    ["credit", ["Comprendre le fonctionnement du crédit", "Vous souhaitez comprendre le vocabulaire et le fonctionnement d'un crédit (taux, TAEG, assurance) avant de vous engager ?"], ["Understand how credit works", "You want to understand credit terms and how loans work (rate, APR, insurance) before committing?"]],
  ]),
  ...services("emploi", [
    ["cv", ["Création ou amélioration de CV", "Vous souhaitez créer un CV adapté au marché du travail français ?"], ["Create or improve your CV", "You want a CV suited to the French job market?"]],
    ["entretien", ["Préparation à un entretien d'embauche", "Vous avez un entretien et souhaitez vous préparer aux questions du recruteur ?"], ["Prepare for a job interview", "You have an interview and want to prepare for the recruiter's questions?"]],
    ["contrat", ["Comprendre votre contrat de travail", "Vous souhaitez mieux comprendre les principales clauses de votre contrat ?"], ["Understand your employment contract", "You want to better understand the main clauses of your contract?"]],
    ["fiche-paie", ["Comprendre votre fiche de paie", "Vous souhaitez comprendre votre salaire brut, votre salaire net et les différentes cotisations ?"], ["Understand your payslip", "You want to understand your gross and net salary and the contributions?"]],
    ["france-travail", ["Inscription à France Travail", "Vous recherchez un emploi et souhaitez comprendre les démarches d'inscription ?"], ["Register with France Travail", "You are looking for a job and want to understand how to register?"]],
    ["droits", ["Comprendre les règles du travail salarié", "Vous souhaitez mieux connaître les grandes règles et démarches liées à votre situation professionnelle ?"], ["Understand the rules of employment", "You want to know the main rules and steps related to your work situation?"]],
  ]),
  ...services("immigration", [
    ["installation", ["Première installation en France", "Vous venez d'arriver en France et souhaitez connaître les premières démarches à effectuer ?"], ["Settling in France", "You have just arrived in France and want to know the first steps?"]],
    ["titre-sejour", ["Titre de séjour", "Vous souhaitez comprendre les démarches liées à votre titre de séjour et les documents à préparer ?"], ["Residence permit", "You want to understand the residence permit process and the documents to prepare?"]],
    ["renouvellement", ["Renouvellement de titre de séjour", "Votre titre de séjour arrive à expiration et vous souhaitez anticiper son renouvellement ?"], ["Residence permit renewal", "Your residence permit is expiring and you want to plan its renewal?"]],
    ["regroupement", ["Regroupement familial", "Vous souhaitez faire venir votre famille en France et comprendre les principales étapes ?"], ["Family reunification", "You want to bring your family to France and understand the main steps?"]],
    ["nationalite", ["Nationalité française", "Vous souhaitez connaître les conditions et les démarches pour demander la nationalité française ?"], ["French nationality", "You want to know the conditions and steps to apply for French nationality?"]],
    ["courrier", ["Démarches auprès de l'administration", "Vous avez reçu un courrier administratif et souhaitez comprendre ce qu'on vous demande ?"], ["Dealing with the administration", "You received an official letter and want to understand what is being asked?"]],
    ["dossier", ["Constitution d'un dossier administratif", "Vous avez plusieurs justificatifs à réunir et souhaitez organiser un dossier complet ?"], ["Build an administrative file", "You have several documents to gather and want to organise a complete file?"]],
  ]),
  ...services("quotidien", [
    ["premieres-demarches", ["Les premières démarches après votre arrivée", "Vous venez de vous installer en France et souhaitez savoir quoi faire en priorité ?"], ["Your first steps after arriving", "You have just settled in France and want to know what to do first?"]],
    ["services-publics", ["Inscription dans les services publics", "Vous souhaitez comprendre comment accéder aux différents services administratifs en ligne ?"], ["Sign up for public services", "You want to understand how to access the various online public services?"]],
    ["factures", ["Comprendre les factures du quotidien", "Vous souhaitez mieux comprendre vos factures d'électricité, de gaz, d'eau ou d'internet ?"], ["Understand everyday bills", "You want to better understand your electricity, gas, water or internet bills?"]],
    ["contrats", ["Souscription aux contrats du quotidien", "Vous souhaitez savoir comment souscrire vos contrats d'énergie, d'internet ou de téléphonie ?"], ["Set up everyday contracts", "You want to know how to set up your energy, internet or phone contracts?"]],
    ["demenagement", ["Déménagement", "Vous changez de logement et souhaitez organiser les démarches à effectuer ?"], ["Moving home", "You are moving and want to organise the steps to take?"]],
    ["organisation", ["Organisation administrative personnelle", "Vous souhaitez centraliser vos documents et mieux gérer vos démarches en France ?"], ["Personal admin organisation", "You want to centralise your documents and better manage your paperwork in France?"]],
  ]),
  ...services("business", [
    ["accueil", ["Accueil des collaborateurs internationaux", "Vous recrutez un salarié étranger et souhaitez faciliter son installation en France ?"], ["Welcoming international employees", "You are hiring a foreign employee and want to ease their move to France?"]],
    ["parcours", ["Parcours d'intégration administrative", "Vous souhaitez proposer à vos nouvelles recrues un accompagnement clair dans leurs démarches ?"], ["Administrative onboarding path", "You want to give new hires clear support with their paperwork?"]],
    ["guide", ["Guide d'accueil personnalisé", "Vous souhaitez remettre à vos collaborateurs un guide pratique adapté à votre entreprise ?"], ["Tailored welcome guide", "You want to give your employees a practical guide tailored to your company?"]],
    ["individuel", ["Accompagnement individuel des salariés", "Vos collaborateurs ont besoin d'aide pour comprendre et organiser leurs démarches personnelles ?"], ["One-to-one employee support", "Your employees need help understanding and organising their personal paperwork?"]],
    ["atelier", ["Atelier d'information pour les équipes", "Vous souhaitez organiser une session collective pour expliquer les principales démarches en France ?"], ["Information workshop for teams", "You want a group session explaining the main procedures in France?"]],
    ["diagnostic", ["Diagnostic du processus d'intégration", "Vous souhaitez améliorer l'accueil et l'accompagnement administratif de vos collaborateurs internationaux ?"], ["Onboarding process review", "You want to improve how you welcome and support your international employees?"]],
  ]),
];

export const defaultCatalog: Catalog = { categories: defaultCategories, services: defaultServices };

/** Textes d'une catégorie dans la langue voulue (le prix ne change jamais). */
export function localizeCategory(c: CatalogCategory, locale: Locale): CatalogCategory {
  if (locale === "fr" || !c.en) return c;
  return {
    ...c,
    name: c.en.name || c.name,
    description: c.en.description || c.description,
    includes: c.en.includes?.length ? c.en.includes : c.includes,
  };
}

export function localizeService(s: CatalogService, locale: Locale): CatalogService {
  if (locale === "fr" || !s.en) return s;
  return { ...s, name: s.en.name || s.name, question: s.en.question || s.question };
}

export function formatEuros(amount: number, locale: Locale = "fr"): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** « 59 € » pour les particuliers, « À partir de 199 € » pour Business. */
export function formatCategoryPrice(c: Pick<CatalogCategory, "price" | "priceFrom">, locale: Locale): string {
  const p = formatEuros(c.price, locale);
  if (!c.priceFrom) return p;
  return locale === "en" ? `From ${p}` : `À partir de ${p}`;
}

/** Une catégorie est payable en ligne si c'est une offre particulier à prix fixe. */
export function isPayable(c: CatalogCategory): boolean {
  return c.kind === "particulier" && !c.priceFrom && c.price > 0;
}
