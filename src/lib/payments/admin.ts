import "server-only";
import type Stripe from "stripe";
import { getStripe } from "./stripe";

/** Sessions de paiement terminées les plus récentes (Stripe est la source de vérité, rien n'est copié en base). */
export async function recentPaidSessions(limit = 100): Promise<Stripe.Checkout.Session[] | null> {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const list = await stripe.checkout.sessions.list({ limit, status: "complete" });
    return list.data.filter((s) => s.payment_status === "paid" || s.payment_status === "no_payment_required");
  } catch (error) {
    console.error("[paiement] lecture des paiements Stripe impossible", error);
    return null;
  }
}

/** Montant payé (en euros) par référence de demande. */
export function paidByReference(sessions: Stripe.Checkout.Session[] | null): Map<string, number> {
  const map = new Map<string, number>();
  for (const s of sessions ?? []) {
    const ref = s.client_reference_id;
    if (ref) map.set(ref, (map.get(ref) ?? 0) + (s.amount_total ?? 0) / 100);
  }
  return map;
}
