"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { deliverRequest, type DeliveryKind } from "@/integrations/delivery";
import { siteConfig } from "@/config/site";
import { getOffer } from "@/config/pricing";
import { appointmentSchema, contactSchema, type FormState } from "./schemas";
import { isRateLimited } from "./rate-limit";

const NOT_CONFIGURED_MESSAGE = siteConfig.contactEmail
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

async function handle<S extends z.ZodType>(
  kind: DeliveryKind,
  schema: S,
  formData: FormData,
  toPayload: (data: z.infer<S>) => Record<string, unknown>,
  successMessage: (reference: string) => string,
): Promise<FormState> {
  const values = formValues(formData);
  const raw = { ...values, slots: formData.getAll("slots"), website: formData.get("website") ?? undefined };
  if (kind === "contact") delete (raw as Record<string, unknown>).slots;

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

  if (isRateLimited(`${kind}:${await clientKey()}`)) {
    return {
      status: "error",
      message: "Vous avez envoyé plusieurs demandes récemment. Merci de patienter quelques minutes.",
      values,
    };
  }

  const result = await deliverRequest(kind, toPayload(parsed.data));
  if (!result.ok) {
    return { status: "error", message: NOT_CONFIGURED_MESSAGE, values };
  }
  return { status: "success", message: successMessage(result.reference) };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "contact",
    contactSchema,
    formData,
    (d) => ({ name: d.name, email: d.email, subject: d.subject, message: d.message }),
    (ref) =>
      `Merci, votre message a bien été envoyé (référence ${ref}). Nous vous répondrons par e-mail sous 2 jours ouvrés.`,
  );
}

export async function submitAppointment(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "rendez-vous",
    appointmentSchema,
    formData,
    (d) => ({
      name: d.name,
      email: d.email,
      offer: d.offer,
      offerName: getOffer(d.offer)?.name,
      mode: d.mode,
      slots: d.slots,
      message: d.message ?? "",
    }),
    (ref) =>
      `Merci, votre demande de rendez-vous a bien été enregistrée (référence ${ref}). Nous vous proposerons un créneau par e-mail sous 2 jours ouvrés. Aucun paiement n'est demandé à ce stade.`,
  );
}
