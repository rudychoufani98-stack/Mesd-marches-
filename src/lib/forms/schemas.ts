import { z } from "zod";
import { offers, type OfferId } from "@/config/pricing";

/**
 * Schémas de validation des formulaires (utilisés côté serveur).
 * Seules les informations nécessaires sont demandées : ni pièce d'identité, ni numéro, ni document.
 */
const trimmed = (max: number) => z.string().trim().max(max, `${max} caractères maximum.`);

const name = trimmed(80).min(2, "Indiquez votre nom (2 caractères minimum).");
const email = trimmed(160).pipe(z.email("Adresse e-mail invalide."));
const consent = z.literal("on", {
  error: "Merci d'accepter le traitement de votre demande pour que nous puissions vous répondre.",
});
/** Champ piège invisible pour les robots : doit rester vide. */
const honeypot = z.string().max(0).optional();

export const contactSubjects = [
  { value: "question", label: "Question sur les services" },
  { value: "tarifs", label: "Question sur les tarifs" },
  { value: "partenariat", label: "Proposition de partenariat" },
  { value: "donnees", label: "Mes données personnelles" },
  { value: "autre", label: "Autre" },
] as const;

export const contactSchema = z.object({
  name,
  email,
  subject: z.enum(contactSubjects.map((s) => s.value) as [string, ...string[]], {
    error: "Choisissez un sujet.",
  }),
  message: trimmed(2000).min(10, "Votre message doit contenir au moins 10 caractères."),
  consent,
  website: honeypot,
});

export const appointmentSlots = [
  { value: "matin", label: "Matin (9 h – 12 h)" },
  { value: "apres-midi", label: "Après-midi (14 h – 18 h)" },
  { value: "soir", label: "Début de soirée (18 h – 20 h)" },
] as const;

export const appointmentModes = [
  { value: "visio", label: "Visioconférence" },
  { value: "telephone", label: "Téléphone" },
] as const;

export const appointmentSchema = z.object({
  name,
  email,
  offer: z.enum(offers.map((o) => o.id) as [OfferId, ...OfferId[]], { error: "Choisissez une offre." }),
  mode: z.enum(appointmentModes.map((m) => m.value) as [string, ...string[]], {
    error: "Choisissez un mode de rendez-vous.",
  }),
  slots: z
    .array(z.enum(appointmentSlots.map((s) => s.value) as [string, ...string[]]))
    .min(1, "Choisissez au moins une disponibilité."),
  message: trimmed(1000).optional(),
  consent,
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Valeurs saisies renvoyées en cas d'erreur pour ne pas vider le formulaire. */
  values?: Record<string, string | string[]>;
};

export const initialFormState: FormState = { status: "idle" };
