import { z } from "zod";
import type { Locale } from "@/i18n";

/**
 * Schémas de validation des formulaires (utilisés côté serveur), en français et en anglais.
 * Seules les informations nécessaires sont demandées : ni pièce d'identité, ni numéro, ni document.
 */
const messages = {
  fr: {
    max: (n: number) => `${n} caractères maximum.`,
    name: "Indiquez votre nom (2 caractères minimum).",
    email: "Adresse e-mail invalide.",
    consent: "Merci d'accepter le traitement de votre demande pour que nous puissions vous répondre.",
    subject: "Choisissez un sujet.",
    message: "Votre message doit contenir au moins 10 caractères.",
    offer: "Choisissez une offre.",
    mode: "Choisissez un mode de rendez-vous.",
    slots: "Choisissez au moins une disponibilité.",
    phone: "Numéro de téléphone invalide.",
  },
  en: {
    max: (n: number) => `${n} characters maximum.`,
    name: "Please enter your name (at least 2 characters).",
    email: "Invalid email address.",
    consent: "Please agree to the processing of your request so that we can reply.",
    subject: "Please choose a subject.",
    message: "Your message must be at least 10 characters long.",
    offer: "Please choose an offer.",
    mode: "Please choose how you'd like to meet.",
    slots: "Please choose at least one time slot.",
    phone: "Invalid phone number.",
  },
} as const;

export const contactSubjects = [
  { value: "question", label: "Question sur les services", labelEn: "Question about our services" },
  { value: "tarifs", label: "Question sur les tarifs", labelEn: "Question about pricing" },
  { value: "partenariat", label: "Proposition de partenariat", labelEn: "Partnership proposal" },
  { value: "donnees", label: "Mes données personnelles", labelEn: "My personal data" },
  { value: "autre", label: "Autre", labelEn: "Other" },
] as const;

export const appointmentSlots = [
  { value: "matin", label: "Matin (9 h – 12 h)", labelEn: "Morning (9am – 12pm)" },
  { value: "apres-midi", label: "Après-midi (14 h – 18 h)", labelEn: "Afternoon (2pm – 6pm)" },
  { value: "soir", label: "Début de soirée (18 h – 20 h)", labelEn: "Early evening (6pm – 8pm)" },
] as const;

export const appointmentModes = [
  { value: "visio", label: "Visioconférence", labelEn: "Video call" },
  { value: "telephone", label: "Téléphone", labelEn: "Phone" },
] as const;

/** Libellé d'une option dans la langue voulue. */
export function optionLabel(option: { label: string; labelEn: string }, locale: Locale): string {
  return locale === "en" ? option.labelEn : option.label;
}

function base(locale: Locale) {
  const m = messages[locale];
  const trimmed = (max: number) => z.string().trim().max(max, m.max(max));
  return {
    m,
    trimmed,
    name: trimmed(80).min(2, m.name),
    email: trimmed(160).pipe(z.email(m.email)),
    consent: z.literal("on", { error: m.consent }),
    /** Champ piège invisible pour les robots : doit rester vide. */
    website: z.string().max(0).optional(),
  };
}

export function contactSchemaFor(locale: Locale) {
  const b = base(locale);
  return z.object({
    name: b.name,
    email: b.email,
    subject: z.enum(contactSubjects.map((s) => s.value) as [string, ...string[]], { error: b.m.subject }),
    message: b.trimmed(2000).min(10, b.m.message),
    consent: b.consent,
    website: b.website,
  });
}

export function appointmentSchemaFor(locale: Locale) {
  const b = base(locale);
  return z.object({
    name: b.name,
    email: b.email,
    /** Facultatif : utile pour un rendez-vous par téléphone. */
    phone: z.union([z.literal(""), z.string().trim().regex(/^\+?[0-9 ().-]{6,24}$/, b.m.phone)]).optional(),
    // L'existence de l'offre est vérifiée dans l'action (les offres viennent de la base).
    offer: z.string({ error: b.m.offer }).trim().min(1, b.m.offer).max(40),
    mode: z.enum(appointmentModes.map((m) => m.value) as [string, ...string[]], { error: b.m.mode }),
    slots: z.array(z.enum(appointmentSlots.map((s) => s.value) as [string, ...string[]])).min(1, b.m.slots),
    /** Démarches cochées dans le sélecteur de la page Tarifs (offre « selection »). */
    selection: z.array(z.string().regex(/^[a-z0-9-]{2,40}$/)).max(20).optional(),
    message: b.trimmed(1000).optional(),
    consent: b.consent,
    website: b.website,
  });
}

/** Versions françaises (référence, utilisées par les tests). */
export const contactSchema = contactSchemaFor("fr");
export const appointmentSchema = appointmentSchemaFor("fr");

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
