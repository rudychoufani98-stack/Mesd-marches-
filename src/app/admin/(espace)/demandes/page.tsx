import Link from "next/link";
import { REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { contactSubjects, appointmentModes, appointmentSlots } from "@/lib/forms/schemas";
import { deleteRequest, updateRequestStatus } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/supabase/server";
import { ActionButton } from "@/components/admin/forms";
import { AdminTitle, formatDateTime, Panel } from "@/components/admin/ui";
import { Badge } from "@/components/ui/primitives";

export const metadata = { title: "Demandes" };

type RequestRow = {
  id: string;
  reference: string;
  kind: "contact" | "rendez-vous";
  name: string;
  email: string;
  data: Record<string, unknown>;
  status: "nouveau" | "en_cours" | "traite";
  consent_at: string;
  consent_version: string;
  created_at: string;
};

const statuses = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "traite", label: "Traité" },
] as const;

const label = (list: readonly { value: string; label: string }[], v: unknown) =>
  list.find((x) => x.value === v)?.label ?? String(v ?? "");

function Details({ r }: { r: RequestRow }) {
  const d = r.data;
  const rows: [string, string][] =
    r.kind === "contact"
      ? [
          ["Sujet", label(contactSubjects, d.subject)],
          ["Message", String(d.message ?? "")],
        ]
      : [
          ["Offre", String(d.offerName ?? d.offer ?? "")],
          ...(Array.isArray(d.selection)
            ? ([
                ["Démarches", d.selection.join(", ")],
                ["Total", `${d.total} € (sous-total ${d.subtotal} €, remise ${d.discountPercent} %)`],
              ] as [string, string][])
            : []),
          ["Téléphone", String(d.phone ?? "") || "—"],
          ["Mode", label(appointmentModes, d.mode)],
          ["Disponibilités", Array.isArray(d.slots) ? d.slots.map((s) => label(appointmentSlots, s)).join(", ") : ""],
          ["Message", String(d.message ?? "") || "—"],
        ];
  return (
    <dl className="mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[130px_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-medium text-muted">{k}</dt>
          <dd className="whitespace-pre-wrap break-words text-ink">{v}</dd>
        </div>
      ))}
      <dt className="font-medium text-muted">Consentement</dt>
      <dd className="text-ink">
        {formatDateTime(r.consent_at)} (politique v{r.consent_version})
      </dd>
    </dl>
  );
}

export default async function RequestsPage({ searchParams }: PageProps<"/admin/demandes">) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const filter = statuses.some((s) => s.value === sp.statut) ? (sp.statut as string) : undefined;

  let query = supabase.from("requests").select("*").order("created_at", { ascending: false }).limit(200);
  if (filter) query = query.eq("status", filter);
  const { data, error } = await query;
  const requests = (data ?? []) as RequestRow[];

  const chip =
    "inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3 text-sm font-medium text-ink aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white";

  return (
    <>
      <AdminTitle
        title="Demandes reçues"
        description={`Messages de contact et demandes de rendez-vous. Elles sont supprimées automatiquement ${REQUEST_RETENTION_MONTHS} mois après leur réception.`}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        <Link href="/admin/demandes" aria-current={!filter} className={chip}>
          Toutes
        </Link>
        {statuses.map((s) => (
          <Link key={s.value} href={`/admin/demandes?statut=${s.value}`} aria-current={filter === s.value} className={chip}>
            {s.label}
          </Link>
        ))}
      </div>

      {error && <Panel className="text-sm text-red-800">Impossible de charger les demandes. Vérifiez la configuration de la base.</Panel>}
      {!error && requests.length === 0 && (
        <Panel className="text-center text-sm text-muted">Aucune demande {filter ? "avec ce statut" : "pour le moment"}.</Panel>
      )}

      <ul className="space-y-3">
        {requests.map((r) => (
          <li key={r.id}>
            <Panel>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={r.kind === "contact" ? "brand" : "accent"}>{r.kind === "contact" ? "Contact" : "Rendez-vous"}</Badge>
                    {r.status === "nouveau" && <Badge tone="warning">Nouveau</Badge>}
                    <span className="text-xs text-muted">
                      {r.reference} · {formatDateTime(r.created_at)}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-ink">{r.name}</p>
                  <a href={`mailto:${r.email}?subject=${encodeURIComponent(`MesDémarches — ${r.reference}`)}`} className="break-all text-sm text-brand-700 hover:underline">
                    {r.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={updateRequestStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={r.id} />
                    <label htmlFor={`statut-${r.id}`} className="sr-only">
                      Statut
                    </label>
                    <select
                      id={`statut-${r.id}`}
                      name="status"
                      defaultValue={r.status}
                      className="min-h-10 rounded-lg border border-line bg-white px-2 text-base sm:text-sm"
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="min-h-10 rounded-lg border border-line px-3 text-sm font-medium text-ink hover:bg-surface">
                      Mettre à jour
                    </button>
                  </form>
                  <ActionButton
                    action={deleteRequest}
                    fields={{ id: r.id }}
                    variant="ghost"
                    confirmMessage={`Supprimer définitivement la demande ${r.reference} ?`}
                  >
                    Supprimer
                  </ActionButton>
                </div>
              </div>
              <Details r={r} />
            </Panel>
          </li>
        ))}
      </ul>
    </>
  );
}
