"use client";

import { useActionState } from "react";
import { verifyTotpLogin, type MfaState } from "@/lib/admin/mfa";
import { signOut } from "@/lib/admin/actions";
import { adminInput, adminLabel } from "@/components/admin/forms";

export function VerifyCodeForm() {
  const [state, action, pending] = useActionState<MfaState, FormData>(verifyTotpLogin, {});
  return (
    <>
      <form action={action} className="mt-5 space-y-4">
        <div>
          <label htmlFor="code" className={adminLabel}>
            Code à 6 chiffres
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            autoFocus
            required
            className={`${adminInput} text-center text-2xl tracking-[0.4em]`}
          />
        </div>
        {state.error && (
          <p role="alert" className="text-sm text-red-700">
            {state.error}
          </p>
        )}
        <button type="submit" disabled={pending} className="min-h-11 w-full rounded-xl bg-brand-700 px-4 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
          {pending ? "Vérification…" : "Valider"}
        </button>
      </form>
      <form action={signOut} className="mt-4">
        <button type="submit" className="text-sm text-muted hover:text-ink">
          Se déconnecter
        </button>
      </form>
    </>
  );
}
