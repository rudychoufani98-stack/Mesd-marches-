"use client";

import { createContext, startTransition, useActionState, useContext, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { AdminResult } from "@/lib/admin/actions";
import { Button } from "@/components/ui/primitives";

const initial: AdminResult = { status: "idle" };

export function ResultMessage({ result }: { result: AdminResult }) {
  if (result.status === "idle" || !result.message) return null;
  const ok = result.status === "success";
  return (
    <p
      role={ok ? "status" : "alert"}
      className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
        ok ? "border-accent-200 bg-accent-50 text-accent-700" : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
      {result.message}
    </p>
  );
}

const PendingContext = createContext<boolean | null>(null);

/**
 * Formulaire admin avec retour visuel (succès / erreurs par champ).
 * L'envoi est fait à la main pour que React ne vide pas le formulaire :
 * en cas d'erreur, le texte saisi (ex. un long guide) est conservé.
 */
export function AdminForm({
  action,
  children,
  className = "",
  confirmMessage,
}: {
  action: (prev: AdminResult, formData: FormData) => Promise<AdminResult>;
  children: (result: AdminResult) => ReactNode;
  className?: string;
  confirmMessage?: string;
}) {
  const [result, formAction, pending] = useActionState(action, initial);
  return (
    <form
      className={className}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (confirmMessage && !window.confirm(confirmMessage)) return;
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      <PendingContext.Provider value={pending}>{children(result)}</PendingContext.Provider>
    </form>
  );
}

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  pendingLabel = "Enregistrement…",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  pendingLabel?: string;
}) {
  const status = useFormStatus();
  const pending = useContext(PendingContext) ?? status.pending;
  return (
    <Button type="submit" variant={variant} disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </Button>
  );
}

/** Bouton d'une action simple (sans retour), avec confirmation facultative. */
export function ActionButton({
  action,
  fields,
  children,
  confirmMessage,
  variant = "secondary",
  className = "",
}: {
  action: (formData: FormData) => Promise<void>;
  fields: Record<string, string>;
  children: ReactNode;
  confirmMessage?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirmMessage && !window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <SubmitButton variant={variant} className={className}>
        {children}
      </SubmitButton>
    </form>
  );
}

export function FieldError({ result, name }: { result: AdminResult; name: string }) {
  const msg = result.errors?.[name];
  return msg ? <p className="mt-1 text-sm text-red-700">{msg}</p> : null;
}

export const adminInput =
  "mt-1 block w-full rounded-lg border border-line bg-white px-3 py-2 text-base text-ink focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:text-sm";
export const adminLabel = "block text-sm font-medium text-ink";
