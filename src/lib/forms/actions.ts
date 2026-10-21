"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { deliverWithoutDatabase, newReference, notifyStoredRequest, type DeliveryKind } from "@/integrations/delivery";
import { PRIVACY_VERSION } from "@/config/privacy";
import { siteConfig } from "@/config/site";
import { getOffer } from "@/lib/data/content";
import { createPublicClient } from "@/lib/supabase/public";
import { appointmentSchema, contactSchema, type FormState } from "./schemas";
import { isRateLimited } from "./rate-limit";

const UNAVAILABLE_MESSAGE = siteConfig.contactEmail
  ? `L'envoi en ligne est momentanément indisponible. Vous pouvez nous écrire à ${siteConfig.contactEmail}.`
  : "L'envoi en ligne est momentanément indisponible. Merci de réessayer plus tard.";

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnu";
}

function formValues(formData: FormData): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$ACTION") || key === "website") continue;
    const all = formData.getAll(key).filter((v): v is string => typeof v === "string");
    values[key] = all.length > 1 || key === "slots" ? all : (all[0] ?? "");
  }
  return values;
}

type Prepared = { name: string; email: string; data: Record<string, unknown> };

/**
 * Enregistre la demande : en base si Supabase est configuré (consentement horodaté),
 * sinon via le pilote d'acheminement. Retourne la référence, ou null en cas d'échec.
 */
async function store(kind: DeliveryKind, request: Prepared): Promise<string | null> {
  const reference = newReference(kind);
  const supabase = createPublicClient();

  if (supabase) {
    // Pas de .select() : le public n'a pas le droit de relire les demandes.
    const { error } = await supabase.from("requests").insert({
      reference,
      kind,
      name: request.name,
      email: request.email,
      data: request.data,
      consent_at: new Date().toISOString(),
      consent_version: PRIVACY_VERSION,
    });
    if (error) {
      console.error(`[formulaire:${kind}] enregistrement impossible (réf. ${reference}) : ${error.code}`);
      return null;
    }
    await notifyStoredRequest(kind, reference);
    return reference;
  }

  const result = await deliverWithoutDatabase(kind, reference, {
    name: request.name,
    email: request.email,
    ...request.data,
    consentVersion: PRIVACY_VERSION,
  });
  return result.ok ? reference : null;
}

async function handle<S extends z.ZodType>(
  kind: DeliveryKind,
  schema: S,
  formData: FormData,
  prepare: (data: z.infer<S>) => Promise<Prepared | { error: string; field: string }>,
  successMessage: (reference: string) => string,
): Promise<FormState> {
  const values = formValues(formData);
  const raw: Record<string, unknown> = { ...values, website: formData.get("website") ?? undefined };
  if (kind === "rendez-vous") raw.slots = formData.getAll("slots");

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    // Un robot qui remplit le champ piège reçoit une réponse neutre.
    if (formData.get("website")) return { status: "success", message: successMessage("—") };
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors as FormState["fieldErrors"],
      values,
    };
  }

  const prepared = await prepare(parsed.data);
  if ("error" in prepared) {
    return { status: "error", message: "Certains champs sont à corriger.", fieldErrors: { [prepared.field]: [prepared.error] }, values };
  }

  if (isRateLimited(`${kind}:${await clientKey()}`)) {
    return {
      status: "error",
      message: "Vous avez envoyé plusieurs demandes récemment. Merci de patienter quelques minutes.",
      values,
    };
  }

  const reference = await store(kind, prepared);
  if (!reference) return { status: "error", message: UNAVAILABLE_MESSAGE, values };
  return { status: "success", message: successMessage(reference) };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "contact",
    contactSchema,
    formData,
    async (d) => ({ name: d.name, email: d.email, data: { subject: d.subject, message: d.message } }),
    (ref) =>
      `Merci, votre message a bien été envoyé (référence ${ref}). Nous vous répondrons par e-mail sous 2 jours ouvrés.`,
  );
}

export async function submitAppointment(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "rendez-vous",
    appointmentSchema,
    formData,
    async (d) => {
      const offer = await getOffer(d.offer);
      if (!offer) return { error: "Choisissez une offre.", field: "offer" };
      return {
        name: d.name,
        email: d.email,
        data: { offer: offer.id, offerName: offer.name, mode: d.mode, slots: d.slots, message: d.message ?? "" },
      };
    },
    (ref) =>
      `Merci, votre demande de rendez-vous a bien été enregistrée (référence ${ref}). Nous vous proposerons un créneau par e-mail sous 2 jours ouvrés. Aucun paiement n'est demandé à ce stade.`,
  );
}
