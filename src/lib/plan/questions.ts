import { z } from "zod";
import { categories, type CategoryId } from "@/content/categories";

/**
 * Questionnaire d'orientation : uniquement les informations nécessaires à l'organisation.
 * Aucune donnée d'identité, aucun numéro, aucun document n'est demandé.
 */
export const goalOptions = [
  { value: "installation", label: "M'installer en France", hint: "Logement, compte, premières démarches" },
  { value: "emploi", label: "Commencer un emploi", hint: "Documents d'embauche, fiche de paie" },
  { value: "etudes", label: "Étudier en France", hint: "Premiers repères pour les étudiants" },
  { value: "famille", label: "Organiser les démarches de ma famille", hint: "École, contrats, déménagement" },
  { value: "organisation", label: "Mettre de l'ordre dans mes démarches", hint: "Documents, budget, sécurité" },
] as const;

export const timeInFranceOptions = [
  { value: "pas-encore", label: "Je ne suis pas encore arrivé·e" },
  { value: "moins-3-mois", label: "Moins de 3 mois" },
  { value: "3-12-mois", label: "Entre 3 mois et 1 an" },
  { value: "plus-1-an", label: "Plus d'un an" },
] as const;

export const timeframeOptions = [
  { value: "2-semaines", label: "Dans les 2 semaines", weeks: 2 },
  { value: "1-mois", label: "Dans le mois", weeks: 4 },
  { value: "3-mois", label: "Dans les 3 mois", weeks: 12 },
  { value: "sans-delai", label: "Pas de délai particulier", weeks: 8 },
] as const;

export const supportOptions = [
  { value: "guides", label: "Consulter les guides gratuitement", hint: "Vous avancez seul·e avec votre plan" },
  { value: "accompagnement", label: "Demander un accompagnement humain", hint: "Un rendez-vous pour faire le point" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];

export type Goal = Values<typeof goalOptions>;
export type TimeInFrance = Values<typeof timeInFranceOptions>;
export type Timeframe = Values<typeof timeframeOptions>;
export type Support = Values<typeof supportOptions>;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [Values<T>, ...Values<T>[]];

export const answersSchema = z.object({
  goal: z.enum(values(goalOptions)),
  timeInFrance: z.enum(values(timeInFranceOptions)),
  categories: z
    .array(z.enum(categories.map((c) => c.id) as [CategoryId, ...CategoryId[]]))
    .min(1, "Choisissez au moins un domaine.")
    .max(categories.length),
  timeframe: z.enum(values(timeframeOptions)),
  support: z.enum(values(supportOptions)),
});

export type Answers = z.infer<typeof answersSchema>;

export function getTimeframeWeeks(timeframe: Timeframe): number {
  return timeframeOptions.find((o) => o.value === timeframe)?.weeks ?? 8;
}
