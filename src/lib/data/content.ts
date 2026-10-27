import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultGuides, type Guide } from "@/content/guides";
import { createPublicClient } from "@/lib/supabase/public";
import { guideFromRow, type GuideRow } from "./mappers";
import type { Locale } from "@/i18n";
import { localizeGuide } from "@/content/translations";

/**
 * Accès aux guides publics (le catalogue des services est dans catalog.ts).
 *
 * - Supabase configuré et contenu présent : les données viennent de la base.
 * - Sinon (pas de configuration, table vide, erreur) : contenu par défaut du code.
 *
 * Les résultats sont mis en cache et invalidés par l'espace admin (updateTag).
 */
export const CONTENT_TAGS = {
  guides: "guides",
} as const;

/** Brouillons visibles uniquement en développement et en mode « contenu par défaut ». */
const SHOW_DEFAULT_DRAFTS = process.env.NODE_ENV !== "production";

/** Guides visibles du public (en français), depuis la base ou le contenu par défaut. */
async function loadGuides(): Promise<{ guides: Guide[]; fromDb: boolean }> {
  "use cache";
  cacheTag(CONTENT_TAGS.guides);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase.from("guides").select("*").eq("status", "published").order("title");
    if (!error && data && data.length > 0) {
      return {
        guides: (data as GuideRow[]).map(guideFromRow).filter((g): g is Guide => g !== null),
        fromDb: true,
      };
    }
  }
  return {
    guides: defaultGuides.filter((g) => g.status === "published" || SHOW_DEFAULT_DRAFTS),
    fromDb: false,
  };
}

/**
 * Guides visibles dans une langue. En anglais, seuls les guides traduits apparaissent ;
 * leur statut, leur date de vérification et leurs sources restent ceux de la version française.
 */
export async function getVisibleGuides(locale: Locale = "fr"): Promise<Guide[]> {
  return (await loadGuides()).guides.map((g) => localizeGuide(g, locale)).filter((g): g is Guide => g !== null);
}

export async function getPublishedGuides(locale: Locale = "fr"): Promise<Guide[]> {
  return (await getVisibleGuides(locale)).filter((g) => g.status === "published");
}

export async function getPublishedGuideSlugs(locale: Locale = "fr"): Promise<string[]> {
  return (await getPublishedGuides(locale)).map((g) => g.slug);
}

export async function getGuide(slug: string, locale: Locale = "fr"): Promise<Guide | undefined> {
  return (await getVisibleGuides(locale)).find((g) => g.slug === slug);
}
