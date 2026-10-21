"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { defaultOffers } from "@/config/pricing";
import { retentionCutoff } from "@/config/privacy";
import { categories, type CategoryId } from "@/content/categories";
import { defaultGuides } from "@/content/guides";
import { CONTENT_TAGS } from "@/lib/data/content";
import { guideToRow, knownSourceIds, offerToRow } from "@/lib/data/mappers";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSessionClient, requireAdmin } from "@/lib/supabase/server";
import { parseChecklist, parseGlossary, parseLines, parseSteps } from "./guide-format";

export type AdminResult = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string> };

const fail = (message: string, errors?: Record<string, string>): AdminResult => ({ status: "error", message, errors });
const done = (message: string): AdminResult => ({ status: "success", message });

/** Rafraîchit toutes les pages de l'espace admin après une modification. */
function refreshAdmin() {
  revalidatePath("/admin", "layout");
}

function firstErrors(error: z.ZodError): Record<string, string> {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  return Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Valeur invalide."]));
}

/** Échappe les caractères spéciaux de ILIKE pour une recherche exacte insensible à la casse. */
function exactIlike(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

async function logPrivacy(action: "export" | "suppression" | "purge", details: string, performedBy: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("privacy_log").insert({ action, details, performed_by: performedBy });
}

// ---------------------------------------------------------------------------
// Connexion
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("Adresse e-mail invalide.")),
  password: z.string().min(1, "Mot de passe obligatoire."),
});

export async function signIn(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return fail("Vérifiez les champs.", firstErrors(parsed.error));
  if (!isSupabaseConfigured()) {
    return fail("Supabase n'est pas encore configuré : suivez l'étape « Espace admin » du README.");
  }
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  // Message identique dans tous les cas : on ne révèle pas si le compte existe.
  if (error) return fail("E-mail ou mot de passe incorrect.");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    return fail("Ce compte n'a pas accès à l'espace administrateur.");
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/connexion");
}

// ---------------------------------------------------------------------------
// Contenu par défaut
// ---------------------------------------------------------------------------

export async function importDefaults(): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const offers = defaultOffers.map((o, i) => offerToRow(o, i));
  const guides = defaultGuides.map(guideToRow);
  const [o, g] = await Promise.all([
    supabase.from("offers").upsert(offers, { onConflict: "id", ignoreDuplicates: true }),
    supabase.from("guides").upsert(guides, { onConflict: "slug", ignoreDuplicates: true }),
  ]);
  if (o.error || g.error) return fail("L'import a échoué. Vérifiez que la migration SQL a bien été appliquée.");
  updateTag(CONTENT_TAGS.offers);
  updateTag(CONTENT_TAGS.guides);
  refreshAdmin();
  return done("Contenu par défaut importé. Les éléments déjà présents n'ont pas été modifiés.");
}

// ---------------------------------------------------------------------------
// Offres et prix
// ---------------------------------------------------------------------------

const offerSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{2,40}$/),
  sort: z.coerce.number().int().min(0).max(100),
  name: z.string().trim().min(2, "Nom trop court.").max(80),
  tagline: z.string().trim().max(160),
  price: z
    .string()
    .trim()
    .transform((v) => Number(v.replace(/\s/g, "").replace(",", ".")))
    .pipe(z.number({ error: "Prix invalide." }).positive("Le prix doit être positif.").max(9999, "Prix trop élevé.")),
  billing: z.enum(["unique", "mensuel"]),
  duration: z.string().trim().max(120),
  includes: z.string().max(3000),
  excludes: z.string().max(3000),
  responseTime: z.string().trim().max(300),
  cancellation: z.string().trim().max(300),
  highlighted: z.literal("on").optional(),
  active: z.literal("on").optional(),
});

export async function saveOffer(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const parsed = offerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Certains champs sont à corriger.", firstErrors(parsed.error));
  const d = parsed.data;
  const includes = parseLines(d.includes);
  if (includes.length === 0) return fail("Indiquez au moins un élément inclus.", { includes: "Au moins une ligne." });

  const { error } = await supabase.from("offers").upsert(
    offerToRow(
      {
        id: d.id,
        name: d.name,
        tagline: d.tagline,
        price: Math.round(d.price * 100) / 100,
        billing: d.billing,
        duration: d.duration,
        includes,
        excludes: parseLines(d.excludes),
        responseTime: d.responseTime,
        cancellation: d.cancellation,
        highlighted: d.highlighted === "on",
      },
      d.sort,
      d.active === "on",
    ),
    { onConflict: "id" },
  );
  if (error) return fail("Enregistrement impossible. Réessayez.");
  updateTag(CONTENT_TAGS.offers);
  refreshAdmin();
  return done(`Offre « ${d.name} » enregistrée. Le site est à jour.`);
}

// ---------------------------------------------------------------------------
// Guides
// ---------------------------------------------------------------------------

const guideSchema = z.object({
  mode: z.enum(["create", "edit"]),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Minuscules, chiffres et tirets uniquement (ex. mon-guide).")
    .max(80),
  title: z.string().trim().min(5, "Titre trop court.").max(160),
  description: z.string().trim().min(10, "Description trop courte.").max(300),
  category: z.enum(categories.map((c) => c.id) as [CategoryId, ...CategoryId[]], { error: "Choisissez un domaine." }),
  readingMinutes: z.coerce.number().int().min(1).max(60),
  intro: z.string().trim().max(2000),
  steps: z.string().max(20000),
  checklist: z.string().max(5000),
  glossary: z.string().max(5000),
  lastVerified: z.union([z.literal(""), z.iso.date("Date invalide.")]),
  status: z.enum(["draft", "published"]),
});

export async function saveGuide(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase } = await requireAdmin();
  const parsed = guideSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Certains champs sont à corriger.", firstErrors(parsed.error));
  const d = parsed.data;

  const steps = parseSteps(d.steps);
  const checklist = parseChecklist(d.checklist);
  const sourceIds = knownSourceIds(formData.getAll("sources").filter((v): v is string => typeof v === "string"));
  const lastVerified = d.lastVerified || null;

  if (lastVerified && lastVerified > new Date().toISOString().slice(0, 10)) {
    return fail("La date de vérification ne peut pas être dans le futur.", { lastVerified: "Date future." });
  }
  // Règles de publication : un guide publié doit être complet et sourcé.
  if (d.status === "published") {
    const errors: Record<string, string> = {};
    if (steps.length === 0) errors.steps = "Ajoutez au moins une étape (ligne commençant par ##).";
    if (checklist.length === 0) errors.checklist = "Ajoutez au moins une case à cocher.";
    if (sourceIds.length === 0) errors.sources = "Cochez au moins une source officielle.";
    if (Object.keys(errors).length) return fail("Ce guide ne peut pas être publié en l'état.", errors);
  }

  if (d.mode === "create") {
    const { data: existing } = await supabase.from("guides").select("slug").eq("slug", d.slug).maybeSingle();
    if (existing) return fail("Cette adresse est déjà utilisée par un autre guide.", { slug: "Adresse déjà utilisée." });
  }

  const row = {
    ...guideToRow({
      slug: d.slug,
      title: d.title,
      description: d.description,
      category: d.category,
      readingMinutes: d.readingMinutes,
      intro: d.intro,
      steps,
      checklist,
      glossary: parseGlossary(d.glossary),
      sourceIds,
      lastVerified,
      status: d.status,
      updatedAt: "",
    }),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("guides").upsert(row, { onConflict: "slug" });
  if (error) return fail("Enregistrement impossible. Réessayez.");
  updateTag(CONTENT_TAGS.guides);
  refreshAdmin();
  if (d.mode === "create") redirect(`/admin/guides/${d.slug}?cree=1`);
  return done(d.status === "published" ? "Guide enregistré et publié." : "Brouillon enregistré (non visible sur le site).");
}

export async function deleteGuide(formData: FormData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  await supabase.from("guides").delete().eq("slug", slug);
  updateTag(CONTENT_TAGS.guides);
  refreshAdmin();
  redirect("/admin/guides");
}

// ---------------------------------------------------------------------------
// Visibilité des services
// ---------------------------------------------------------------------------

const visibilitySchema = z.object({
  id: z.string().regex(/^(domain|item):[a-z0-9-]+$/),
  active: z.enum(["true", "false"]),
});

export async function setVisibility(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = visibilitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const { id, active } = parsed.data;
  await supabase
    .from("service_visibility")
    .upsert({ id, kind: id.startsWith("domain:") ? "domain" : "item", active: active === "true", updated_at: new Date().toISOString() });
  updateTag(CONTENT_TAGS.services);
  refreshAdmin();
}

// ---------------------------------------------------------------------------
// Demandes reçues
// ---------------------------------------------------------------------------

export async function updateRequestStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = z
    .object({ id: z.uuid(), status: z.enum(["nouveau", "en_cours", "traite"]) })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await supabase.from("requests").update({ status: parsed.data.status }).eq("id", parsed.data.id);
  refreshAdmin();
}

export async function deleteRequest(formData: FormData) {
  const { supabase, email } = await requireAdmin();
  const parsed = z.object({ id: z.uuid() }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const { data } = await supabase.from("requests").delete().eq("id", parsed.data.id).select("reference");
  if (data?.length) await logPrivacy("suppression", `Demande ${data[0].reference} supprimée`, email);
  refreshAdmin();
}

// ---------------------------------------------------------------------------
// Données personnelles (droits des personnes, conservation)
// ---------------------------------------------------------------------------

export async function deletePersonData(_prev: AdminResult, formData: FormData): Promise<AdminResult> {
  const { supabase, email: admin } = await requireAdmin();
  const parsed = z.object({ email: z.string().trim().pipe(z.email("Adresse e-mail invalide.")) }).safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) return fail("Adresse e-mail invalide.");
  const { data, error } = await supabase.from("requests").delete().ilike("email", exactIlike(parsed.data.email)).select("id");
  if (error) return fail("Suppression impossible. Réessayez.");
  const count = data?.length ?? 0;
  await logPrivacy("suppression", `${count} demande(s) supprimée(s) à la demande d'une personne (droit à l'effacement)`, admin);
  refreshAdmin();
  return done(`${count} demande(s) supprimée(s) pour cette adresse. L'action est inscrite au journal (sans l'adresse).`);
}

export async function purgeExpiredRequests(): Promise<AdminResult> {
  const { supabase, email } = await requireAdmin();
  const { data, error } = await supabase
    .from("requests")
    .delete()
    .lt("created_at", retentionCutoff().toISOString())
    .select("id");
  if (error) return fail("Purge impossible. Réessayez.");
  const count = data?.length ?? 0;
  await logPrivacy("purge", `${count} demande(s) de plus de 12 mois supprimée(s) (purge manuelle)`, email);
  refreshAdmin();
  return done(`${count} demande(s) ancienne(s) supprimée(s).`);
}
