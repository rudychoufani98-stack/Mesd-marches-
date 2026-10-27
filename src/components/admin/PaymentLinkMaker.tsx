"use client";

import { useActionState } from "react";
import { CreditCard } from "lucide-react";
import { createPaymentLink, type PaymentLinkState } from "@/lib/payments/actions";
import { CopyLinkButton } from "./CopyLinkButton";

type PayableCategory = { id: string; name: string; price: number };

/** Génère un lien de paiement signé pour une demande (une catégorie à prix fixe). */
export function PaymentLinkMaker({
  reference,
  locale,
  categories,
  defaultCategory,
}: {
  reference: string;
  locale: "fr" | "en";
  categories: PayableCategory[];
  defaultCategory: string;
}) {
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
          <legend className="mb-1 text-xs text-muted">Catégorie à payer</legend>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2">
              <input type="radio" name="categorie" value={c.id} defaultChecked={c.id === defaultCategory} className="h-4 w-4 accent-brand-700" />
              <span className="text-ink">
                {c.name} <span className="text-muted">· {c.price} €</span>
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
