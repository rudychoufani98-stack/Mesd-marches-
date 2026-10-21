import type { OfferText } from "../translations";

/** English text for offers, keyed by offer id. Prices always come from the database. */
export const offersEn: Record<string, OfferText> = {
  bilan: {
    name: "Administrative review",
    tagline: "To know where to start.",
    duration: "30-minute appointment",
    includes: [
      "30-minute appointment by video call or phone",
      "Identification of priority procedures",
      "Personalised checklist",
      "Links to official resources",
    ],
    excludes: [
      "Carrying out procedures on your behalf",
      "Personalised legal, tax or financial advice",
      "Contacting administrations in your name",
    ],
    responseTime: "A time slot is offered within 2 working days of your request.",
    cancellation: "Appointment can be cancelled or rescheduled free of charge up to 24 hours before the scheduled time.",
  },
  installation: {
    name: "Settling in France",
    tagline: "To organise your first few weeks.",
    duration: "60-minute appointment",
    includes: [
      "60-minute appointment by video call or phone",
      "30-day action plan",
      "Calendar of procedures",
      "Document checklist",
      "Limited follow-up for 7 days (questions by email)",
    ],
    excludes: [
      "Carrying out procedures on your behalf",
      "Personalised legal, tax or financial advice",
      "Guarantee of obtaining housing, a bank account or a document",
    ],
    responseTime:
      "A time slot is offered within 2 working days. During the follow-up, questions are answered within 2 working days.",
    cancellation: "Appointment can be cancelled or rescheduled free of charge up to 24 hours before the scheduled time.",
  },
  suivi: {
    name: "Ongoing administrative support",
    tagline: "To keep moving forward with a regular check-in.",
    duration: "One follow-up appointment per month",
    includes: [
      "One monthly follow-up appointment",
      "Update of your action plan",
      "Up to 5 written questions per month",
      "Organisation of the next steps",
    ],
    excludes: [
      "Carrying out procedures on your behalf",
      "Personalised legal, tax or financial advice",
      "Carrying over unused questions to the following month",
    ],
    responseTime: "Written questions are answered within 2 working days.",
    cancellation:
      "No minimum commitment: can be cancelled at any time, taking effect at the end of the current monthly period.",
  },
};
