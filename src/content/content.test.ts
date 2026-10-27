import { describe, expect, it } from "vitest";
import { defaultGuides as guides } from "./guides";
import { officialSources } from "./sources";
import { categories } from "./categories";
import { defaultCatalog, formatCategoryPrice, isPayable } from "@/config/catalog";

const ALLOWED_HOSTS = [
  /\.gouv\.fr$/,
  /^www\.ameli\.fr$/,
  /^www\.caf\.fr$/,
  /^www\.cnil\.fr$/,
  /^www\.banque-france\.fr$/,
  /^www\.mesquestionsdargent\.fr$/,
  /^www\.campusfrance\.org$/,
  /^www\.visale\.fr$/,
  /^www\.energie-info\.fr$/,
  /^www\.francetravail\.fr$/,
  /^www\.urssaf\.fr$/,
  /^travail-emploi\.gouv\.fr$/,
];

describe("registre des sources", () => {
  it("n'utilise que des URL https d'organismes publics connus", () => {
    Object.values(officialSources).forEach((s) => {
      const url = new URL(s.url);
      expect(url.protocol).toBe("https:");
      expect(ALLOWED_HOSTS.some((re) => re.test(url.hostname)), s.url).toBe(true);
      expect(s.linkCheckedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

describe("guides", () => {
  it("ont des slugs uniques", () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ont tous les champs obligatoires", () => {
    guides.forEach((g) => {
      expect(g.title.length).toBeGreaterThan(10);
      expect(g.description.length).toBeGreaterThan(20);
      expect(categories.map((c) => c.id)).toContain(g.category);
      expect(g.steps.length).toBeGreaterThan(0);
      expect(g.checklist.length).toBeGreaterThan(0);
      expect(g.sourceIds.length, g.slug).toBeGreaterThan(0);
      expect(["draft", "published"]).toContain(g.status);
      if (g.lastVerified !== null) expect(g.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      g.sourceIds.forEach((id) => expect(officialSources).toHaveProperty(id));
    });
  });

  it("ont des identifiants de checklist uniques", () => {
    guides.forEach((g) => {
      const ids = g.checklist.map((c) => c.id);
      expect(new Set(ids).size, g.slug).toBe(ids.length);
    });
  });
});

describe("catalogue", () => {
  const { categories: cats, services } = defaultCatalog;

  it("a des identifiants uniques", () => {
    expect(new Set(cats.map((c) => c.id)).size).toBe(cats.length);
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
  });

  it("rattache chaque service à une catégorie existante, et chaque catégorie a des services", () => {
    services.forEach((s) => expect(cats.some((c) => c.id === s.categoryId), s.id).toBe(true));
    cats.forEach((c) => expect(services.some((s) => s.categoryId === c.id), c.id).toBe(true));
  });

  it("affiche un prix fixe pour les particuliers et « à partir de » pour les entreprises", () => {
    const logement = cats.find((c) => c.id === "logement")!;
    expect(formatCategoryPrice(logement, "fr").replace(/\s/g, " ")).toBe("59 €");
    const business = cats.find((c) => c.kind === "business")!;
    expect(formatCategoryPrice(business, "fr")).toMatch(/^À partir de 199/);
    expect(isPayable(business)).toBe(false);
    cats.filter((c) => c.kind === "particulier").forEach((c) => expect(isPayable(c), c.id).toBe(true));
  });

  it("n'emploie pas d'intitulés de prestations réglementées", () => {
    const risky = /choisir quelle mutuelle|capacité d'emprunt|^recherche de logement$|étude de rentabilité/i;
    services.forEach((s) => expect(risky.test(s.name) || risky.test(s.question), s.id).toBe(false));
  });
});
