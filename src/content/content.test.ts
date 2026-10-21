import { describe, expect, it } from "vitest";
import { categories } from "./categories";
import { guides } from "./guides";
import { officialSources } from "./sources";
import { serviceDomains } from "./services";
import { taskLibrary } from "@/lib/plan/tasks";
import { offers } from "@/config/pricing";

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
    const pages = new Set(["/plan-action", "/tarifs", "/outils/budget"]);
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

describe("tâches du plan", () => {
  const published = new Set(guides.filter((g) => g.status === "published").map((g) => g.slug));
  it("citent des sources du registre et des guides publiés", () => {
    taskLibrary.forEach((t) => {
      t.sourceIds.forEach((id) => expect(officialSources).toHaveProperty(id));
      if (t.guideSlug) expect(published.has(t.guideSlug), t.id).toBe(true);
    });
  });
});

describe("tarifs", () => {
  it("ont des prix positifs et des identifiants uniques", () => {
    expect(new Set(offers.map((o) => o.id)).size).toBe(offers.length);
    offers.forEach((o) => expect(o.price).toBeGreaterThan(0));
  });
});
