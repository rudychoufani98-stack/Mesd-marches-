import { describe, expect, it } from "vitest";
import { defaultCatalog } from "@/config/catalog";
import { categories } from "./categories";
import { defaultGuides } from "./guides";
import { officialSources, type SourceId } from "./sources";
import { categoriesEn } from "./en/categories";
import { guidesEn } from "./en/guides";
import { sourcesEn } from "./en/sources";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { href, stripLocale, switchLocalePath } from "@/i18n";

/** Ces tests garantissent qu'aucun contenu ne reste sans traduction anglaise. */
describe("traductions anglaises", () => {
  it("couvrent toutes les catégories", () => {
    categories.forEach((c) => expect(categoriesEn[c.id]?.title, c.id).toBeTruthy());
  });

  it("couvrent tous les guides, étape par étape", () => {
    defaultGuides.forEach((g) => {
      const t = guidesEn[g.slug];
      expect(t, g.slug).toBeDefined();
      expect(t.steps).toHaveLength(g.steps.length);
      expect(t.glossary ?? []).toHaveLength((g.glossary ?? []).length);
      g.checklist.forEach((c) => expect(t.checklist[c.id], `${g.slug}/${c.id}`).toBeTruthy());
    });
  });

  it("couvrent le catalogue et les sources", () => {
    defaultCatalog.categories.forEach((c) => expect(c.en?.name && c.en.description && c.en.includes?.length, c.id).toBeTruthy());
    defaultCatalog.services.forEach((s) => expect(s.description && s.en?.name && s.en.question && s.en.description, s.id).toBeTruthy());
    (Object.keys(officialSources) as SourceId[]).forEach((id) => expect(sourcesEn[id]?.label, id).toBeTruthy());
  });

  it("gardent la même navigation dans les deux langues", () => {
    expect(en.nav.map((n) => n.href)).toEqual(fr.nav.map((n) => n.href));
    expect(en.footer.groups.flatMap((g) => g.items.map((i) => i.href))).toEqual(fr.footer.groups.flatMap((g) => g.items.map((i) => i.href)));
  });
});

describe("liens par langue", () => {
  it("préfixent les pages anglaises par /en", () => {
    expect(href("/", "en")).toBe("/en");
    expect(href("/services", "en")).toBe("/en/services");
    expect(href("/services", "fr")).toBe("/services");
  });
  it("basculent vers la même page dans l'autre langue", () => {
    expect(switchLocalePath("/guides/x", "en")).toBe("/en/guides/x");
    expect(switchLocalePath("/en/guides/x", "fr")).toBe("/guides/x");
    expect(switchLocalePath("/en", "fr")).toBe("/");
    expect(stripLocale("/entreprise")).toBe("/entreprise");
  });
});
