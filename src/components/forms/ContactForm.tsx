"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitContact } from "@/lib/forms/actions";
import { contactSubjects, initialFormState } from "@/lib/forms/schemas";
import { Button, ButtonLink } from "@/components/ui/primitives";
import { ConsentField, describedBy, Field, fieldError, FormStatus, FormSuccess, Honeypot, inputClasses, previous } from "./fields";

export function ContactForm({ defaultSubject }: { defaultSubject?: string } = {}) {
  const [state, action, pending] = useActionState(submitContact, initialFormState);

  if (state.status === "success") {
    return (
      <FormSuccess message={state.message}>
        <ButtonLink href="/guides" variant="secondary" className="mt-5">
          Parcourir les guides en attendant
        </ButtonLink>
      </FormSuccess>
    );
  }

  const e = (name: string) => fieldError(state, name);

  return (
    <form action={action} noValidate className="relative space-y-5 rounded-card border border-line bg-white p-5 sm:p-7">
      <FormStatus state={state} />
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Votre nom" error={e("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            defaultValue={previous(state, "name")}
            aria-invalid={e("name") ? true : undefined}
            aria-describedby={describedBy("name", e("name"))}
            className={inputClasses}
          />
        </Field>
        <Field id="email" label="Votre adresse e-mail" error={e("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            defaultValue={previous(state, "email")}
            aria-invalid={e("email") ? true : undefined}
            aria-describedby={describedBy("email", e("email"))}
            className={inputClasses}
          />
        </Field>
      </div>
      <Field id="subject" label="Sujet" error={e("subject")}>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={previous(state, "subject") ?? defaultSubject ?? ""}
          aria-invalid={e("subject") ? true : undefined}
          aria-describedby={describedBy("subject", e("subject"))}
          className={inputClasses}
        >
          <option value="" disabled>
            Choisissez un sujet
          </option>
          {contactSubjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>
      <Field
        id="message"
        label="Votre message"
        error={e("message")}
        hint="N'indiquez pas de numéro de sécurité sociale, de numéro fiscal, de coordonnées bancaires ni de mot de passe."
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={2000}
          defaultValue={previous(state, "message")}
          aria-invalid={e("message") ? true : undefined}
          aria-describedby={describedBy("message", e("message"), "aide")}
          className={inputClasses}
        />
      </Field>
      <ConsentField error={e("consent")} defaultChecked={previous(state, "consent") === "on"} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <Send className="h-4 w-4" aria-hidden="true" /> {pending ? "Envoi en cours…" : "Envoyer mon message"}
      </Button>
    </form>
  );
}
