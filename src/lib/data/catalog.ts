import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultCatalog, localizeCategory, localizeService, type Catalog, type CatalogCategory } from "@/config/catalog";
import { categoryFromRow, serviceFromRow, type CategoryRow, type ServiceRow } from "./catalog-rows";
import { createPublicClient } from "@/lib/supabase/public";
import { defaultBookingSettings, normalizeSettings, type BookingSettings } from "@/lib/booking/slots";
import type { Locale } from "@/i18n";

/**
 * Catalogue (catégories + services) et réglages de réservation.
 * Base configurée et remplie : contenu de la base. Sinon : contenu par défaut du code.
 * Mis en cache, invalidé par l'admin (updateTag).
 */
export const CATALOG_TAGS = { catalog: "catalogue", booking: "reservations-reglages" } as const;

async function loadCatalog(): Promise<Catalog> {
  "use cache";
  cacheTag(CATALOG_TAGS.catalog);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (!supabase) return defaultCatalog;
  const [c, s] = await Promise.all([
    supabase.from("service_categories").select("*").eq("active", true).order("sort"),
    supabase.from("services").select("*").eq("active", true).order("sort"),
  ]);
  if (c.error || s.error || !c.data || c.data.length === 0) return defaultCatalog;
  return {
    categories: (c.data as CategoryRow[]).map(categoryFromRow),
    services: (s.data as ServiceRow[]).map(serviceFromRow),
  };
}

/** Catalogue actif, dans la langue voulue, trié. */
export async function getCatalog(locale: Locale = "fr"): Promise<Catalog> {
  const { categories, services } = await loadCatalog();
  const activeIds = new Set(categories.filter((c) => c.active).map((c) => c.id));
  return {
    categories: categories
      .filter((c) => c.active)
      .sort((a, b) => a.sort - b.sort)
      .map((c) => localizeCategory(c, locale)),
    services: services
      .filter((s) => s.active && activeIds.has(s.categoryId))
      .sort((a, b) => a.sort - b.sort)
      .map((s) => localizeService(s, locale)),
  };
}

export async function getCategoryById(id: string, locale: Locale = "fr"): Promise<CatalogCategory | undefined> {
  return (await getCatalog(locale)).categories.find((c) => c.id === id);
}

export async function getBookingSettings(): Promise<BookingSettings> {
  "use cache";
  cacheTag(CATALOG_TAGS.booking);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (!supabase) return defaultBookingSettings;
  const { data, error } = await supabase.from("booking_settings").select("settings").eq("id", 1).maybeSingle();
  if (error || !data) return defaultBookingSettings;
  return normalizeSettings((data as { settings: unknown }).settings);
}

/** Créneaux déjà pris sur une période (jamais mis en cache : change à chaque réservation). */
export async function getTakenSlots(from: Date, to: Date): Promise<string[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("taken_slots", { p_from: from.toISOString(), p_to: to.toISOString() });
  if (error || !Array.isArray(data)) return [];
  return (data as string[]).map((t) => new Date(t).toISOString());
}
