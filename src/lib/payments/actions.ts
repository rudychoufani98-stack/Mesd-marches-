"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getOffers } from "@/lib/data/content";
import { href, type Locale } from "@/i18n";
import { sign, verify } from "@/lib/signing";
import { requireAdmin } from "@/lib/supabase/server";
import { buildCart, parseOfferIds } from "./cart";
import { getStripe } from "./stripe";

/**
 * Paiements Stripe (Checkout hébergé par Stripe : aucune donnée de carte ne passe par le site).
 *
 * - startCheckout : bouton « Payer » du site, ou page /payer ouverte depuis un lien envoyé par l'admin.
 * - createPaymentLink : l'admin génère un lien de paiement signé pour une demande.
 */

const REF_PATTERN = /^[A-Z0-9-]{4,40}$/;

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Valeur signée d'un lien de paiement admin : référence + démarches. */
const linkValue = (ref: string, ids: string[]) => `${ref}|${ids.join(",")}`;

export async function startCheckout(formData: FormData): Promise<void> {
  const locale: Locale = formData.get("locale") === "en" ? "en" : "fr";
  const thanks = href("/paiement/merci", locale);
  const ids = parseOfferIds(formData.get("offres"));

  // Lien envoyé par l'admin : la référence n'est acceptée que si la signature est valide.
  const rawRef = formData.get("ref");
  const ref = typeof rawRef === "string" && REF_PATTERN.test(rawRef) && verify("payer", linkValue(rawRef, ids), formData.get("sig")) ? rawRef : undefined;

  const stripe = getStripe();
  const cart = buildCart(await getOffers(locale), ids, locale);
  if (!stripe || !cart) redirect(`${thanks}?statut=indisponible`);

  const origin = await siteOrigin();
  const terms = `${origin}${href("/cgv", locale)}`;
  let url: string | null = null;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: cart.mode,
      locale,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(cart.total * 100),
            product_data: { name: cart.label, description: cart.description.slice(0, 500) },
            ...(cart.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      ...(cart.mode === "payment" ? { customer_creation: "always" as const, invoice_creation: { enabled: true } } : {}),
      billing_address_collection: "auto",
      client_reference_id: ref,
      metadata: { offres: cart.ids.join(","), ref: ref ?? "", site: "mesdemarches" },
      custom_text: {
        submit: {
          message:
            locale === "en"
              ? `By paying, you accept our terms of sale (${terms}) and ask for your support to start before the end of the withdrawal period.`
              : `En payant, vous acceptez nos CGV (${terms}) et demandez que l'accompagnement commence avant la fin du délai de rétractation.`,
        },
      },
      success_url: `${origin}${thanks}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${href("/tarifs", locale)}`,
    });
    url = session.url;
  } catch (error) {
    console.error("[paiement] création de la session Stripe impossible", error);
  }
  redirect(url ?? `${thanks}?statut=indisponible`);
}

export type PaymentLinkState = { path?: string; total?: number; error?: string };

/** Admin : lien de paiement signé (valable sans limite de durée, montant recalculé à chaque ouverture). */
export async function createPaymentLink(_prev: PaymentLinkState, formData: FormData): Promise<PaymentLinkState> {
  await requireAdmin();
  const locale: Locale = formData.get("locale") === "en" ? "en" : "fr";
  const ref = String(formData.get("ref") ?? "");
  if (!REF_PATTERN.test(ref)) return { error: "Référence de demande invalide." };
  const ids = parseOfferIds(formData.getAll("offres").join(","));
  const cart = buildCart(await getOffers(locale), ids, locale);
  if (!cart) return { error: "Choisissez au moins une démarche, le Pack ou l'abonnement (pas un mélange)." };
  const sig = sign("payer", linkValue(ref, cart.ids));
  if (!sig) return { error: "Ajoutez la variable GUIDES_LINK_SECRET dans Vercel pour signer les liens." };
  const params = new URLSearchParams({ offres: cart.ids.join(","), ref, sig });
  return { path: `${href("/payer", locale)}?${params.toString()}`, total: cart.total };
}
