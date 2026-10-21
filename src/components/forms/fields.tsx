import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import type { FormState } from "@/lib/forms/schemas";

export const inputClasses =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-ink shadow-sm placeholder:text-muted/70 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 aria-[invalid=true]:border-red-400";

export function fieldError(state: FormState, name: string): string | undefined {
  return state.fieldErrors?.[name]?.[0];
}

export function previous(state: FormState, name: string): string | undefined {
  const v = state.values?.[name];
  return typeof v === "string" ? v : undefined;
}

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label} {optional && <span className="font-normal text-muted">(facultatif)</span>}
      </label>
      {hint && (
        <p id={`${id}-aide`} className="mt-0.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-erreur`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return [hint ? `${id}-aide` : null, error ? `${id}-erreur` : null].filter(Boolean).join(" ") || undefined;
}

/** Champ invisible pour piéger les robots de spam. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Ne pas remplir ce champ</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function ConsentField({ error, defaultChecked }: { error?: string; defaultChecked?: boolean }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="consent"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-erreur" : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-brand-700"
        />
        <span>
          J&apos;accepte que les informations saisies soient utilisées pour traiter ma demande et me répondre. Elles ne sont
          ni vendues ni utilisées à des fins publicitaires, et sont supprimées au bout de {REQUEST_RETENTION_MONTHS} mois.{" "}
          <Link href="/confidentialite" className="font-medium text-brand-700 underline">
            En savoir plus
          </Link>
        </span>
      </label>
      {error && (
        <p id="consent-erreur" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormStatus({ state }: { state: FormState }) {
  if (state.status === "error" && state.message) {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        {state.message}
      </div>
    );
  }
  return null;
}

export function FormSuccess({ message, children }: { message?: string; children?: ReactNode }) {
  return (
    <div role="status" className="rounded-card border border-accent-200 bg-accent-50 p-6 sm:p-8">
      <CheckCircle2 className="h-8 w-8 text-accent-600" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-bold text-ink">Demande envoyée</h2>
      <p className="mt-2 leading-relaxed text-ink">{message}</p>
      {children}
    </div>
  );
}
