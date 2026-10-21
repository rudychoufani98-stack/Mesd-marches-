"use client";

import { useActionState } from "react";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { computeSelection, formatEuros, formatPrice, type Offer, type OfferKind } from "@/config/pricing";
import { submitAppointment } from "@/lib/forms/actions";
import { appointmentModes, appointmentSlots, initialFormState } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/primitives";
import { ConsentField, describedBy, Field, fieldError, FormStatus, FormSuccess, Honeypot, inputClasses, LocaleField, previous } from "./fields";
import { href, type Locale } from "@/i18n";
import { optionLabel } from "@/lib/forms/schemas";

const copy = {
  fr: {
    offer: "Ce qui vous intéresse",
    chooseOffer: "Choisissez une démarche ou une formule",
    yourSelection: "Votre sélection",
    editSelection: "Modifier",
    total: "Total",
    name: "Votre nom",
    email: "Votre adresse e-mail",
    phone: "Votre téléphone",
    optional: "facultatif",
    mode: "Mode de rendez-vous",
    slots: "Vos disponibilités (en semaine)",
    message: "Ce que vous souhaitez aborder",
    hint: "Décrivez votre besoin en quelques mots. N'indiquez aucun numéro personnel, document ou mot de passe.",
    noCommitment:
      "Cette demande ne vous engage pas et ne déclenche aucun paiement. Nous vous recontactons pour proposer un créneau et confirmer les modalités.",
    sending: "Envoi en cours…",
    send: "Envoyer ma demande",
  },
  en: {
    offer: "What are you interested in?",
    chooseOffer: "Choose a procedure or an option",
    yourSelection: "Your selection",
    editSelection: "Edit",
    total: "Total",
    name: "Your name",
    email: "Your email address",
    phone: "Your phone number",
    optional: "optional",
    mode: "How would you like to meet?",
    slots: "Your availability (weekdays)",
    message: "What you would like to discuss",
    hint: "Describe what you need in a few words. Please do not include any personal number, document or password.",
    noCommitment:
      "This request is not binding and does not trigger any payment. We will get back to you to suggest a time slot and confirm the details.",
    sending: "Sending…",
    send: "Send my request",
  },
};

const groupError = "mt-1.5 text-sm text-red-700";

const offerGroups: { key: string; kinds: OfferKind[]; label: Record<Locale, string> }[] = [
  { key: "free", kinds: ["decouverte"], label: { fr: "Pour commencer", en: "To start" } },
  { key: "steps", kinds: ["demarche"], label: { fr: "À la démarche", en: "Per procedure" } },
  { key: "bundles", kinds: ["pack", "abonnement"], label: { fr: "Pack et abonnement", en: "Bundle and subscription" } },
];

export function AppointmentForm({
  offers,
  defaultOffer,
  selectionIds = [],
  locale = "fr",
}: {
  offers: Offer[];
  defaultOffer?: string;
  /** Démarches choisies dans le sélecteur de la page Tarifs. */
  selectionIds?: string[];
  locale?: Locale;
}) {
  const selection = offers.filter((o) => o.kind === "demarche" && selectionIds.includes(o.id));
  const totals = computeSelection(offers, selectionIds);
  const t = copy[locale];
  const [state, action, pending] = useActionState(submitAppointment, initialFormState);

  if (state.status === "success") {
    return (
      <FormSuccess message={state.message} locale={locale} />
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
      <LocaleField locale={locale} />

      {selection.length > 0 ? (
        <div className="rounded-card border border-brand-200 bg-brand-50/50 p-4">
          <input type="hidden" name="offer" value="selection" />
          {selection.map((o) => (
            <input key={o.id} type="hidden" name="selection" value={o.id} />
          ))}
          <p className="flex items-center justify-between gap-3 text-sm font-semibold text-ink">
            <span>
              <span aria-hidden="true">🛍️</span> {t.yourSelection}
            </span>
            <Link href={`${href("/tarifs", locale)}#a-la-demarche`} className="text-xs font-medium text-brand-700 underline">
              {t.editSelection}
            </Link>
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {selection.map((o) => (
              <li key={o.id} className="flex justify-between gap-3">
                <span className="text-ink">{o.name}</span>
                <span className="shrink-0 text-muted">{formatPrice(o, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between border-t border-brand-100 pt-2 text-sm font-bold text-ink">
            <span>
              {t.total}
              {totals.discountPercent > 0 ? ` (−${totals.discountPercent} %)` : ""}
            </span>
            <span>{formatEuros(totals.total, locale)}</span>
          </p>
          {e("offer") && <p className={groupError}>{e("offer")}</p>}
        </div>
      ) : (
        <Field id="offer" label={t.offer} error={e("offer")}>
          <select
            id="offer"
            name="offer"
            defaultValue={prevOffer ?? ""}
            aria-invalid={e("offer") ? true : undefined}
            aria-describedby={describedBy("offer", e("offer"))}
            className={inputClasses}
          >
            <option value="" disabled>
              {t.chooseOffer}
            </option>
            {offerGroups.map((g) => {
              const list = offers.filter((o) => g.kinds.includes(o.kind));
              return list.length ? (
                <optgroup key={g.key} label={g.label[locale]}>
                  {list.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} — {formatPrice(o, locale)}
                    </option>
                  ))}
                </optgroup>
              ) : null;
            })}
          </select>
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} error={e("name")}>
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
        <Field id="email" label={t.email} error={e("email")}>
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
        <Field id="phone" label={t.phone} error={e("phone")} optional={t.optional}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={24}
            defaultValue={previous(state, "phone")}
            aria-invalid={e("phone") ? true : undefined}
            aria-describedby={describedBy("phone", e("phone"))}
            className={inputClasses}
          />
        </Field>
      </div>

      <fieldset aria-describedby={e("mode") ? "mode-erreur" : undefined}>
        <legend className="text-sm font-medium text-ink">{t.mode}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {appointmentModes.map((m) => (
            <label key={m.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="radio" name="mode" value={m.value} defaultChecked={prevMode === m.value} className="h-4 w-4 accent-brand-700" />
              <span className="text-sm font-medium text-ink">{optionLabel(m, locale)}</span>
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
        <legend className="text-sm font-medium text-ink">{t.slots}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {appointmentSlots.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="checkbox" name="slots" value={s.value} defaultChecked={prevSlots.includes(s.value)} className="h-4 w-4 accent-brand-700" />
              <span className="text-sm font-medium text-ink">{optionLabel(s, locale)}</span>
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
        label={t.message}
        optional={locale === "en" ? "optional" : true}
        error={e("message")}
        hint={t.hint}
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

      <ConsentField error={e("consent")} defaultChecked={previous(state, "consent") === "on"} locale={locale} />

      <p className="text-xs leading-relaxed text-muted">
        {t.noCommitment}
      </p>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        <CalendarCheck className="h-4 w-4" aria-hidden="true" /> {pending ? t.sending : t.send}
      </Button>
    </form>
  );
}
