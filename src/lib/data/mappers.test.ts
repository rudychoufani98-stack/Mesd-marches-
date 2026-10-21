import { describe, expect, it } from "vitest";
import { defaultOffers } from "@/config/pricing";
import { retentionCutoff } from "@/config/privacy";
import { defaultGuides } from "@/content/guides";
import { guideFromRow, guideToRow, knownSourceIds, offerFromRow, offerToRow, type GuideRow } from "./mappers";

describe("offres", () => {
  it("font l'aller-retour base ↔ application sans perte", () => {
    defaultOffers.forEach((o, i) => {
      expect(offerFromRow(offerToRow(o, i))).toEqual({ ...o, highlighted: Boolean(o.highlighted) });
    });
  });
  it("convertissent un prix texte (numeric Postgres) en nombre", () => {
    const row = offerToRow(defaultOffers[0], 0);
    expect(offerFromRow({ ...row, price: "29.90" }).price).toBe(29.9);
  });
});

describe("guides", () => {
  it("font l'aller-retour base ↔ application sans perte", () => {
    defaultGuides.forEach((g) => {
      const row = { ...guideToRow(g), updated_at: `${g.updatedAt}T10:00:00+00:00` } as GuideRow;
      expect(guideFromRow(row)).toEqual({ ...g, glossary: g.glossary ?? [] });
    });
  });
  it("ignorent un domaine inconnu", () => {
    const row = { ...guideToRow(defaultGuides[0]), category: "inconnu", updated_at: "2026-10-21T00:00:00Z" } as GuideRow;
    expect(guideFromRow(row)).toBeNull();
  });
  it("n'affichent jamais une source hors registre", () => {
    expect(knownSourceIds(["ameli", "site-invente", "caf"])).toEqual(["ameli", "caf"]);
  });
});

describe("conservation", () => {
  it("calcule la date limite à 12 mois", () => {
    expect(retentionCutoff(new Date("2026-10-21T12:00:00Z")).toISOString().slice(0, 10)).toBe("2025-10-21");
  });
});
