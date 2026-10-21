import type { OfferText } from "../translations";

const STEP_INCLUDES = [
  "A 30-minute appointment (video or phone)",
  "Your personalised checklist",
  "A review of your documents before you send them",
  "7 days of questions by email",
];

const STEP_EXCLUDES = [
  "Carrying out the procedure on your behalf",
  "Guaranteeing the authority's decision",
  "Personalised legal, tax or financial advice",
];

const STEP_COMMON = {
  duration: "30 min + 7 days of questions",
  includes: STEP_INCLUDES,
  excludes: STEP_EXCLUDES,
  responseTime: "Appointment offered within 2 working days; questions answered within 2 working days.",
  cancellation: "Free cancellation or rescheduling up to 24 hours before the appointment.",
};

/** English text for offers, keyed by offer id. Prices always come from the database. */
export const offersEn: Record<string, OfferText> = {
  decouverte: {
    name: "Discovery call",
    tagline: "Let's take stock together, for free.",
    duration: "15 minutes, by phone or video",
    includes: [
      "We listen to your situation",
      "We identify your priority procedures",
      "We tell you honestly whether you need us (or not)",
    ],
    excludes: ["Detailed support with a procedure"],
    responseTime: "Call offered within 2 working days.",
    cancellation: "Free and no commitment.",
  },
  "d-compte-bancaire": {
    ...STEP_COMMON,
    name: "Open a bank account",
    tagline: "The right documents, the right questions, fewer refusals.",
  },
  "d-dossier-location": {
    ...STEP_COMMON,
    name: "Prepare your rental application",
    tagline: "A complete, clear file (dossier de location) that reassures landlords.",
  },
  "d-aide-logement": {
    ...STEP_COMMON,
    name: "Apply for housing aid (CAF)",
    tagline: "Run the simulation, prepare the documents and follow up your application.",
  },
  "d-emmenagement": {
    ...STEP_COMMON,
    name: "Moving in: energy, internet, insurance",
    tagline: "All your contracts set up, with nothing forgotten.",
  },
  "d-assurance-maladie": {
    ...STEP_COMMON,
    name: "Register with French health insurance",
    tagline: "Understand the steps, prepare the file, create your ameli account.",
  },
  "d-permis": {
    ...STEP_COMMON,
    name: "Exchange your foreign driving licence",
    tagline: "Check your case and prepare the official online application.",
  },
  "d-emploi": {
    ...STEP_COMMON,
    name: "Hiring documents and payslip",
    tagline: "Know what to give your employer and understand your salary.",
  },
  "d-impots": {
    ...STEP_COMMON,
    name: "Prepare your first French tax return",
    tagline: "Create your online account, gather your documents, understand the steps.",
  },
  "d-ecole": {
    ...STEP_COMMON,
    name: "Enrol your child at school",
    tagline: "The steps, who to contact and the documents to prepare.",
  },
  "d-comptes-en-ligne": {
    ...STEP_COMMON,
    name: "Create and secure your online accounts",
    tagline: "ameli, impots.gouv, FranceConnect: get started safely.",
  },
  "pack-arrivee": {
    name: "Moving to France bundle",
    tagline: "The essential procedures of your move, done together.",
    duration: "30 days of support",
    includes: [
      "A 60-minute call to take stock",
      "Up to 5 procedures of your choice, with support",
      "Your personalised 30-day action plan",
      "Your questions by email for 30 days",
    ],
    excludes: STEP_EXCLUDES,
    responseTime: "First appointment offered within 2 working days; questions answered within 2 working days.",
    cancellation: "Free cancellation or rescheduling of appointments up to 24 hours before.",
  },
  abonnement: {
    name: "Peace of Mind subscription",
    tagline: "Someone to ask, all year round.",
    duration: "Month by month, no commitment",
    includes: [
      "Your questions by email, answered within 2 working days",
      "One 30-minute call per month",
      "Updates to your action plan",
    ],
    excludes: ["Detailed support with procedures (available individually)", "Personalised legal, tax or financial advice"],
    responseTime: "Questions answered within 2 working days.",
    cancellation: "No minimum term: cancel at any time, effective at the end of the current month.",
  },
};
