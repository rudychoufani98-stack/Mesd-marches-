import { describe, expect, it } from "vitest";
import { buildPlan, recommendOffer } from "./rules";
import { answersSchema, type Answers } from "./questions";
import { taskLibrary } from "./tasks";

const base: Answers = {
  goal: "organisation",
  timeInFrance: "plus-1-an",
  categories: ["impots"],
  timeframe: "1-mois",
  support: "guides",
};

describe("buildPlan", () => {
  it("inclut toujours la tâche de sécurité numérique en premier", () => {
    const plan = buildPlan(base);
    expect(plan.tasks[0].id).toBe("num-favoris");
  });

  it("ajoute les tâches des domaines choisis", () => {
    const plan = buildPlan({ ...base, categories: ["logement"] });
    const ids = plan.tasks.map((t) => t.id);
    expect(ids).toEqual(expect.arrayContaining(["log-dossier", "log-garantie", "log-assurance", "log-aides"]));
  });

  it("ajoute les fondations pour une arrivée récente, même sans le domaine Installation", () => {
    const plan = buildPlan({ ...base, timeInFrance: "moins-3-mois" });
    const ids = plan.tasks.map((t) => t.id);
    expect(ids).toEqual(expect.arrayContaining(["inst-documents", "inst-adresse", "bq-compte", "sa-affiliation"]));
  });

  it("n'ajoute pas les tâches d'arrivée pour une personne installée depuis longtemps", () => {
    const plan = buildPlan(base);
    expect(plan.tasks.map((t) => t.id)).not.toContain("inst-sejour-info");
  });

  it("respecte l'ordre : justificatif d'adresse avant ouverture de compte", () => {
    const plan = buildPlan({ ...base, goal: "installation" });
    const ids = plan.tasks.map((t) => t.id);
    expect(ids.indexOf("inst-adresse")).toBeLessThan(ids.indexOf("bq-compte"));
  });

  it("trie par phase puis par ordre", () => {
    const plan = buildPlan({ ...base, categories: ["installation", "logement", "banque", "travail", "sante", "impots", "famille", "numerique"] });
    for (let i = 1; i < plan.tasks.length; i++) {
      const prev = plan.tasks[i - 1];
      const cur = plan.tasks[i];
      expect(prev.phase * 1000 + prev.order).toBeLessThanOrEqual(cur.phase * 1000 + cur.order);
    }
  });

  it("explique chaque tâche et ne duplique pas les tâches", () => {
    const plan = buildPlan({ ...base, goal: "emploi", categories: ["travail"] });
    const ids = plan.tasks.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const fiche = plan.tasks.find((t) => t.id === "tr-fiche-paie");
    expect(fiche?.reasons).toHaveLength(2);
    plan.tasks.forEach((t) => expect(t.reasons.length).toBeGreaterThan(0));
  });

  it("calcule des semaines suggérées dans l'horizon choisi", () => {
    const plan = buildPlan({ ...base, timeframe: "3-mois", categories: ["travail"] });
    expect(plan.horizonWeeks).toBe(12);
    plan.tasks.forEach((t) => {
      expect(t.suggestedWeek).toBeGreaterThanOrEqual(1);
      expect(t.suggestedWeek).toBeLessThanOrEqual(12);
    });
  });

  it("n'affiche aucune échéance non vérifiée", () => {
    taskLibrary.forEach((t) => {
      if (t.deadline) expect(t.deadline.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("agrège les documents sans doublon", () => {
    const plan = buildPlan({ ...base, goal: "installation", categories: ["logement", "banque"] });
    expect(new Set(plan.documents).size).toBe(plan.documents.length);
    expect(plan.documents).toContain("Pièce d'identité");
  });
});

describe("recommendOffer", () => {
  it("ne recommande rien si la personne choisit les guides", () => {
    expect(recommendOffer(base)).toBeNull();
  });
  it("recommande l'offre Installation pour une arrivée récente", () => {
    expect(recommendOffer({ ...base, support: "accompagnement", timeInFrance: "pas-encore" })).toBe("installation");
  });
  it("recommande le Suivi pour de nombreux domaines", () => {
    expect(
      recommendOffer({ ...base, support: "accompagnement", categories: ["banque", "impots", "famille", "sante"] }),
    ).toBe("suivi");
  });
  it("recommande le Bilan par défaut", () => {
    expect(recommendOffer({ ...base, support: "accompagnement" })).toBe("bilan");
  });
});

describe("answersSchema", () => {
  it("refuse une liste de domaines vide", () => {
    expect(answersSchema.safeParse({ ...base, categories: [] }).success).toBe(false);
  });
  it("refuse une valeur inconnue", () => {
    expect(answersSchema.safeParse({ ...base, goal: "autre" }).success).toBe(false);
  });
  it("accepte des réponses valides", () => {
    expect(answersSchema.safeParse(base).success).toBe(true);
  });
});
