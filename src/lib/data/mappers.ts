import type { Offer, OfferEnglishTexts, OfferKind } from "@/config/pricing";
import { isCategoryId } from "@/content/categories";
import type { ChecklistItem, GlossaryEntry, Guide, GuideStep } from "@/content/guides";
import { officialSources, type SourceId } from "@/content/sources";

/** Conversions entre les lignes de la base (snake_case) et les types de l'application. */

export type OfferRow = {
  id: string;
  /** Absent tant que la migration « prix par démarche » n'est pas appliquée. */
  kind?: OfferKind | null;
  category?: string | null;
  name: string;
  tagline: string;
  price: number | string;
  billing: "unique" | "mensuel";
  duration: string;
  includes: string[];
  excludes: string[];
  response_time: string;
  cancellation: string;
  highlighted: boolean;
  active: boolean;
  sort: number;
  /** Colonnes ajoutées par la migration « textes des offres » (absentes avant). */
  headline?: string | null;
  why?: string | null;
  texts_en?: OfferEnglishTexts | null;
};

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

export function offerFromRow(r: OfferRow): Offer {
  return {
    id: r.id,
    kind: r.kind ?? "pack",
    ...(r.category && isCategoryId(r.category) ? { category: r.category } : {}),
    name: r.name,
    tagline: r.tagline,
    price: Number(r.price),
    billing: r.billing,
    duration: r.duration,
    includes: r.includes ?? [],
    excludes: r.excludes ?? [],
    responseTime: r.response_time,
    cancellation: r.cancellation,
    highlighted: r.highlighted,
    ...(r.headline ? { headline: r.headline } : {}),
    ...(r.why ? { why: r.why } : {}),
    ...(r.texts_en && typeof r.texts_en === "object" ? { en: r.texts_en } : {}),
  };
}

export function offerToRow(o: Offer, sort: number, active = true): OfferRow {
  return {
    id: o.id,
    kind: o.kind,
    category: o.category ?? null,
    name: o.name,
    tagline: o.tagline,
    price: o.price,
    billing: o.billing,
    duration: o.duration,
    includes: o.includes,
    excludes: o.excludes,
    response_time: o.responseTime,
    cancellation: o.cancellation,
    highlighted: Boolean(o.highlighted),
    active,
    sort,
    // Écrits seulement s'ils sont définis : l'import par défaut fonctionne aussi avant la migration.
    ...(o.headline !== undefined ? { headline: o.headline || null } : {}),
    ...(o.why !== undefined ? { why: o.why || null } : {}),
    ...(o.en !== undefined ? { texts_en: o.en } : {}),
  };
}

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
