import { ExternalLink } from "lucide-react";
import { getCatalog } from "@/lib/data/catalog";
import { recentPaidSessions } from "@/lib/payments/admin";
import { paymentsStatus } from "@/lib/payments/stripe";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, formatDateTime, Panel } from "@/components/admin/ui";
import { Badge } from "@/components/ui/primitives";

export const metadata = { title: "Paiements" };

export default async function PaymentsPage() {
  await requireAdmin();
  const status = paymentsStatus();
  const [sessions, catalog] = await Promise.all([recentPaidSessions(50), getCatalog()]);
  const nameOf = (id?: string) => catalog.categories.find((c) => c.id === id)?.name ?? id ?? "—";
  const serviceOf = (id?: string) => catalog.services.find((s) => s.id === id)?.name;
  const dashboard = status === "live" ? "https://dashboard.stripe.com/payments" : "https://dashboard.stripe.com/test/payments";

  return (
    <>
      <AdminTitle title="Paiements" description="Les 50 derniers paiements reçus via Stripe. Les reçus et factures sont envoyés automatiquement aux clients par Stripe.">
        <a href={dashboard} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
          Tableau de bord Stripe <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </AdminTitle>

      {status === "off" && (
        <Panel className="mb-6 border-amber-200 bg-amber-50 text-sm text-amber-900">
          <strong>Paiements désactivés.</strong> Ajoutez la variable <code>sk_test</code> (clé de test <code>sk_test_…</code>) dans Vercel, puis redéployez.
        </Panel>
      )}
      {status === "live-blocked" && (
        <Panel className="mb-6 border-amber-200 bg-amber-50 text-sm text-amber-900">
          <strong>Clé live détectée mais bloquée.</strong> Pour encaisser de vrais paiements, ajoutez <code>STRIPE_LIVE_ENABLED=true</code> dans Vercel, une fois vos CGV validées.
        </Panel>
      )}
      {status === "test" && (
        <Panel className="mb-6 border-brand-200 bg-brand-50/50 text-sm text-ink">
          <Badge tone="warning">Mode test</Badge> Aucun vrai paiement : utilisez la carte de test 4242 4242 4242 4242, une date future et n&apos;importe quel code.
        </Panel>
      )}

      {sessions && sessions.length === 0 && <Panel className="text-center text-sm text-muted">Aucun paiement pour le moment.</Panel>}
      {sessions && sessions.length > 0 && (
        <Panel className="p-0 sm:p-0">
          <ul className="divide-y divide-line">
            {sessions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{[nameOf(s.metadata?.categorie), serviceOf(s.metadata?.service)].filter(Boolean).join(" — ")}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDateTime(new Date(s.created * 1000).toISOString())} · {s.customer_details?.email ?? "e-mail inconnu"}
                    {s.client_reference_id ? ` · réf. ${s.client_reference_id}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {s.mode === "subscription" && <Badge>Abonnement</Badge>}
                  <span className="font-semibold text-ink">{((s.amount_total ?? 0) / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );
}
