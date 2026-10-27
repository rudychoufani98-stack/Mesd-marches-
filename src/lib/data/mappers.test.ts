import { describe, expect, it } from "vitest";
import { defaultCatalog } from "@/config/catalog";
import { retentionCutoff } from "@/config/privacy";
import { defaultGuides } from "@/content/guides";
import { guideFromRow, guideToRow, knownSourceIds, type GuideRow } from "./mappers";
import { categoryFromRow, categoryToRow, serviceFromRow, serviceToRow } from "./catalog-rows";

describe("catalogue", () => {
  it("fait l'aller-retour base ↔ application sans perte", () => {
    defaultCatalog.categories.forEach((c) => expect(categoryFromRow(categoryToRow(c))).toEqual(c));
    defaultCatalog.services.forEach((s) => expect(serviceFromRow(serviceToRow(s))).toEqual(s));
  });
  it("convertit un prix texte (numeric Postgres) en nombre et ignore une icône inconnue", () => {
    const row = { ...categoryToRow(defaultCatalog.categories[0]), price: "59.00", icon: "inconnue" };
    expect(categoryFromRow(row)).toMatchObject({ price: 59, icon: "quotidien" });
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
