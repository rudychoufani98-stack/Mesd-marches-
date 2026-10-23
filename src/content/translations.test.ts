import { describe, expect, it } from "vitest";
import { defaultOffers } from "@/config/pricing";
import { categories } from "./categories";
import { defaultGuides } from "./guides";
import { serviceDomains } from "./services";
import { officialSources, type SourceId } from "./sources";
import { categoriesEn } from "./en/categories";
import { guidesEn } from "./en/guides";
import { offersEn } from "./en/offers";
import { servicesEn } from "./en/services";
import { sourcesEn } from "./en/sources";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { href, stripLocale, switchLocalePath } from "@/i18n";

/** Ces tests garantissent qu'aucun contenu ne reste sans traduction anglaise. */
describe("traductions anglaises", () => {
  it("couvrent toutes les catégories", () => {
    categories.forEach((c) => expect(categoriesEn[c.id]?.title, c.id).toBeTruthy());
  });

  it("couvrent tous les domaines et services", () => {
    serviceDomains.forEach((d) => {
      const t = servicesEn[d.slug];
      expect(t, d.slug).toBeDefined();
      expect(t.limits).toHaveLength(d.limits.length);
      d.items.forEach((i) => expect(t.items[i.id]?.title, i.id).toBeTruthy());
    });
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

  it("couvrent les offres et les sources", () => {
    defaultOffers.forEach((o) => expect(offersEn[o.id]?.name, o.id).toBeTruthy());
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

describe("textes des offres modifiables dans l'admin", () => {
  it("affichent le titre saisi en priorité, sinon l'objectif par défaut", async () => {
    const { localizeOffer } = await import("./translations");
    const base = defaultOffers.find((o) => o.id === "d-permis")!;
    expect(localizeOffer(base, "fr").headline).toBe("Échanger votre permis étranger");
    const edited = { ...base, headline: "Mon titre", why: "Ma raison", en: { name: "My name", headline: "My title" } };
    expect(localizeOffer(edited, "fr")).toMatchObject({ headline: "Mon titre", why: "Ma raison" });
    expect(localizeOffer(edited, "en")).toMatchObject({ name: "My name", headline: "My title", price: base.price });
    expect(localizeOffer(base, "en").name).toBe("Exchange your foreign driving licence");
  });
});
