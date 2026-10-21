import "server-only";

/**
 * Acheminement des demandes reçues par les formulaires (contact, rendez-vous).
 *
 * Pilotes disponibles, choisis par la variable d'environnement FORMS_DELIVERY :
 * - "console" (défaut en développement) : affiche la demande dans le terminal du serveur.
 * - "webhook" : envoie la demande en JSON (POST) à FORMS_WEBHOOK_URL
 *   (ex. outil d'automatisation, messagerie d'équipe, service d'e-mail).
 *
 * En production sans pilote configuré, la demande est refusée proprement :
 * aucune donnée personnelle n'est écrite dans les journaux du serveur.
 *
 * Phase 2 : brancher ici un service d'e-mail transactionnel ou la base de données.
 */
export type DeliveryKind = "contact" | "rendez-vous";

export type DeliveryResult = { ok: true; reference: string } | { ok: false; reason: "not-configured" | "failed" };

function newReference(kind: DeliveryKind): string {
  const prefix = kind === "contact" ? "CT" : "RV";
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export async function deliverRequest(kind: DeliveryKind, payload: Record<string, unknown>): Promise<DeliveryResult> {
  const driver = process.env.FORMS_DELIVERY ?? (process.env.NODE_ENV === "production" ? "" : "console");
  const reference = newReference(kind);
  const body = { kind, reference, receivedAt: new Date().toISOString(), ...payload };

  if (driver === "console") {
    console.info(`[formulaire:${kind}] demande reçue (pilote console, développement)`, body);
    return { ok: true, reference };
  }

  if (driver === "webhook") {
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
        console.error(`[formulaire:${kind}] échec webhook, statut ${res.status} (réf. ${reference})`);
        return { ok: false, reason: "failed" };
      }
      return { ok: true, reference };
    } catch {
      console.error(`[formulaire:${kind}] webhook injoignable (réf. ${reference})`);
      return { ok: false, reason: "failed" };
    }
  }

  console.warn(`[formulaire:${kind}] aucun pilote d'acheminement configuré (FORMS_DELIVERY)`);
  return { ok: false, reason: "not-configured" };
}
