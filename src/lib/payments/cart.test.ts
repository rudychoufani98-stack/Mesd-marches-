import { describe, expect, it } from "vitest";
import { computeSelection, defaultOffers } from "@/config/pricing";
import { buildCart, parseOfferIds } from "./cart";

const steps = defaultOffers.filter((o) => o.kind === "demarche");
const pack = defaultOffers.find((o) => o.kind === "pack")!;
const sub = defaultOffers.find((o) => o.kind === "abonnement")!;

describe("panier de paiement", () => {
  it("nettoie les identifiants reçus du navigateur", () => {
    expect(parseOfferIds("d-permis,,d-permis,<script>,D-X")).toEqual(["d-permis"]);
    expect(parseOfferIds(undefined)).toEqual([]);
  });

  it("calcule le prix côté serveur avec la remise dégressive", () => {
    const ids = steps.slice(0, 3).map((o) => o.id);
    const cart = buildCart(defaultOffers, ids, "fr")!;
    expect(cart.mode).toBe("payment");
    expect(cart.total).toBe(computeSelection(defaultOffers, ids).total);
    expect(cart.discountPercent).toBe(15);
  });

  it("refuse l'appel gratuit et les offres inconnues", () => {
    expect(buildCart(defaultOffers, ["decouverte"], "fr")).toBeNull();
    expect(buildCart(defaultOffers, ["inconnue"], "fr")).toBeNull();
  });

  it("facture l'abonnement au mois et le pack seul", () => {
    expect(buildCart(defaultOffers, [sub.id], "fr")!.mode).toBe("subscription");
    expect(buildCart(defaultOffers, [pack.id], "en")!.total).toBe(pack.price);
  });

  it("ne mélange pas le pack avec des démarches", () => {
    const cart = buildCart(defaultOffers, [pack.id, steps[0].id], "fr")!;
    expect(cart.ids).toEqual([steps[0].id]);
  });
});
