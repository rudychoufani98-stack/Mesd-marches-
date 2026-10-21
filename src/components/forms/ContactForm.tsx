"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitContact } from "@/lib/forms/actions";
import { contactSubjects, initialFormState, optionLabel } from "@/lib/forms/schemas";
import type { Locale } from "@/i18n";
import { Button } from "@/components/ui/primitives";
import { ConsentField, describedBy, Field, fieldError, FormStatus, FormSuccess, Honeypot, inputClasses, LocaleField, previous } from "./fields";

const copy = {
  fr: {
    name: "Votre nom",
    email: "Votre adresse e-mail",
    subject: "Sujet",
    choose: "Choisissez un sujet",
    message: "Votre message",
    hint: "N'indiquez pas de numéro de sécurité sociale, de numéro fiscal, de coordonnées bancaires ni de mot de passe.",
    sending: "Envoi en cours…",
    send: "Envoyer mon message",
  },
  en: {
    name: "Your name",
    email: "Your email address",
    subject: "Subject",
    choose: "Choose a subject",
    message: "Your message",
    hint: "Please do not include any social security number, tax number, bank details or password.",
    sending: "Sending…",
    send: "Send my message",
  },
};

export function ContactForm({ defaultSubject, locale = "fr" }: { defaultSubject?: string; locale?: Locale } = {}) {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const t = copy[locale];

  if (state.status === "success") {
    return (
      <FormSuccess message={state.message} locale={locale} />
    );
  }

  const e = (name: string) => fieldError(state, name);

  return (
    <form action={action} noValidate className="relative space-y-5 rounded-card border border-line bg-white p-5 sm:p-7">
      <FormStatus state={state} />
      <Honeypot />
      <LocaleField locale={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} error={e("name")}>
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
        <Field id="email" label={t.email} error={e("email")}>
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
      <Field id="subject" label={t.subject} error={e("subject")}>
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
            {t.choose}
          </option>
          {contactSubjects.map((s) => (
            <option key={s.value} value={s.value}>
              {optionLabel(s, locale)}
            </option>
          ))}
        </select>
      </Field>
      <Field
        id="message"
        label={t.message}
        error={e("message")}
        hint={t.hint}
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
      <ConsentField error={e("consent")} defaultChecked={previous(state, "consent") === "on"} locale={locale} />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <Send className="h-4 w-4" aria-hidden="true" /> {pending ? t.sending : t.send}
      </Button>
    </form>
  );
}
