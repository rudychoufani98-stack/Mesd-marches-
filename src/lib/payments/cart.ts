import { computeSelection, type Offer } from "@/config/pricing";

/**
 * Panier payable : calculé UNIQUEMENT côté serveur à partir des offres en base.
 * Les prix envoyés par le navigateur ne sont jamais utilisés.
 *
 * - plusieurs démarches : une seule ligne « Sélection de N démarches », remise dégressive comprise ;
 * - une démarche, le Pack ou l'abonnement : une ligne à son prix.
 * L'appel découverte (gratuit) n'est pas payable.
 */
export type Cart = {
  ids: string[];
  mode: "payment" | "subscription";
  label: string;
  description: string;
  /** Montant TTC en euros. */
  total: number;
  items: { name: string; price: number }[];
  discountPercent: number;
};

const MAX_ITEMS = 20;

export function parseOfferIds(raw: unknown): string[] {
  if (typeof raw !== "string") return [];
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^[a-z0-9-]{2,40}$/.test(s));
  return [...new Set(ids)].slice(0, MAX_ITEMS);
}

export function buildCart(offers: Offer[], ids: string[], locale: "fr" | "en"): Cart | null {
  const chosen = offers.filter((o) => ids.includes(o.id) && o.price > 0);
  if (chosen.length === 0) return null;

  const single = chosen.length === 1 ? chosen[0] : null;
  if (single && single.kind !== "demarche") {
    return {
      ids: [single.id],
      mode: single.billing === "mensuel" ? "subscription" : "payment",
      label: single.name,
      description: single.tagline,
      total: single.price,
      items: [{ name: single.name, price: single.price }],
      discountPercent: 0,
    };
  }

  // Panier de démarches : le Pack et l'abonnement ne se mélangent pas aux démarches.
  const steps = chosen.filter((o) => o.kind === "demarche");
  if (steps.length === 0) return null;
  const totals = computeSelection(offers, steps.map((o) => o.id));
  const names = steps.map((o) => o.name);
  return {
    ids: steps.map((o) => o.id),
    mode: "payment",
    label:
      steps.length === 1
        ? steps[0].name
        : locale === "en"
          ? `Selection of ${steps.length} procedures${totals.discountPercent ? ` (−${totals.discountPercent}%)` : ""}`
          : `Sélection de ${steps.length} démarches${totals.discountPercent ? ` (−${totals.discountPercent} %)` : ""}`,
    description: steps.length === 1 ? steps[0].tagline : names.join(" · "),
    total: totals.total,
    items: steps.map((o) => ({ name: o.name, price: o.price })),
    discountPercent: totals.discountPercent,
  };
}
