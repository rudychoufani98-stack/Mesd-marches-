import { describe, expect, it } from "vitest";
import { defaultGuides } from "@/content/guides";
import {
  formatChecklist,
  formatGlossary,
  formatSteps,
  parseChecklist,
  parseGlossary,
  parseLines,
  parseSteps,
  slugify,
} from "./guide-format";

describe("étapes", () => {
  it("lit les titres ## et leur texte", () => {
    const steps = parseSteps("## Première\nLigne 1\nLigne 2\n\n## Deuxième\nTexte");
    expect(steps).toEqual([
      { title: "Première", body: "Ligne 1\nLigne 2" },
      { title: "Deuxième", body: "Texte" },
    ]);
  });
  it("ignore le texte avant le premier titre et les étapes vides", () => {
    expect(parseSteps("intro\n## A\n\n## B\nok")).toEqual([{ title: "B", body: "ok" }]);
  });
  it("fait l'aller-retour sans perte sur tous les guides par défaut", () => {
    defaultGuides.forEach((g) => expect(parseSteps(formatSteps(g.steps))).toEqual(g.steps));
  });
});

describe("checklist", () => {
  it("crée des identifiants uniques et stables", () => {
    const items = parseChecklist("- Pièce d'identité\nPièce d'identité\n\n• Assurance");
    expect(items.map((i) => i.id)).toEqual(["piece-d-identite", "piece-d-identite-2", "assurance"]);
  });
  it("fait l'aller-retour sur les libellés", () => {
    defaultGuides.forEach((g) =>
      expect(parseChecklist(formatChecklist(g.checklist)).map((i) => i.label)).toEqual(g.checklist.map((i) => i.label)),
    );
  });
});

describe("glossaire", () => {
  it("coupe au premier deux-points", () => {
    expect(parseGlossary("TAEG : taux : annuel\nsans définition")).toEqual([{ term: "TAEG", definition: "taux : annuel" }]);
  });
  it("fait l'aller-retour sur les guides par défaut", () => {
    defaultGuides.forEach((g) => expect(parseGlossary(formatGlossary(g.glossary))).toEqual(g.glossary ?? []));
  });
});

describe("utilitaires", () => {
  it("slugify retire accents et ponctuation", () => {
    expect(slugify("Électricité & gaz : contrats")).toBe("electricite-gaz-contrats");
  });
  it("parseLines retire puces et lignes vides", () => {
    expect(parseLines("- a\n\n* b\n c ")).toEqual(["a", "b", "c"]);
  });
});
