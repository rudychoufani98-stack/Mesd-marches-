import type { CategoryId } from "@/content/categories";

/**
 * Offres et prix PAR DÉFAUT.
 * Une fois Supabase configuré, les offres se modifient dans l'espace admin (/admin/tarifs) ;
 * ces valeurs servent alors de contenu initial (bouton « Importer le contenu par défaut »)
 * et de secours si la base est vide ou indisponible.
 *
 * Modèle de prix (21/10/2026) :
 * - un appel découverte gratuit pour faire connaissance ;
 * - un prix PAR DÉMARCHE, accessible, pour être aidé sur un point précis ;
 * - un pack « Arrivée en France » qui regroupe les démarches essentielles ;
 * - un abonnement mensuel léger pour avoir quelqu'un à qui poser ses questions.
 * Les prix sont des prix de lancement : ils doivent être validés avant toute commercialisation.
 */
export type OfferKind = "decouverte" | "demarche" | "pack" | "abonnement";

export type Offer = {
  id: string;
  kind: OfferKind;
  /** Domaine de la démarche (pour l'emoji et le regroupement). */
  category?: CategoryId;
  name: string;
  tagline: string;
  /** Prix TTC en euros (0 = gratuit). */
  price: number;
  billing: "unique" | "mensuel";
  duration: string;
  includes: string[];
  excludes: string[];
  responseTime: string;
  cancellation: string;
  highlighted?: boolean;
  /** Titre affiché sur l'accueil et les tarifs (sinon : objectif par défaut, puis le nom). */
  headline?: string;
  /** « Pourquoi c'est important », en une phrase. */
  why?: string;
  /** Textes anglais saisis dans l'admin (prioritaires sur les traductions du code). */
  en?: OfferEnglishTexts;
};

export type OfferEnglishTexts = { name?: string; tagline?: string; headline?: string; why?: string };

export const PRICES_ARE_TEST_VALUES = true;

/** Ce qui est inclus dans chaque démarche accompagnée (affiché une seule fois sur la page Tarifs). */
const DEMARCHE_INCLUDES = [
  "Un rendez-vous de 30 minutes (visio ou téléphone)",
  "Votre checklist personnalisée",
  "Relecture de vos documents avant envoi",
  "7 jours de questions par e-mail",
];

const DEMARCHE_EXCLUDES = [
  "Réaliser la démarche à votre place",
  "Garantir la décision de l'organisme",
  "Conseil juridique, fiscal ou financier personnalisé",
];

const DEMARCHE_COMMON = {
  kind: "demarche" as const,
  billing: "unique" as const,
  duration: "30 min + 7 jours de questions",
  includes: DEMARCHE_INCLUDES,
  excludes: DEMARCHE_EXCLUDES,
  responseTime: "Rendez-vous proposé sous 2 jours ouvrés ; réponse aux questions sous 2 jours ouvrés.",
  cancellation: "Annulable ou reportable gratuitement jusqu'à 24 h avant le rendez-vous.",
};

export const defaultOffers: Offer[] = [
  {
    id: "decouverte",
    kind: "decouverte",
    name: "Appel découverte",
    tagline: "On fait le point ensemble, gratuitement.",
    price: 0,
    billing: "unique",
    duration: "15 minutes, par téléphone ou en visio",
    includes: [
      "On écoute votre situation",
      "On identifie vos démarches prioritaires",
      "On vous dit honnêtement si vous avez besoin de nous (ou pas)",
    ],
    excludes: ["L'accompagnement détaillé d'une démarche"],
    responseTime: "Rappel proposé sous 2 jours ouvrés.",
    cancellation: "Gratuit et sans engagement.",
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-titre-sejour",
    category: "installation",
    name: "Préparer son dossier de titre de séjour",
    tagline: "Première demande ou renouvellement : un dossier complet, déposé dans les temps.",
    price: 39,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-naturalisation",
    category: "installation",
    name: "Préparer son dossier de naturalisation",
    tagline: "Pièces, traductions, dépôt en ligne et préparation à l'entretien.",
    duration: "60 min + 30 jours de questions",
    includes: [
      "Un rendez-vous de 60 minutes (visio ou téléphone)",
      "Votre liste de pièces personnalisée",
      "Relecture complète du dossier avant dépôt",
      "Préparation à l'entretien d'assimilation",
      "30 jours de questions par e-mail",
    ],
    price: 69,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-permis",
    category: "installation",
    name: "Échanger son permis de conduire étranger",
    tagline: "Vérifier votre cas et préparer la demande en ligne officielle.",
    price: 29,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-traductions",
    category: "installation",
    name: "Traductions assermentées",
    tagline: "Le bon traducteur assermenté, des documents vérifiés (traduction facturée par le traducteur).",
    price: 15,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-compte-bancaire",
    category: "banque",
    name: "Ouvrir un compte bancaire",
    tagline: "Les bons justificatifs, les bonnes questions, moins de refus.",
    price: 19,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-dossier-location",
    category: "logement",
    name: "Préparer son dossier de location",
    tagline: "Un dossier complet et clair pour rassurer les propriétaires.",
    price: 29,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-aide-logement",
    category: "logement",
    name: "Demander une aide au logement (CAF)",
    tagline: "Simuler, préparer les pièces et suivre votre demande.",
    price: 19,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-emmenagement",
    category: "famille",
    name: "Emménager : énergie, internet, assurance",
    tagline: "Tous vos contrats mis en place, sans rien oublier.",
    price: 19,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-assurance-maladie",
    category: "sante",
    name: "S'inscrire à l'Assurance Maladie",
    tagline: "Comprendre les étapes, préparer le dossier, créer son compte ameli.",
    price: 19,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-emploi",
    category: "travail",
    name: "Documents d'embauche et fiche de paie",
    tagline: "Savoir quoi fournir à l'employeur et comprendre son salaire.",
    price: 15,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-creation-entreprise",
    category: "travail",
    name: "Créer son auto-entreprise",
    tagline: "Choisir le bon statut, s'immatriculer, comprendre l'URSSAF.",
    price: 29,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-diplome",
    category: "travail",
    name: "Faire reconnaître son diplôme",
    tagline: "Attestation de comparabilité ou reconnaissance professionnelle : le bon dossier.",
    price: 25,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-impots",
    category: "impots",
    name: "Préparer sa première déclaration de revenus",
    tagline: "Créer son espace, rassembler les documents, comprendre les étapes.",
    price: 29,
  },
  {
    ...DEMARCHE_COMMON,
    id: "d-comptes-en-ligne",
    category: "numerique",
    name: "Créer et sécuriser ses comptes en ligne",
    tagline: "ameli, impots.gouv, FranceConnect : bien démarrer, en sécurité.",
    price: 15,
  },
  {
    id: "pack-arrivee",
    kind: "pack",
    name: "Pack Arrivée en France",
    tagline: "Les démarches essentielles de votre installation, avec vous.",
    price: 79,
    billing: "unique",
    duration: "30 jours d'accompagnement",
    includes: [
      "Un appel de 60 minutes pour faire le point",
      "Jusqu'à 5 démarches accompagnées au choix",
      "Votre plan d'action personnalisé sur 30 jours",
      "Vos questions par e-mail pendant 30 jours",
    ],
    excludes: DEMARCHE_EXCLUDES,
    responseTime: "Premier rendez-vous proposé sous 2 jours ouvrés ; réponse aux questions sous 2 jours ouvrés.",
    cancellation: "Rendez-vous annulables ou reportables gratuitement jusqu'à 24 h avant l'heure prévue.",
    highlighted: true,
  },
  {
    id: "abonnement",
    kind: "abonnement",
    name: "Abonnement Sérénité",
    tagline: "Quelqu'un à qui demander, toute l'année.",
    price: 19,
    billing: "mensuel",
    duration: "Mois par mois, sans engagement",
    includes: [
      "Vos questions par e-mail, réponse sous 2 jours ouvrés",
      "Un appel de 30 minutes par mois",
      "La mise à jour de votre plan d'action",
    ],
    excludes: ["Les démarches accompagnées en détail (disponibles à l'unité)", ...DEMARCHE_EXCLUDES.slice(2)],
    responseTime: "Réponse aux questions sous 2 jours ouvrés.",
    cancellation: "Sans engagement de durée : résiliable à tout moment, effet à la fin du mois en cours.",
  },
];

export function formatPrice(offer: Offer, locale: "fr" | "en" = "fr"): string {
  if (offer.price === 0) return locale === "en" ? "Free" : "Gratuit";
  const amount = new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(offer.price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(offer.price);
  return offer.billing === "mensuel" ? `${amount} / ${locale === "en" ? "month" : "mois"}` : amount;
}

/** Prix le plus bas d'une démarche, pour les accroches « à partir de ». */
export function lowestDemarchePrice(offers: Offer[]): number | null {
  const prices = offers.filter((o) => o.kind === "demarche").map((o) => o.price);
  return prices.length ? Math.min(...prices) : null;
}

/**
 * Remise selon le nombre de démarches choisies dans le sélecteur (page Tarifs).
 * Du plus grand seuil au plus petit : la première règle atteinte s'applique.
 */
export const bundleDiscounts = [
  { min: 5, percent: 25 },
  { min: 3, percent: 15 },
  { min: 2, percent: 10 },
];

export type SelectionTotal = {
  count: number;
  subtotal: number;
  discountPercent: number;
  discount: number;
  total: number;
};

/** Calcule le total d'une sélection de démarches (seules les offres « démarche » comptent). */
export function computeSelection(offers: Offer[], ids: readonly string[]): SelectionTotal {
  const chosen = offers.filter((o) => o.kind === "demarche" && ids.includes(o.id));
  const subtotal = chosen.reduce((sum, o) => sum + o.price, 0);
  const discountPercent = bundleDiscounts.find((d) => chosen.length >= d.min)?.percent ?? 0;
  // Total arrondi à l'euro (en faveur du client) pour un prix lisible.
  const total = Math.floor((subtotal * (100 - discountPercent)) / 100);
  return { count: chosen.length, subtotal, discountPercent, discount: subtotal - total, total };
}

export function formatEuros(amount: number, locale: "fr" | "en" = "fr"): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
