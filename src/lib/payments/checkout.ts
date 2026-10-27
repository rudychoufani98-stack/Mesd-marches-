import "server-only";
import { headers } from "next/headers";
import { href, type Locale } from "@/i18n";
import { getStripe } from "./stripe";

/** Origine du site (protocole + domaine) d'après la requête en cours. */
export async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export type CheckoutLine = { label: string; description: string; amount: number };

/**
 * Crée une session Stripe Checkout (paiement unique, montant calculé côté serveur).
 * Retourne null si Stripe n'est pas configuré ou en cas d'erreur.
 */
export async function createCheckoutSession(opts: {
  line: CheckoutLine;
  locale: Locale;
  metadata: Record<string, string>;
  clientReference?: string;
  email?: string;
  cancelPath: string;
  /** Expiration courte quand un créneau est bloqué pendant le paiement. */
  expiresInMinutes?: number;
}) {
  const stripe = getStripe();
  if (!stripe) return null;
  const origin = await siteOrigin();
  const { locale } = opts;
  const terms = `${origin}${href("/cgv", locale)}`;
  try {
    return await stripe.checkout.sessions.create({
      mode: "payment",
      locale,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(opts.line.amount * 100),
            product_data: { name: opts.line.label.slice(0, 250), description: opts.line.description.slice(0, 500) },
          },
        },
      ],
      customer_creation: "always",
      invoice_creation: { enabled: true },
      billing_address_collection: "auto",
      ...(opts.email ? { customer_email: opts.email } : {}),
      client_reference_id: opts.clientReference,
      metadata: { ...opts.metadata, site: "mesdemarches" },
      ...(opts.expiresInMinutes ? { expires_at: Math.floor(Date.now() / 1000) + opts.expiresInMinutes * 60 } : {}),
      custom_text: {
        submit: {
          message:
            locale === "en"
              ? `By paying, you accept our terms of sale (${terms}) and ask for your support to start before the end of the withdrawal period.`
              : `En payant, vous acceptez nos CGV (${terms}) et demandez que l'accompagnement commence avant la fin du délai de rétractation.`,
        },
      },
      success_url: `${origin}${href("/paiement/merci", locale)}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${opts.cancelPath}`,
    });
  } catch (error) {
    console.error("[paiement] création de la session Stripe impossible", error);
    return null;
  }
}
