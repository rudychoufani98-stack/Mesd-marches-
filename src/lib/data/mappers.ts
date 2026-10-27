import { isCategoryId } from "@/content/categories";
import type { ChecklistItem, GlossaryEntry, Guide, GuideStep } from "@/content/guides";
import { officialSources, type SourceId } from "@/content/sources";

/** Conversions entre les lignes de la base (snake_case) et les types de l'application. */

export type GuideRow = {
  slug: string;
  title: string;
  description: string;
  category: string;
  reading_minutes: number;
  intro: string;
  steps: unknown;
  checklist: unknown;
  glossary: unknown;
  source_ids: string[];
  last_verified: string | null;
  status: "draft" | "published";
  updated_at: string;
};



const asArray = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** Ne garde que les sources du registre : une source inconnue est ignorée, jamais affichée. */
export function knownSourceIds(ids: readonly string[]): SourceId[] {
  return ids.filter((id): id is SourceId => id in officialSources);
}

export function guideFromRow(r: GuideRow): Guide | null {
  if (!isCategoryId(r.category)) return null;
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.category,
    readingMinutes: r.reading_minutes,
    intro: r.intro,
    steps: asArray<GuideStep>(r.steps),
    checklist: asArray<ChecklistItem>(r.checklist),
    glossary: asArray<GlossaryEntry>(r.glossary),
    sourceIds: knownSourceIds(r.source_ids ?? []),
    lastVerified: r.last_verified,
    status: r.status,
    updatedAt: r.updated_at.slice(0, 10),
  };
}

export function guideToRow(g: Guide): Omit<GuideRow, "updated_at"> & { updated_at?: string } {
  return {
    slug: g.slug,
    title: g.title,
    description: g.description,
    category: g.category,
    reading_minutes: g.readingMinutes,
    intro: g.intro,
    steps: g.steps,
    checklist: g.checklist,
    glossary: g.glossary ?? [],
    source_ids: [...g.sourceIds],
    last_verified: g.lastVerified,
    status: g.status,
  };
}
