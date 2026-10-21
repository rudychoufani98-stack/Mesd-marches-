"use client";

import { useActionState } from "react";
import { CalendarCheck } from "lucide-react";
import { formatPrice, offers, type OfferId } from "@/config/pricing";
import { submitAppointment } from "@/lib/forms/actions";
import { appointmentModes, appointmentSlots, initialFormState } from "@/lib/forms/schemas";
import { Button, ButtonLink } from "@/components/ui/primitives";
import { ConsentField, describedBy, Field, fieldError, FormStatus, FormSuccess, Honeypot, inputClasses, previous } from "./fields";

const groupError = "mt-1.5 text-sm text-red-700";

export function AppointmentForm({ defaultOffer }: { defaultOffer?: OfferId }) {
  const [state, action, pending] = useActionState(submitAppointment, initialFormState);

  if (state.status === "success") {
    return (
      <FormSuccess message={state.message}>
        <ButtonLink href="/plan-action" variant="secondary" className="mt-5">
          Préparer mon plan d&apos;action en attendant
        </ButtonLink>
      </FormSuccess>
    );
  }

  const e = (name: string) => fieldError(state, name);
  const prevOffer = previous(state, "offer") ?? defaultOffer;
  const prevMode = previous(state, "mode");
  const prevSlots = (state.values?.slots as string[] | undefined) ?? [];

  return (
    <form action={action} noValidate className="relative space-y-6 rounded-card border border-line bg-white p-5 sm:p-7">
      <FormStatus state={state} />
      <Honeypot />

      <fieldset aria-describedby={e("offer") ? "offer-erreur" : undefined}>
        <legend className="text-sm font-medium text-ink">Offre souhaitée</legend>
        <div className="mt-2 grid gap-2">
          {offers.map((o) => (
            <label
              key={o.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line p-3 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
            >
              <span className="flex items-center gap-3">
                <input type="radio" name="offer" value={o.id} defaultChecked={prevOffer === o.id} className="h-4 w-4 accent-brand-700" />
                <span>
                  <span className="block font-medium text-ink">{o.name}</span>
                  <span className="block text-xs text-muted">{o.duration}</span>
                </span>
              </span>
              <span className="text-sm font-semibold text-ink">{formatPrice(o)}</span>
            </label>
          ))}
        </div>
        {e("offer") && (
          <p id="offer-erreur" className={groupError}>
            {e("offer")}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Votre nom" error={e("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
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
            maxLength={160}
            defaultValue={previous(state, "email")}
            aria-invalid={e("email") ? true : undefined}
            aria-describedby={describedBy("email", e("email"))}
            className={inputClasses}
          />
        </Field>
      </div>

      <fieldset aria-describedby={e("mode") ? "mode-erreur" : undefined}>
        <legend className="text-sm font-medium text-ink">Mode de rendez-vous</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {appointmentModes.map((m) => (
            <label key={m.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="radio" name="mode" value={m.value} defaultChecked={prevMode === m.value} className="h-4 w-4 accent-brand-700" />
              <span className="text-sm font-medium text-ink">{m.label}</span>
            </label>
          ))}
        </div>
        {e("mode") && (
          <p id="mode-erreur" className={groupError}>
            {e("mode")}
          </p>
        )}
      </fieldset>

      <fieldset aria-describedby={e("slots") ? "slots-erreur" : undefined}>
        <legend className="text-sm font-medium text-ink">Vos disponibilités (en semaine)</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {appointmentSlots.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="checkbox" name="slots" value={s.value} defaultChecked={prevSlots.includes(s.value)} className="h-4 w-4 accent-brand-700" />
              <span className="text-sm font-medium text-ink">{s.label}</span>
            </label>
          ))}
        </div>
        {e("slots") && (
          <p id="slots-erreur" className={groupError}>
            {e("slots")}
          </p>
        )}
      </fieldset>

      <Field
        id="message"
        label="Ce que vous souhaitez aborder"
        optional
        error={e("message")}
        hint="Décrivez votre besoin en quelques mots. N'indiquez aucun numéro personnel, document ou mot de passe."
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          defaultValue={previous(state, "message")}
          aria-invalid={e("message") ? true : undefined}
          aria-describedby={describedBy("message", e("message"), "aide")}
          className={inputClasses}
        />
      </Field>

      <ConsentField error={e("consent")} defaultChecked={previous(state, "consent") === "on"} />

      <p className="text-xs leading-relaxed text-muted">
        Cette demande ne vous engage pas et ne déclenche aucun paiement. Nous vous recontactons pour proposer un créneau et
        confirmer les modalités.
      </p>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <CalendarCheck className="h-4 w-4" aria-hidden="true" /> {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
