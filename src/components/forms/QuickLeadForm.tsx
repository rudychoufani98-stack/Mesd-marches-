"use client";

import { useActionState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import type { Offer } from "@/config/pricing";
import { submitAppointment } from "@/lib/forms/actions";
import { appointmentModes, appointmentSlots, initialFormState, optionLabel } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/primitives";
import { ConsentField, describedBy, fieldError, FormStatus, FormSuccess, Honeypot, inputClasses, LocaleField, previous } from "./fields";
import type { Locale } from "@/i18n";

/**
 * Formulaire court de l'accueil : une demande d'appel offert en 30 secondes.
 * Il utilise la même action que la page Rendez-vous ; les disponibilités sont envoyées
 * « toutes cochées » (créneau à proposer par le conseiller).
 */
const copy = {
  fr: {
    title: "Votre appel offert",
    subtitle: "15 minutes avec un conseiller. Réponse sous 48 h ouvrées.",
    need: "Votre besoin",
    unsure: "Je ne sais pas encore, j'en parle au conseiller",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    optional: "facultatif",
    mode: "Je préfère",
    send: "Être rappelé·e gratuitement",
    sending: "Envoi…",
    trust: "Sans engagement, aucun paiement. Vos données restent confidentielles.",
  },
  en: {
    title: "Your free call",
    subtitle: "15 minutes with an advisor. Reply within 2 working days.",
    need: "What you need",
    unsure: "Not sure yet, I'll discuss it with the advisor",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    mode: "I prefer",
    send: "Get a free call back",
    sending: "Sending…",
    trust: "No commitment, no payment. Your data stays confidential.",
  },
};

const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-muted";

export function QuickLeadForm({ offers, locale }: { offers: Offer[]; locale: Locale }) {
  const t = copy[locale];
  const [state, action, pending] = useActionState(submitAppointment, initialFormState);
  const discovery = offers.find((o) => o.kind === "decouverte");
  const steps = offers.filter((o) => o.kind === "demarche");

  if (state.status === "success") return <FormSuccess message={state.message} locale={locale} />;

  const e = (name: string) => fieldError(state, name);
  const input = (name: string) => ({
    id: `lead-${name}`,
    name,
    defaultValue: previous(state, name),
    "aria-invalid": e(name) ? true : undefined,
    "aria-describedby": describedBy(`lead-${name}`, e(name)),
    className: inputClasses,
  });
  const err = (name: string) =>
    e(name) && (
      <p id={`lead-${name}-erreur`} className="mt-1 text-xs text-red-700">
        {e(name)}
      </p>
    );

  return (
    <form action={action} noValidate className="relative space-y-4 rounded-[1.5rem] bg-white p-6 text-ink shadow-[0_30px_80px_rgba(8,15,35,0.35)] sm:p-7">
      <div>
        <h2 className="font-display text-2xl font-semibold">{t.title}</h2>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </div>
      <FormStatus state={state} />
      <Honeypot />
      <LocaleField locale={locale} />
      {appointmentSlots.map((s) => (
        <input key={s.value} type="hidden" name="slots" value={s.value} />
      ))}

      <div>
        <label htmlFor="lead-offer" className={labelClasses}>
          {t.need}
        </label>
        <select {...input("offer")} defaultValue={previous(state, "offer") ?? discovery?.id ?? ""}>
          {discovery && <option value={discovery.id}>{t.unsure}</option>}
          {steps.map((o) => (
            <option key={o.id} value={o.id}>
              {o.headline || o.name}
            </option>
          ))}
        </select>
        {err("offer")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className={labelClasses}>
            {t.name}
          </label>
          <input {...input("name")} type="text" autoComplete="name" maxLength={80} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="lead-email" className={labelClasses}>
            {t.email}
          </label>
          <input {...input("email")} type="email" autoComplete="email" maxLength={160} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-phone" className={labelClasses}>
            {t.phone} <span className="font-normal normal-case tracking-normal">({t.optional})</span>
          </label>
          <input {...input("phone")} type="tel" autoComplete="tel" maxLength={24} />
          {err("phone")}
        </div>
        <fieldset>
          <legend className={labelClasses}>{t.mode}</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {appointmentModes.map((m) => (
              <label
                key={m.value}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-line px-2 py-2.5 text-sm font-medium has-[:checked]:border-brand-700 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800"
              >
                <input
                  type="radio"
                  name="mode"
                  value={m.value}
                  defaultChecked={(previous(state, "mode") ?? "telephone") === m.value}
                  className="sr-only"
                />
                {m.value === "visio" ? "Visio" : optionLabel(m, locale)}
              </label>
            ))}
          </div>
          {err("mode")}
        </fieldset>
      </div>

      <ConsentField error={e("consent")} defaultChecked={previous(state, "consent") === "on"} locale={locale} />

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? t.sending : t.send} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" /> {t.trust}
      </p>
    </form>
  );
}
