"use client";

import { useActionState } from "react";
import { CreditCard } from "lucide-react";
import { createPaymentLink, type PaymentLinkState } from "@/lib/payments/actions";
import { CopyLinkButton } from "./CopyLinkButton";

type PayableOffer = { id: string; name: string; price: number; kind: string };

/** Génère un lien de paiement signé pour une demande (démarches cochées, ou Pack / abonnement seul). */
export function PaymentLinkMaker({ reference, locale, offers, defaults }: { reference: string; locale: "fr" | "en"; offers: PayableOffer[]; defaults: string[] }) {
  const [state, action, pending] = useActionState<PaymentLinkState, FormData>(createPaymentLink, {});
  return (
    <details className="mt-4 rounded-xl border border-line bg-surface/60 p-3 text-sm">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-medium text-brand-700">
        <CreditCard className="h-4 w-4" aria-hidden="true" /> Lien de paiement
      </summary>
      <form action={action} className="mt-3 space-y-3">
        <input type="hidden" name="ref" value={reference} />
        <input type="hidden" name="locale" value={locale} />
        <fieldset className="grid gap-1.5 sm:grid-cols-2">
          <legend className="mb-1 text-xs text-muted">Cochez ce que le client doit payer (démarches, ou Pack / abonnement seul)</legend>
          {offers.map((o) => (
            <label key={o.id} className="flex items-center gap-2">
              <input type="checkbox" name="offres" value={o.id} defaultChecked={defaults.includes(o.id)} className="h-4 w-4 accent-brand-700" />
              <span className="text-ink">
                {o.name} <span className="text-muted">· {o.price} €</span>
              </span>
            </label>
          ))}
        </fieldset>
        <button type="submit" disabled={pending} className="min-h-10 rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
          {pending ? "Création…" : "Créer le lien"}
        </button>
        {state.error && <p className="text-sm text-red-700">{state.error}</p>}
        {state.path && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-ink">
              Total : <strong>{state.total} €</strong>
            </span>
            <CopyLinkButton path={state.path} label="Copier le lien" />
          </div>
        )}
      </form>
    </details>
  );
}
