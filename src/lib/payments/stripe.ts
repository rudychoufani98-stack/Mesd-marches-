import "server-only";
import Stripe from "stripe";

/**
 * Client Stripe côté serveur uniquement (la clé secrète ne quitte jamais le serveur).
 *
 * Sécurité : seules les clés de TEST (sk_test_… / rk_test_…) sont acceptées.
 * Une clé live n'est utilisée que si STRIPE_LIVE_ENABLED="true" est défini volontairement dans Vercel.
 */
export type PaymentsStatus = "off" | "test" | "live" | "live-blocked";

function key(): string | null {
  return process.env.STRIPE_SECRET_KEY?.trim() || null;
}

export function paymentsStatus(): PaymentsStatus {
  const k = key();
  if (!k) return "off";
  if (/^(sk|rk)_test_/.test(k)) return "test";
  if (/^(sk|rk)_live_/.test(k)) return process.env.STRIPE_LIVE_ENABLED === "true" ? "live" : "live-blocked";
  return "off";
}

export function paymentsEnabled(): boolean {
  const s = paymentsStatus();
  return s === "test" || s === "live";
}

let client: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!paymentsEnabled()) return null;
  client ??= new Stripe(key()!, { appInfo: { name: "MesDémarches" } });
  return client;
}
