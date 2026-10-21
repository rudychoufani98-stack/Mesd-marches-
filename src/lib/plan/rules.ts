import { getCategory, type CategoryId } from "@/content/categories";
import type { OfferId } from "@/config/pricing";
import { getTask, taskLibrary, type PlanTask } from "./tasks";
import { getTimeframeWeeks, type Answers } from "./questions";

/**
 * Moteur de règles explicites du plan d'action.
 * Chaque règle ajoute des tâches de la bibliothèque validée et explique pourquoi.
 * Aucune obligation, date limite ou droit individuel n'est déduit.
 */
export type Rule = {
  id: string;
  when: (a: Answers) => boolean;
  taskIds: string[];
  reason: (a: Answers) => string;
};

const isRecentArrival = (a: Answers) =>
  a.timeInFrance === "pas-encore" || a.timeInFrance === "moins-3-mois";

const categoryRules: Rule[] = (
  [
    "installation",
    "logement",
    "banque",
    "travail",
    "sante",
    "impots",
    "famille",
    "numerique",
  ] as CategoryId[]
).map((category) => ({
  id: `categorie-${category}`,
  when: (a) => a.categories.includes(category),
  taskIds: taskLibrary.filter((t) => t.category === category && t.id !== "etu-sites").map((t) => t.id),
  reason: () => `Vous avez choisi le domaine « ${getCategory(category)?.title ?? category} ».`,
}));

export const rules: Rule[] = [
  {
    id: "securite-pour-tous",
    when: () => true,
    taskIds: ["num-favoris"],
    reason: () => "Recommandé à tous pour éviter les faux sites.",
  },
  ...categoryRules,
  {
    id: "arrivee-recente",
    when: (a) => isRecentArrival(a) || a.goal === "installation",
    taskIds: ["inst-documents", "inst-sejour-info", "inst-adresse", "bq-compte", "sa-affiliation"],
    reason: (a) =>
      a.goal === "installation"
        ? "Votre objectif est de vous installer en France."
        : "Votre arrivée en France est récente ou prévue.",
  },
  {
    id: "objectif-emploi",
    when: (a) => a.goal === "emploi",
    taskIds: ["tr-documents", "tr-fiche-paie"],
    reason: () => "Votre objectif est de commencer un emploi.",
  },
  {
    id: "objectif-etudes",
    when: (a) => a.goal === "etudes",
    taskIds: ["etu-sites", "sa-affiliation"],
    reason: () => "Votre objectif est d'étudier en France.",
  },
  {
    id: "objectif-famille",
    when: (a) => a.goal === "famille",
    taskIds: ["fam-ecole", "fam-adresse"],
    reason: () => "Votre objectif est d'organiser les démarches de votre famille.",
  },
  {
    id: "objectif-organisation",
    when: (a) => a.goal === "organisation",
    taskIds: ["num-classement", "bq-budget"],
    reason: () => "Votre objectif est de mettre de l'ordre dans vos démarches.",
  },
];

export type PlannedTask = PlanTask & {
  reasons: string[];
  /** Semaine suggérée pour s'organiser. Ce n'est PAS une échéance officielle. */
  suggestedWeek: number;
};

export type ActionPlan = {
  tasks: PlannedTask[];
  documents: string[];
  sourceIds: PlanTask["sourceIds"];
  horizonWeeks: number;
  recommendedOffer: OfferId | null;
  appliedRuleIds: string[];
};

function suggestedWeek(phase: PlanTask["phase"], horizonWeeks: number): number {
  if (phase === 1) return 1;
  if (phase === 2) return Math.max(1, Math.ceil(horizonWeeks / 2));
  return horizonWeeks;
}

export function recommendOffer(a: Answers): OfferId | null {
  if (a.support !== "accompagnement") return null;
  if (isRecentArrival(a) || a.goal === "installation") return "installation";
  if (a.categories.length >= 4 && a.timeframe !== "2-semaines") return "suivi";
  return "bilan";
}

export function buildPlan(answers: Answers): ActionPlan {
  const reasonsByTask = new Map<string, string[]>();
  const appliedRuleIds: string[] = [];

  for (const rule of rules) {
    if (!rule.when(answers)) continue;
    appliedRuleIds.push(rule.id);
    const reason = rule.reason(answers);
    for (const id of rule.taskIds) {
      const list = reasonsByTask.get(id) ?? [];
      if (!list.includes(reason)) list.push(reason);
      reasonsByTask.set(id, list);
    }
  }

  const horizonWeeks = getTimeframeWeeks(answers.timeframe);

  const tasks: PlannedTask[] = [...reasonsByTask.entries()]
    .map(([id, reasons]) => {
      const task = getTask(id);
      return { ...task, reasons, suggestedWeek: suggestedWeek(task.phase, horizonWeeks) };
    })
    .sort((a, b) => a.phase - b.phase || a.order - b.order);

  const documents = [...new Set(tasks.flatMap((t) => t.documents))];
  const sourceIds = [...new Set(tasks.flatMap((t) => t.sourceIds))];

  return {
    tasks,
    documents,
    sourceIds,
    horizonWeeks,
    recommendedOffer: recommendOffer(answers),
    appliedRuleIds,
  };
}
