"use server";

import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
import { defaultCategories, defaultServices, type CatalogCategory, type CatalogService, type CategoryIcon } from "@/config/catalog";
import { defaultBookingSettings, normalizeSettings } from "@/lib/booking/slots";
import { CATALOG_TAGS } from "@/lib/data/catalog";
import { categoryToRow, serviceToRow } from "@/lib/data/catalog-rows";
import { requireAdmin } from "@/lib/supabase/server";
import type { AdminResult } from "./actions";
import { parseLines } from "./guide-format";

/** Catalogue (catégories, services), disponibilités et réservations : actions de l'espace admin. */

const fail = (message: string, errors?: Record<string, string>): AdminResult => ({ status: "error", message, errors });
const done = (message: string): AdminResult => ({ status: "success", message });
const MIGRATION_HINT = "Exécutez d'abord la migration SQL « catalogue et réservations » dans Supabase, puis réessayez.";

function refresh() {
  updateTag(CATALOG_TAGS.catalog);
  revalidatePath("/admin", "layout");
}

function firstErrors(error: z.ZodError): Record<string, string> {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  return Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Valeur invalide."]));
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

const price = z
  .string()
  .trim()
  .transform((v) => Number(v.replace(/\s/g, "").replace(",", ".")))
  .pipe(z.number({ error: "Prix invalide." }).min(0, "Le prix ne peut pas être négatif.").max(99999, "Prix trop élevé."));

const ICONS = ["logement", "fiscalite", "sante", "banque", "emploi", "immigration", "quotidien", "business"] as const;

/* ------------------------------------------------------------------ Import */

export async function importCatalog(): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const c = await supabase.from("service_categories").upsert(defaultCategories.map(categoryToRow), { onConflict: "id", ignoreDuplicates: true });
  if (c.error) return fail(MIGRATION_HINT);
  const s = await supabase.from("services").upsert(defaultServices.map(serviceToRow), { onConflict: "id", ignoreDuplicates: true });
  if (s.error) return fail(MIGRATION_HINT);
  await supabase.from("booking_settings").upsert({ id: 1, settings: defaultBookingSettings }, { onConflict: "id", ignoreDuplicates: true });
  updateTag(CATALOG_TAGS.booking);
  refresh();
  return done("Catalogue importé. Les éléments déjà présents n'ont pas été modifiés.");
}

/* -------------------------------------------------------------- Catégories */

const categorySchema = z.object({
  mode: z.enum(["create", "edit"]),
  id: z.string().trim().max(40),
  kind: z.enum(["particulier", "business"]),
  name: z.string().trim().min(2, "Nom trop court.").max(80),
  description: z.string().trim().max(300),
  price,
  priceFrom: z.literal("on").optional(),
  icon: z.enum(ICONS),
  includes: z.string().max(3000),
  sort: z.coerce.number().int().min(0).max(999),
  active: z.literal("on").optional(),
  nameEn: z.string().trim().max(80),
  descriptionEn: z.string().trim().max(300),
  includesEn: z.string().max(3000),
});

export async function saveCategory(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Certains champs sont à corriger.", firstErrors(parsed.error));
  const d = parsed.data;
  const id = d.mode === "create" ? slugify(d.name) : d.id;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) return fail("Nom invalide pour créer l'adresse de la catégorie.", { name: "Utilisez des lettres." });
  const includesEn = parseLines(d.includesEn);
  const category: CatalogCategory = {
    id,
    kind: d.kind,
    name: d.name,
    description: d.description,
    price: Math.round(d.price * 100) / 100,
    priceFrom: d.priceFrom === "on",
    icon: d.icon as CategoryIcon,
    includes: parseLines(d.includes),
    sort: d.sort,
    active: d.active === "on",
    en: {
      ...(d.nameEn ? { name: d.nameEn } : {}),
      ...(d.descriptionEn ? { description: d.descriptionEn } : {}),
      ...(includesEn.length ? { includes: includesEn } : {}),
    },
  };
  const query =
    d.mode === "create"
      ? supabase.from("service_categories").insert(categoryToRow(category))
      : supabase.from("service_categories").update({ ...categoryToRow(category), updated_at: new Date().toISOString() }).eq("id", id);
  const { error } = await query;
  if (error) return fail(error.code === "23505" ? "Une catégorie porte déjà ce nom." : MIGRATION_HINT);
  refresh();
  return done(`Catégorie « ${d.name} » enregistrée. Le site est à jour.`);
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = z.string().regex(/^[a-z0-9-]{1,40}$/).safeParse(formData.get("id"));
  if (!id.success) return;
  await supabase.from("service_categories").delete().eq("id", id.data);
  refresh();
}

/* ---------------------------------------------------------------- Services */

const serviceSchema = z.object({
  mode: z.enum(["create", "edit"]),
  id: z.string().trim().max(80),
  categoryId: z.string().regex(/^[a-z0-9-]{1,40}$/),
  name: z.string().trim().min(2, "Nom trop court.").max(120),
  question: z.string().trim().max(300),
  sort: z.coerce.number().int().min(0).max(999),
  active: z.literal("on").optional(),
  nameEn: z.string().trim().max(120),
  questionEn: z.string().trim().max(300),
});

export async function saveService(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Certains champs sont à corriger.", firstErrors(parsed.error));
  const d = parsed.data;
  const id = d.mode === "create" ? `${d.categoryId}-${slugify(d.name)}`.slice(0, 80).replace(/-+$/, "") : d.id;
  const service: CatalogService = {
    id,
    categoryId: d.categoryId,
    name: d.name,
    question: d.question,
    sort: d.sort,
    active: d.active === "on",
    en: { ...(d.nameEn ? { name: d.nameEn } : {}), ...(d.questionEn ? { question: d.questionEn } : {}) },
  };
  const query =
    d.mode === "create"
      ? supabase.from("services").insert(serviceToRow(service))
      : supabase.from("services").update({ ...serviceToRow(service), updated_at: new Date().toISOString() }).eq("id", id);
  const { error } = await query;
  if (error) return fail(error.code === "23505" ? "Un service porte déjà ce nom dans cette catégorie." : MIGRATION_HINT);
  refresh();
  return done(`Service « ${d.name} » enregistré.`);
}

export async function deleteService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = z.string().regex(/^[a-z0-9-]{1,80}$/).safeParse(formData.get("id"));
  if (!id.success) return;
  await supabase.from("services").delete().eq("id", id.data);
  refresh();
}

/* ---------------------------------------------------------- Disponibilités */

const DAYS = ["0", "1", "2", "3", "4", "5", "6"] as const;

/** « 09:00-12:00, 14:00-18:00 » → plages horaires. */
function parseRanges(text: string): { start: string; end: string }[] | null {
  const parts = text
    .split(/[,;\n]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const ranges = parts.map((p) => {
    const m = p.match(/^(\d{1,2})[:h](\d{2})\s*[-–à]\s*(\d{1,2})[:h](\d{2})$/);
    if (!m) return null;
    const pad = (h: string, min: string) => `${h.padStart(2, "0")}:${min}`;
    return { start: pad(m[1], m[2]), end: pad(m[3], m[4]) };
  });
  return ranges.every(Boolean) ? (ranges as { start: string; end: string }[]) : null;
}

export async function saveBookingSettings(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const errors: Record<string, string> = {};
  const week: Record<string, { start: string; end: string }[]> = {};
  for (const day of DAYS) {
    const raw = String(formData.get(`day-${day}`) ?? "");
    const ranges = formData.get(`open-${day}`) === "on" ? parseRanges(raw) : [];
    if (ranges === null) errors[`day-${day}`] = "Format attendu : 09:00-12:00, 14:00-18:00";
    else week[day] = ranges;
  }
  const closedDates = String(formData.get("closedDates") ?? "")
    .split(/[\s,;]+/)
    .filter(Boolean);
  const badDate = closedDates.find((d) => !/^\d{4}-\d{2}-\d{2}$/.test(d));
  if (badDate) errors.closedDates = `Date invalide : ${badDate} (format AAAA-MM-JJ)`;
  if (Object.keys(errors).length) return fail("Certains champs sont à corriger.", errors);

  const settings = normalizeSettings({
    slotMinutes: Number(formData.get("slotMinutes")),
    minNoticeHours: Number(formData.get("minNoticeHours")),
    horizonDays: Number(formData.get("horizonDays")),
    week,
    closedDates,
  });
  const { error } = await supabase.from("booking_settings").upsert({ id: 1, settings, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) return fail(MIGRATION_HINT);
  updateTag(CATALOG_TAGS.booking);
  revalidatePath("/admin", "layout");
  return done("Disponibilités enregistrées. Les créneaux proposés sont à jour.");
}

/* ------------------------------------------------------------- Réservations */

export async function updateBookingStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = z
    .object({ id: z.uuid(), status: z.enum(["en_attente_paiement", "confirme", "annule", "termine"]) })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await supabase.from("bookings").update({ status: parsed.data.status }).eq("id", parsed.data.id);
  revalidatePath("/admin", "layout");
}
