"use client";

import { Download, Search } from "lucide-react";
import { deletePersonData, purgeExpiredRequests } from "@/lib/admin/actions";
import { adminInput, adminLabel, AdminForm, ResultMessage, SubmitButton } from "@/components/admin/forms";
import { formatDateTime } from "@/components/admin/ui";

export function PersonSearch({
  email,
  found,
}: {
  email: string;
  found: { reference: string; kind: string; created_at: string }[] | null;
}) {
  return (
    <div className="mt-4 space-y-4">
      <form method="get" className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="email-recherche" className={adminLabel}>
            Adresse e-mail
          </label>
          <input id="email-recherche" name="email" type="email" defaultValue={email} required className={adminInput} />
        </div>
        <button type="submit" className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-brand-800 hover:bg-brand-50">
          <Search className="h-4 w-4" aria-hidden="true" /> Rechercher
        </button>
      </form>

      {found && (
        <div className="rounded-xl bg-surface p-4">
          {found.length === 0 ? (
            <p className="text-sm text-ink">Aucune demande enregistrée pour cette adresse.</p>
          ) : (
            <>
              <p className="text-sm font-medium text-ink">{found.length} demande(s) trouvée(s) :</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {found.map((f) => (
                  <li key={f.reference}>
                    {f.reference} · {f.kind === "contact" ? "Contact" : "Rendez-vous"} · {formatDateTime(f.created_at)}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={`/admin/donnees/export?email=${encodeURIComponent(email)}`}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> Exporter (droit d&apos;accès)
                </a>
                <AdminForm
                  action={deletePersonData}
                  confirmMessage={`Supprimer définitivement les ${found.length} demande(s) de ${email} ? Cette action est irréversible.`}
                >
                  {(r) => (
                    <>
                      <input type="hidden" name="email" value={email} />
                      <SubmitButton variant="ghost" className="w-full text-red-700 hover:bg-red-50" pendingLabel="Suppression…">
                        Tout supprimer (droit à l&apos;effacement)
                      </SubmitButton>
                      <div className="mt-2">
                        <ResultMessage result={r} />
                      </div>
                    </>
                  )}
                </AdminForm>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function PurgeForm({ disabled }: { disabled: boolean }) {
  return (
    <AdminForm action={purgeExpiredRequests} className="mt-4 space-y-3" confirmMessage="Supprimer définitivement les demandes anciennes ?">
      {(r) => (
        <>
          <ResultMessage result={r} />
          {!disabled && (
            <SubmitButton variant="secondary" pendingLabel="Suppression…">
              Supprimer les demandes anciennes maintenant
            </SubmitButton>
          )}
        </>
      )}
    </AdminForm>
  );
}
