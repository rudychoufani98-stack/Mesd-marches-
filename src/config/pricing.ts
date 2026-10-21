/**
 * Offres et prix PAR DÉFAUT.
 * Une fois Supabase configuré, les offres se modifient dans l'espace admin (/admin/tarifs) ;
 * ces valeurs servent alors de contenu initial (bouton « Importer le contenu par défaut »)
 * et de secours si la base est vide ou indisponible.
 * Les prix sont des prix de test : ils doivent être validés avant toute commercialisation.
 */
export type OfferId = "bilan" | "installation" | "suivi";

export type Offer = {
  id: string;
  name: string;
  tagline: string;
  /** Prix TTC en euros. */
  price: number;
  billing: "unique" | "mensuel";
  duration: string;
  includes: string[];
  excludes: string[];
  responseTime: string;
  cancellation: string;
  highlighted?: boolean;
};

export const PRICES_ARE_TEST_VALUES = true;

export const defaultOffers: Offer[] = [
  {
    id: "bilan",
    name: "Bilan administratif",
    tagline: "Pour savoir par où commencer.",
    price: 29,
    billing: "unique",
    duration: "Rendez-vous de 30 minutes",
    includes: [
      "Rendez-vous de 30 minutes en visio ou par téléphone",
      "Identification des démarches prioritaires",
      "Checklist personnalisée",
      "Liens vers les ressources officielles",
    ],
    excludes: [
      "Réalisation des démarches à votre place",
      "Conseil juridique, fiscal ou financier personnalisé",
      "Contact avec les administrations en votre nom",
    ],
    responseTime: "Proposition de créneau sous 2 jours ouvrés après votre demande.",
    cancellation:
      "Rendez-vous annulable ou reportable gratuitement jusqu'à 24 h avant l'heure prévue.",
  },
  {
    id: "installation",
    name: "Installation en France",
    tagline: "Pour organiser vos premières semaines.",
    price: 69,
    billing: "unique",
    duration: "Rendez-vous de 60 minutes",
    includes: [
      "Rendez-vous de 60 minutes en visio ou par téléphone",
      "Plan d'action sur 30 jours",
      "Calendrier des démarches",
      "Checklist documentaire",
      "Suivi limité pendant 7 jours (questions par e-mail)",
    ],
    excludes: [
      "Réalisation des démarches à votre place",
      "Conseil juridique, fiscal ou financier personnalisé",
      "Garantie d'obtention d'un logement, d'un compte ou d'un document",
    ],
    responseTime:
      "Proposition de créneau sous 2 jours ouvrés. Pendant le suivi, réponse aux questions sous 2 jours ouvrés.",
    cancellation:
      "Rendez-vous annulable ou reportable gratuitement jusqu'à 24 h avant l'heure prévue.",
    highlighted: true,
  },
  {
    id: "suivi",
    name: "Suivi administratif",
    tagline: "Pour avancer avec un point régulier.",
    price: 39,
    billing: "mensuel",
    duration: "Un rendez-vous de suivi par mois",
    includes: [
      "Un rendez-vous de suivi mensuel",
      "Mise à jour du plan d'action",
      "Jusqu'à 5 questions écrites par mois",
      "Organisation des prochaines étapes",
    ],
    excludes: [
      "Réalisation des démarches à votre place",
      "Conseil juridique, fiscal ou financier personnalisé",
      "Report des questions non utilisées sur le mois suivant",
    ],
    responseTime: "Réponse aux questions écrites sous 2 jours ouvrés.",
    cancellation:
      "Sans engagement de durée : résiliable à tout moment, effet à la fin de la période mensuelle en cours.",
  },
];

export function formatPrice(offer: Offer): string {
  const amount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(offer.price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(offer.price);
  return offer.billing === "mensuel" ? `${amount} / mois` : amount;
}
