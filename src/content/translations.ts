import type { Locale } from "@/i18n";
import type { Category, CategoryId } from "./categories";
import type { Guide } from "./guides";
import type { OfficialSource, SourceId } from "./sources";
import { categoriesEn } from "./en/categories";
import { guidesEn } from "./en/guides";
import { sourcesEn } from "./en/sources";

/**
 * Traductions du contenu éditorial.
 * Le français reste la langue de référence (code + base de données).
 * Les traductions anglaises sont indexées par identifiant ; si une traduction manque,
 * le texte français est utilisé (sauf pour les guides : un guide non traduit n'apparaît pas en anglais).
 */

export type CategoryText = Pick<Category, "title" | "shortTitle" | "description">;

/** Mêmes étapes, même nombre de cases (mêmes identifiants) que la version française. */
export type GuideText = Pick<Guide, "title" | "description" | "intro" | "steps" | "glossary"> & {
  /** Libellés traduits, indexés par l'identifiant de la case de la version française. */
  checklist: Record<string, string>;
};

export type SourceText = Pick<OfficialSource, "label">;

export function localizeCategory(c: Category, locale: Locale): Category {
  if (locale === "fr") return c;
  return { ...c, ...categoriesEn[c.id as CategoryId] };
}

/** Retourne null si le guide n'a pas de traduction anglaise. */
export function localizeGuide(g: Guide, locale: Locale): Guide | null {
  if (locale === "fr") return g;
  const t = guidesEn[g.slug];
  if (!t) return null;
  return {
    ...g,
    title: t.title,
    description: t.description,
    intro: t.intro,
    steps: t.steps,
    glossary: t.glossary,
    checklist: g.checklist.map((c) => ({ id: c.id, label: t.checklist[c.id] ?? c.label })),
  };
}

export function localizeSource(s: OfficialSource, locale: Locale): OfficialSource {
  const t = locale === "en" ? sourcesEn[s.id as SourceId] : undefined;
  return t ? { ...s, ...t } : s;
}
