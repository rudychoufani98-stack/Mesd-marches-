"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isPayable } from "@/config/catalog";
import { href, type Locale } from "@/i18n";
import { getCategoryById } from "@/lib/data/catalog";
import { isRateLimited } from "@/lib/forms/rate-limit";
import { sign, verify } from "@/lib/signing";
import { requireAdmin } from "@/lib/supabase/server";
import { createCheckoutSession } from "./checkout";

/**
 * Paiement d'une catégorie SANS créneau : lien envoyé par l'admin après un appel découverte.
 * (La réservation avec créneau passe par lib/booking/actions.ts.)
 * Le prix vient toujours du catalogue côté serveur.
 */

const REF_PATTERN = /^[A-Z0-9-]{4,40}$/;
const CATEGORY_PATTERN = /^[a-z0-9-]{2,40}$/;

/** Valeur signée d'un lien de paiement admin : référence + catégorie. */
const linkValue = (ref: string, categoryId: string) => `${ref}|${categoryId}`;

export async function startCheckout(formData: FormData): Promise<void> {
  const locale: Locale = formData.get("locale") === "en" ? "en" : "fr";
  const thanks = href("/paiement/merci", locale);
  const categoryId = String(formData.get("categorie") ?? "");
  if (!CATEGORY_PATTERN.test(categoryId)) redirect(thanks);

  // La référence de la demande n'est acceptée que si la signature du lien est valide.
  const rawRef = formData.get("ref");
  const ref = typeof rawRef === "string" && REF_PATTERN.test(rawRef) && verify("payer", linkValue(rawRef, categoryId), formData.get("sig")) ? rawRef : undefined;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnu";
  if (isRateLimited(`checkout:${ip}`)) redirect(thanks);

  const category = await getCategoryById(categoryId, locale);
  if (!category || !isPayable(category)) redirect(thanks);

  const session = await createCheckoutSession({
    locale,
    line: { label: category.name, description: category.description, amount: category.price },
    metadata: { categorie: category.id, ref: ref ?? "" },
    clientReference: ref,
    cancelPath: href("/tarifs", locale),
  });
  redirect(session?.url ?? thanks);
}

export type PaymentLinkState = { path?: string; total?: number; error?: string };

/** Admin : lien de paiement signé pour une catégorie (montant recalculé à chaque ouverture). */
export async function createPaymentLink(_prev: PaymentLinkState, formData: FormData): Promise<PaymentLinkState> {
  await requireAdmin();
  const locale: Locale = formData.get("locale") === "en" ? "en" : "fr";
  const ref = String(formData.get("ref") ?? "");
  if (!REF_PATTERN.test(ref)) return { error: "Référence de demande invalide." };
  const category = await getCategoryById(String(formData.get("categorie") ?? ""), locale);
  if (!category || !isPayable(category)) return { error: "Choisissez une catégorie payable en ligne (hors Business)." };
  const sig = sign("payer", linkValue(ref, category.id));
  if (!sig) return { error: "Ajoutez la variable GUIDES_LINK_SECRET dans Vercel pour signer les liens." };
  const params = new URLSearchParams({ categorie: category.id, ref, sig });
  return { path: `${href("/payer", locale)}?${params.toString()}`, total: category.price };
}
