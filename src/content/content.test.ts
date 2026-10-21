import { describe, expect, it } from "vitest";
import { categories } from "./categories";
import { defaultGuides as guides } from "./guides";
import { officialSources } from "./sources";
import { serviceDomains } from "./services";
import { defaultOffers as offers } from "@/config/pricing";

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

describe("services", () => {
  const published = new Set(guides.filter((g) => g.status === "published").map((g) => g.slug));

  it("couvrent chaque domaine une fois", () => {
    expect(serviceDomains.map((d) => d.category).sort()).toEqual(categories.map((c) => c.id).sort());
  });

  it("pointent vers des guides publiés ou des pages existantes", () => {
    const pages = new Set(["/tarifs", "/outils/budget", "/rendez-vous"]);
    serviceDomains.forEach((d) =>
      d.items.forEach((item) => {
        if (!item.href) return;
        if (item.href.startsWith("/guides/")) {
          expect(published.has(item.href.replace("/guides/", "")), item.href).toBe(true);
        } else {
          expect(pages.has(item.href), item.href).toBe(true);
        }
      }),
    );
  });
});

describe("tarifs", () => {
  it("ont des identifiants uniques et un seul appel gratuit", () => {
    expect(new Set(offers.map((o) => o.id)).size).toBe(offers.length);
    offers.forEach((o) => expect(o.price === 0).toBe(o.kind === "decouverte"));
    expect(offers.filter((o) => o.kind === "decouverte")).toHaveLength(1);
  });
  it("rattachent chaque démarche à un domaine", () => {
    offers.filter((o) => o.kind === "demarche").forEach((o) => expect(o.category, o.id).toBeTruthy());
  });
});

describe("sélecteur de démarches", () => {
  it("applique la remise selon le nombre de démarches", async () => {
    const { computeSelection } = await import("@/config/pricing");
    const steps = offers.filter((o) => o.kind === "demarche");
    expect(computeSelection(offers, [steps[0].id]).discountPercent).toBe(0);
    expect(computeSelection(offers, steps.slice(0, 2).map((o) => o.id)).discountPercent).toBe(10);
    expect(computeSelection(offers, steps.slice(0, 3).map((o) => o.id)).discountPercent).toBe(15);
    const five = computeSelection(offers, steps.slice(0, 5).map((o) => o.id));
    expect(five.discountPercent).toBe(25);
    expect(five.total).toBe(Math.floor(five.subtotal * 0.75));
    expect(five.subtotal - five.discount).toBe(five.total);
  });
  it("ignore les offres qui ne sont pas des démarches", async () => {
    const { computeSelection } = await import("@/config/pricing");
    expect(computeSelection(offers, ["decouverte", "pack-arrivee", "abonnement"]).count).toBe(0);
  });
});
