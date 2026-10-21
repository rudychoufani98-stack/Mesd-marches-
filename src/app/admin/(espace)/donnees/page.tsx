import { PRIVACY_VERSION, REQUEST_RETENTION_MONTHS, retentionCutoff } from "@/config/privacy";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, formatDateTime, Panel } from "@/components/admin/ui";
import { PersonSearch, PurgeForm } from "./PrivacyForms";

export const metadata = { title: "Données personnelles" };

type LogRow = { id: number; action: string; details: string; performed_by: string; created_at: string };

export default async function PrivacyAdminPage({ searchParams }: PageProps<"/admin/donnees">) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const email = typeof sp.email === "string" ? sp.email.trim().slice(0, 160) : "";

  const [expired, log, found] = await Promise.all([
    supabase.from("requests").select("id", { count: "exact", head: true }).lt("created_at", retentionCutoff().toISOString()),
    supabase.from("privacy_log").select("*").order("created_at", { ascending: false }).limit(30),
    email
      ? supabase
          .from("requests")
          .select("reference, kind, created_at")
          .ilike("email", email.replace(/[\\%_]/g, (c) => `\\${c}`))
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: null }),
  ]);

  return (
    <>
      <AdminTitle
        title="Données personnelles"
        description="Répondre aux demandes des personnes (accès, effacement) et appliquer la durée de conservation."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel>
          <h2 className="font-semibold text-ink">Demande d&apos;une personne</h2>
          <p className="mt-1 text-sm text-muted">
            Quand une personne demande l&apos;accès à ses données ou leur suppression, recherchez son adresse e-mail. Vérifiez
            d&apos;abord que la demande vient bien d&apos;elle (par exemple en lui répondant depuis cette adresse).
          </p>
          <PersonSearch email={email} found={(found.data as { reference: string; kind: string; created_at: string }[] | null) ?? null} />
        </Panel>

        <Panel>
          <h2 className="font-semibold text-ink">Durée de conservation</h2>
          <p className="mt-1 text-sm text-muted">
            Les demandes sont conservées {REQUEST_RETENTION_MONTHS} mois, puis supprimées automatiquement chaque nuit (si la tâche
            planifiée est active dans Supabase). Vous pouvez aussi lancer la suppression maintenant.
          </p>
          <p className="mt-3 text-sm text-ink">
            Demandes de plus de {REQUEST_RETENTION_MONTHS} mois : <strong>{expired.count ?? 0}</strong>
          </p>
          <PurgeForm disabled={!expired.count} />
          <p className="mt-4 text-xs text-muted">Version de la politique de confidentialité enregistrée avec chaque demande : {PRIVACY_VERSION}.</p>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="font-semibold text-ink">Journal des actions</h2>
        <p className="mt-1 text-sm text-muted">Exports, suppressions et purges. Le journal ne contient aucune adresse des personnes concernées.</p>
        {(log.data ?? []).length === 0 ? (
          <p className="mt-4 text-sm text-muted">Aucune action pour le moment.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line text-sm">
            {(log.data as LogRow[]).map((l) => (
              <li key={l.id} className="flex flex-wrap justify-between gap-2 py-2">
                <span className="text-ink">
                  <strong className="capitalize">{l.action}</strong> — {l.details}
                </span>
                <span className="text-xs text-muted">
                  {formatDateTime(l.created_at)} · {l.performed_by}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
