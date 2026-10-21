"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { deliverWithoutDatabase, newReference, notifyStoredRequest, type DeliveryKind } from "@/integrations/delivery";
import { PRIVACY_VERSION } from "@/config/privacy";
import { siteConfig } from "@/config/site";
import { getOffer, getOffers } from "@/lib/data/content";
import { computeSelection } from "@/config/pricing";
import { createPublicClient } from "@/lib/supabase/public";
import type { Locale } from "@/i18n";
import { appointmentSchemaFor, contactSchemaFor, type FormState } from "./schemas";
import { isRateLimited } from "./rate-limit";

const text = {
  fr: {
    unavailable: siteConfig.contactEmail
      ? `L'envoi en ligne est momentanément indisponible. Vous pouvez nous écrire à ${siteConfig.contactEmail}.`
      : "L'envoi en ligne est momentanément indisponible. Merci de réessayer plus tard.",
    fix: "Certains champs sont à corriger.",
    tooMany: "Vous avez envoyé plusieurs demandes récemment. Merci de patienter quelques minutes.",
    offer: "Choisissez une offre.",
    contactOk: (ref: string) =>
      `Merci, votre message a bien été envoyé (référence ${ref}). Nous vous répondrons par e-mail sous 2 jours ouvrés.`,
    appointmentOk: (ref: string) =>
      `Merci, votre demande de rendez-vous a bien été enregistrée (référence ${ref}). Nous vous proposerons un créneau par e-mail sous 2 jours ouvrés. Aucun paiement n'est demandé à ce stade.`,
  },
  en: {
    unavailable: siteConfig.contactEmail
      ? `Online sending is temporarily unavailable. You can email us at ${siteConfig.contactEmail}.`
      : "Online sending is temporarily unavailable. Please try again later.",
    fix: "Some fields need to be corrected.",
    tooMany: "You have sent several requests recently. Please wait a few minutes.",
    offer: "Please choose an offer.",
    contactOk: (ref: string) =>
      `Thank you, your message has been sent (reference ${ref}). We will reply by email within 2 working days.`,
    appointmentOk: (ref: string) =>
      `Thank you, your appointment request has been received (reference ${ref}). We will suggest a time slot by email within 2 working days. No payment is requested at this stage.`,
  },
} as const;

function localeOf(formData: FormData): Locale {
  return formData.get("locale") === "en" ? "en" : "fr";
}

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnu";
}

function formValues(formData: FormData): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$ACTION") || key === "website" || key === "locale") continue;
    const all = formData.getAll(key).filter((v): v is string => typeof v === "string");
    values[key] = all.length > 1 || key === "slots" || key === "selection" ? all : (all[0] ?? "");
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
  locale: Locale,
  formData: FormData,
  prepare: (data: z.infer<S>) => Promise<Prepared | { error: string; field: string }>,
  successMessage: (reference: string) => string,
): Promise<FormState> {
  const values = formValues(formData);
  const raw: Record<string, unknown> = { ...values, website: formData.get("website") ?? undefined };
  if (kind === "rendez-vous") {
    raw.slots = formData.getAll("slots");
    raw.selection = formData.getAll("selection");
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    // Un robot qui remplit le champ piège reçoit une réponse neutre.
    if (formData.get("website")) return { status: "success", message: successMessage("—") };
    return {
      status: "error",
      message: text[locale].fix,
      fieldErrors: z.flattenError(parsed.error).fieldErrors as FormState["fieldErrors"],
      values,
    };
  }

  const prepared = await prepare(parsed.data);
  if ("error" in prepared) {
    return { status: "error", message: text[locale].fix, fieldErrors: { [prepared.field]: [prepared.error] }, values };
  }

  if (isRateLimited(`${kind}:${await clientKey()}`)) {
    return {
      status: "error",
      message: text[locale].tooMany,
      values,
    };
  }

  const reference = await store(kind, prepared);
  if (!reference) return { status: "error", message: text[locale].unavailable, values };
  return { status: "success", message: successMessage(reference) };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const locale = localeOf(formData);
  return handle(
    "contact",
    contactSchemaFor(locale),
    locale,
    formData,
    async (d) => ({ name: d.name, email: d.email, data: { subject: d.subject, message: d.message, language: locale } }),
    text[locale].contactOk,
  );
}

export async function submitAppointment(_prev: FormState, formData: FormData): Promise<FormState> {
  const locale = localeOf(formData);
  return handle(
    "rendez-vous",
    appointmentSchemaFor(locale),
    locale,
    formData,
    async (d) => {
      if (d.offer === "selection") {
        // Le total est recalculé ici : on ne fait jamais confiance au prix envoyé par le navigateur.
        const offers = await getOffers();
        const totals = computeSelection(offers, d.selection ?? []);
        if (totals.count === 0) return { error: text[locale].offer, field: "offer" };
        const names = offers.filter((o) => o.kind === "demarche" && d.selection?.includes(o.id)).map((o) => o.name);
        return {
          name: d.name,
          email: d.email,
          data: {
            offer: "selection",
            offerName: `Sélection de ${totals.count} démarche(s)`,
            phone: d.phone ?? "",
            selection: names,
            selectionIds: offers.filter((o) => o.kind === "demarche" && d.selection?.includes(o.id)).map((o) => o.id),
            subtotal: totals.subtotal,
            discountPercent: totals.discountPercent,
            total: totals.total,
            mode: d.mode,
            slots: d.slots,
            message: d.message ?? "",
            language: locale,
          },
        };
      }
      const offer = await getOffer(d.offer);
      if (!offer) return { error: text[locale].offer, field: "offer" };
      return {
        name: d.name,
        email: d.email,
        data: { offer: offer.id, offerName: offer.name, phone: d.phone ?? "", mode: d.mode, slots: d.slots, message: d.message ?? "", language: locale },
      };
    },
    text[locale].appointmentOk,
  );
}
