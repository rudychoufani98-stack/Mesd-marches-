import "server-only";
import { siteConfig } from "@/config/site";

/**
 * Notification et acheminement des demandes reçues (contact, rendez-vous).
 *
 * 1. Si Supabase est configuré, la demande est enregistrée en base (voir lib/forms/actions.ts)
 *    et consultable dans l'espace admin. Le webhook éventuel reçoit alors UNIQUEMENT
 *    une notification sans donnée personnelle (type, référence, lien vers l'admin).
 * 2. Sans Supabase, le pilote FORMS_DELIVERY s'applique :
 *    - "console" (défaut en développement) : affiche la demande dans le terminal ;
 *    - "webhook" : envoie la demande complète en JSON à FORMS_WEBHOOK_URL.
 *    En production sans pilote, la demande est refusée proprement.
 */
export type DeliveryKind = "contact" | "rendez-vous";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

export function newReference(kind: DeliveryKind): string {
  const prefix = kind === "contact" ? "CT" : "RV";
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${random}`;
}

async function postWebhook(body: Record<string, unknown>, kind: DeliveryKind): Promise<DeliveryResult> {
  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORMS_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.FORMS_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[formulaire:${kind}] échec webhook, statut ${res.status} (réf. ${body.reference})`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch {
    console.error(`[formulaire:${kind}] webhook injoignable (réf. ${body.reference})`);
    return { ok: false, reason: "failed" };
  }
}

/** Notification sans donnée personnelle, après enregistrement en base. N'échoue jamais la demande. */
export async function notifyStoredRequest(kind: DeliveryKind, reference: string): Promise<void> {
  if (process.env.FORMS_DELIVERY !== "webhook") return;
  await postWebhook(
    {
      kind,
      reference,
      receivedAt: new Date().toISOString(),
      adminUrl: `${siteConfig.url.replace(/\/$/, "")}/admin/demandes`,
      message: `Nouvelle demande (${kind}) à consulter dans l'espace admin.`,
    },
    kind,
  );
}

/** Acheminement sans base de données (mode MVP). */
export async function deliverWithoutDatabase(
  kind: DeliveryKind,
  reference: string,
  payload: Record<string, unknown>,
): Promise<DeliveryResult> {
  const driver = process.env.FORMS_DELIVERY ?? (process.env.NODE_ENV === "production" ? "" : "console");
  const body = { kind, reference, receivedAt: new Date().toISOString(), ...payload };

  if (driver === "console") {
    console.info(`[formulaire:${kind}] demande reçue (pilote console, développement)`, body);
    return { ok: true };
  }
  if (driver === "webhook") return postWebhook(body, kind);

  console.warn(`[formulaire:${kind}] aucun pilote d'acheminement configuré (FORMS_DELIVERY)`);
  return { ok: false, reason: "not-configured" };
}
