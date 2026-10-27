"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { DISCOVERY, isPayable } from "@/config/catalog";
import { PRIVACY_VERSION } from "@/config/privacy";
import { href, type Locale } from "@/i18n";
import { getBookingSettings, getCatalog, getTakenSlots } from "@/lib/data/catalog";
import { isRateLimited } from "@/lib/forms/rate-limit";
import { createCheckoutSession } from "@/lib/payments/checkout";
import { getStripe } from "@/lib/payments/stripe";
import { createPublicClient } from "@/lib/supabase/public";
import { formatSlot, isOfferedSlot } from "./slots";

/**
 * Réservation d'un appel gratuit ou d'un accompagnement payant.
 * Tout est revérifié côté serveur : catégorie, service, créneau libre et prix.
 */

export type BookingState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Valeurs saisies, renvoyées pour ne pas vider le formulaire en cas d'erreur. */
  values?: Record<string, string>;
};

const text = {
  fr: {
    fix: "Certains champs sont à corriger.",
    name: "Indiquez votre nom (2 caractères minimum).",
    email: "Adresse e-mail invalide.",
    phone: "Numéro de téléphone invalide.",
    required: "Ce champ est obligatoire.",
    consent: "Merci d'accepter le traitement de vos informations pour que nous puissions vous accompagner.",
    category: "Choisissez une catégorie.",
    service: "Choisissez le service qui correspond à votre besoin.",
    slot: "Ce créneau n'est plus disponible. Choisissez-en un autre.",
    tooMany: "Vous avez fait plusieurs réservations récemment. Merci de patienter quelques minutes.",
    unavailable: "La réservation en ligne est momentanément indisponible. Écrivez-nous via la page Contact.",
    payment: "Le paiement en ligne est momentanément indisponible. Réservez un appel gratuit ou réessayez plus tard.",
  },
  en: {
    fix: "Some fields need correcting.",
    name: "Please enter your name (at least 2 characters).",
    email: "Invalid email address.",
    phone: "Invalid phone number.",
    required: "This field is required.",
    consent: "Please agree to the processing of your information so that we can support you.",
    category: "Please choose a category.",
    service: "Please choose the service that matches your need.",
    slot: "This time slot is no longer available. Please choose another one.",
    tooMany: "You have made several bookings recently. Please wait a few minutes.",
    unavailable: "Online booking is temporarily unavailable. Please write to us via the Contact page.",
    payment: "Online payment is temporarily unavailable. Book a free call or try again later.",
  },
} as const;

function schemaFor(locale: Locale) {
  const t = text[locale];
  const str = (max: number) => z.string().trim().max(max);
  return z.object({
    kind: z.enum(["appel", "accompagnement"]),
    categorie: str(40),
    service: str(80),
    slot: z.string().datetime({ error: t.slot }),
    name: str(80).min(2, t.name),
    email: str(160).pipe(z.email(t.email)),
    phone: z.union([z.literal(""), z.string().trim().regex(/^\+?[0-9 ().-]{6,24}$/, t.phone)]),
    country: str(80),
    situation: str(1000),
    need: str(2000).min(3, t.required),
    goal: str(1000),
    extra: str(1000),
    mode: z.enum(["visio", "telephone"]),
    consent: z.literal("on", { error: t.consent }),
    website: z.string().max(0).optional(),
  });
}

function newBookingReference(): string {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `RES-${Date.now().toString(36).toUpperCase()}-${random}`;
}

export async function createBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const locale: Locale = formData.get("locale") === "en" ? "en" : "fr";
  const t = text[locale];
  const raw = Object.fromEntries(
    ["kind", "categorie", "service", "slot", "name", "email", "phone", "country", "situation", "need", "goal", "extra", "mode", "consent", "website"].map((k) => [
      k,
      formData.get(k) ?? (k === "consent" || k === "website" ? undefined : ""),
    ]),
  );
  const values = Object.fromEntries(
    ["name", "email", "phone", "country", "situation", "need", "goal", "extra"].map((k) => [k, String(formData.get(k) ?? "").slice(0, 2000)]),
  );
  const parsed = schemaFor(locale).safeParse(raw);
  if (!parsed.success) {
    if (formData.get("website")) redirect(href("/", locale));
    return { values, status: "error", message: t.fix, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const d = parsed.data;

  // Accompagnement : questionnaire complet obligatoire.
  if (d.kind === "accompagnement") {
    const missing: Record<string, string[]> = {};
    for (const f of ["country", "situation", "goal"] as const) if (!d[f]) missing[f] = [t.required];
    if (Object.keys(missing).length) return { values, status: "error", message: t.fix, fieldErrors: missing };
  }

  const catalog = await getCatalog(locale);
  const category = catalog.categories.find((c) => c.id === d.categorie);
  const service = catalog.services.find((s) => s.id === d.service && s.categoryId === d.categorie);
  if (d.kind === "accompagnement") {
    if (!category) return { values, status: "error", message: t.fix, fieldErrors: { categorie: [t.category] } };
    if (!service) return { values, status: "error", message: t.fix, fieldErrors: { service: [t.service] } };
  }
  // Une offre non payable en ligne (Business, « à partir de ») passe par un appel.
  const paid = d.kind === "accompagnement" && category !== undefined && isPayable(category);
  const kind = paid ? "accompagnement" : "appel";

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnu";
  if (isRateLimited(`booking:${ip}`)) return { values, status: "error", message: t.tooMany };

  // Le créneau doit faire partie des créneaux proposés et être encore libre.
  const settings = await getBookingSettings();
  const now = new Date();
  const horizon = new Date(now.getTime() + (settings.horizonDays + 2) * 86400_000);
  const taken = await getTakenSlots(now, horizon);
  if (!isOfferedSlot(settings, now, d.slot, taken)) return { values, status: "error", message: t.slot, fieldErrors: { slot: [t.slot] } };

  const supabase = createPublicClient();
  if (!supabase) return { values, status: "error", message: t.unavailable };

  const reference = newBookingReference();
  const startsAt = new Date(d.slot);
  const minutes = kind === "appel" ? DISCOVERY.minutes : settings.slotMinutes;
  const endsAt = new Date(startsAt.getTime() + minutes * 60000);
  const when = formatSlot(startsAt.toISOString(), locale);

  // Paiement : la session Stripe est créée avant de bloquer le créneau (30 minutes pour payer).
  let session: Awaited<ReturnType<typeof createCheckoutSession>> = null;
  if (paid && category && service) {
    session = await createCheckoutSession({
      locale,
      line: {
        label: `${category.name} — ${service.name}`,
        description:
          locale === "en"
            ? `Appointment on ${when} (Paris time), ${d.mode === "visio" ? "by video" : "by phone"}. Ref. ${reference}`
            : `Rendez-vous le ${when} (heure de Paris), ${d.mode === "visio" ? "en visio" : "par téléphone"}. Réf. ${reference}`,
        amount: category.price,
      },
      metadata: { booking: reference, starts_at: startsAt.toISOString(), categorie: category.id, service: service.id },
      clientReference: reference,
      email: d.email,
      cancelPath: `${href("/rendez-vous", locale)}?categorie=${category.id}&service=${service.id}&annule=1`,
      expiresInMinutes: 30,
    });
    if (!session?.url) return { values, status: "error", message: t.payment };
  }

  const { data: booked, error } = await supabase.rpc("book_slot", {
    p: {
      reference,
      kind,
      category_id: category?.id ?? "",
      category_name: category?.name ?? DISCOVERY.name[locale],
      service_id: service?.id ?? "",
      service_name: service?.name ?? "",
      price: paid && category ? category.price : 0,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      name: d.name,
      email: d.email,
      phone: d.phone,
      country: d.country,
      situation: d.situation,
      need: d.need,
      goal: d.goal,
      extra: d.extra,
      mode: d.mode,
      language: locale,
      stripe_session_id: session?.id ?? "",
      consent_version: PRIVACY_VERSION,
    },
  });

  if (error || !booked) {
    if (error) console.error("[réservation] enregistrement impossible", error.code);
    // Créneau pris entre-temps : on annule la session de paiement.
    if (session) await getStripe()?.checkout.sessions.expire(session.id).catch(() => undefined);
    return error ? { values, status: "error", message: t.unavailable } : { values, status: "error", message: t.slot, fieldErrors: { slot: [t.slot] } };
  }

  if (session?.url) redirect(session.url);
  const params = new URLSearchParams({ d: startsAt.toISOString(), mode: d.mode });
  redirect(`${href("/rendez-vous/confirmation", locale)}?${params.toString()}`);
}
