"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type AdminResult } from "@/lib/admin/actions";
import { adminInput, adminLabel, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

export function LoginForm() {
  const [result, action] = useActionState(signIn, { status: "idle" } as AdminResult);
  const denied = useSearchParams().get("erreur") === "acces";

  return (
    <form action={action} className="mt-6 space-y-4" noValidate>
      {denied && result.status === "idle" && (
        <ResultMessage result={{ status: "error", message: "Ce compte n'a pas accès à l'espace administrateur." }} />
      )}
      <ResultMessage result={result} />
      <div>
        <label htmlFor="email" className={adminLabel}>
          E-mail
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={adminInput} />
        <FieldError result={result} name="email" />
      </div>
      <div>
        <label htmlFor="password" className={adminLabel}>
          Mot de passe
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={adminInput} />
        <FieldError result={result} name="password" />
      </div>
      <SubmitButton className="w-full" pendingLabel="Connexion…">Se connecter</SubmitButton>
    </form>
  );
}
