"use client";

import { useActionState, useState, useTransition } from "react";
import { confirmTotpEnrollment, startTotpEnrollment, type MfaState } from "@/lib/admin/mfa";
import { adminInput, adminLabel } from "@/components/admin/forms";
import { Panel } from "@/components/admin/ui";

/** Activation de la 2FA : 1) afficher le QR code, 2) saisir le premier code. */
export function EnrollTotp() {
  const [setup, setSetup] = useState<MfaState>({});
  const [starting, startTransition] = useTransition();
  const [state, action, pending] = useActionState<MfaState, FormData>(confirmTotpEnrollment, {});
  const current = state.qrCode ? state : setup;

  if (state.done) {
    return (
      <Panel className="border-accent-200 bg-accent-50 text-sm text-ink">
        <p className="font-semibold">Double authentification activée ✓</p>
        <p className="mt-1 text-muted">Désormais, un code vous sera demandé à chaque connexion. Rechargez la page pour voir le nouveau statut.</p>
      </Panel>
    );
  }

  if (!current.qrCode) {
    return (
      <Panel>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-ink">
          <li>Installez une application d&apos;authentification sur votre téléphone (Google Authenticator, Microsoft Authenticator…).</li>
          <li>Cliquez sur le bouton ci-dessous et scannez le QR code avec l&apos;application.</li>
          <li>Saisissez le code à 6 chiffres affiché pour valider.</li>
        </ol>
        {setup.error && <p className="mt-3 text-sm text-red-700">{setup.error}</p>}
        <button
          type="button"
          disabled={starting}
          onClick={() => startTransition(async () => setSetup(await startTotpEnrollment()))}
          className="mt-4 min-h-11 rounded-xl bg-brand-700 px-4 font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
        >
          {starting ? "Préparation…" : "Activer la double authentification"}
        </button>
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
        {/* QR code fourni par Supabase (image SVG en data URI). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.qrCode} alt="QR code à scanner avec votre application d'authentification" className="h-[220px] w-[220px] rounded-xl border border-line bg-white p-2" />
        <form action={action} className="space-y-4">
          <input type="hidden" name="factorId" value={current.factorId} />
          <input type="hidden" name="qrCode" value={current.qrCode} />
          <input type="hidden" name="secret" value={current.secret} />
          <p className="text-sm text-muted">
            Impossible de scanner ? Saisissez cette clé dans l&apos;application : <code className="break-all text-ink">{current.secret}</code>
          </p>
          <div>
            <label htmlFor="code" className={adminLabel}>
              Code à 6 chiffres affiché dans l&apos;application
            </label>
            <input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required className={`${adminInput} max-w-[200px] text-center text-xl tracking-[0.3em]`} />
          </div>
          {state.error && <p className="text-sm text-red-700">{state.error}</p>}
          <button type="submit" disabled={pending} className="min-h-11 rounded-xl bg-brand-700 px-4 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
            {pending ? "Vérification…" : "Valider et activer"}
          </button>
        </form>
      </div>
    </Panel>
  );
}
