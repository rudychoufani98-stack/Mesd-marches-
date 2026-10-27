"use client";

import { useActionState, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Lock, Phone, Video } from "lucide-react";
import type { CatalogCategory, CatalogService } from "@/config/catalog";
import { formatCategoryPrice } from "@/config/catalog";
import { createBooking, type BookingState } from "@/lib/booking/actions";
import type { DaySlots } from "@/lib/booking/slots";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { Honeypot, inputClasses } from "@/components/forms/fields";
import { href, type Locale } from "@/i18n";
import Link from "next/link";

type Kind = "appel" | "accompagnement";

const copy = {
  fr: {
    steps: ["Votre besoin", "Date et heure", "Vos informations"],
    chooseKind: "Comment souhaitez-vous commencer ?",
    call: "Appel découverte gratuit",
    callText: "15 minutes, sans engagement, pour comprendre votre besoin et vous orienter.",
    support: "Accompagnement personnalisé",
    supportText: "Un rendez-vous individuel avec votre conseiller, à prix fixe, payé en ligne.",
    category: "Catégorie",
    categoryOptional: "Catégorie (facultatif)",
    service: "Par quoi souhaitez-vous commencer ?",
    allIncluded: "Votre accompagnement couvre tous les services de la catégorie : vous pourrez aborder tous ces sujets.",
    businessNote: "Pour les entreprises, nous commençons par un appel pour établir une proposition adaptée.",
    next: "Continuer",
    back: "Retour",
    noSlots: "Aucun créneau disponible pour le moment. Écrivez-nous via la page Contact.",
    slotTitle: "Choisissez votre créneau",
    parisTime: "Heures de Paris",
    mode: "Le rendez-vous se fait",
    visio: "En visio",
    phone: "Par téléphone",
    name: "Nom et prénom",
    email: "E-mail",
    tel: "Téléphone",
    optional: "facultatif",
    country: "Pays de résidence",
    situation: "Votre situation actuelle",
    situationHint: "Ex. : salarié arrivé en France il y a 3 mois, titre de séjour étudiant…",
    need: "Votre besoin",
    needHint: "Décrivez en quelques lignes ce qui vous amène.",
    goal: "Ce que vous voulez obtenir",
    extra: "Informations complémentaires utiles",
    privacy: "N'indiquez ni mot de passe, ni numéro de sécurité sociale, ni coordonnées bancaires.",
    consent: "J'accepte que ces informations soient utilisées pour préparer et assurer mon rendez-vous (conservées 12 mois au plus).",
    privacyLink: "Politique de confidentialité",
    summary: "Récapitulatif",
    free: "Gratuit",
    pay: "Payer et confirmer",
    confirm: "Confirmer mon appel",
    sending: "Un instant…",
    secure: "Paiement sécurisé par Stripe. Le créneau vous est réservé pendant le paiement.",
    cancelled: "Paiement annulé : votre créneau n'a pas été réservé. Vous pouvez recommencer.",
  },
  en: {
    steps: ["Your need", "Date and time", "Your details"],
    chooseKind: "How would you like to start?",
    call: "Free discovery call",
    callText: "15 minutes, no commitment, to understand your need and guide you.",
    support: "Personal support",
    supportText: "A one-to-one appointment with your advisor, at a fixed price, paid online.",
    category: "Category",
    categoryOptional: "Category (optional)",
    service: "What would you like to start with?",
    allIncluded: "Your support covers every service in the category: you can discuss all of these topics.",
    businessNote: "For companies, we start with a call to put together a tailored proposal.",
    next: "Continue",
    back: "Back",
    noSlots: "No time slots available at the moment. Please write to us via the Contact page.",
    slotTitle: "Choose your time slot",
    parisTime: "Paris time",
    mode: "The appointment takes place",
    visio: "By video",
    phone: "By phone",
    name: "Full name",
    email: "Email",
    tel: "Phone",
    optional: "optional",
    country: "Country of residence",
    situation: "Your current situation",
    situationHint: "E.g. employee who arrived in France 3 months ago, student residence permit…",
    need: "Your need",
    needHint: "Describe in a few lines what brings you here.",
    goal: "What you want to achieve",
    extra: "Other useful information",
    privacy: "Do not include passwords, social security numbers or bank details.",
    consent: "I agree that this information is used to prepare and hold my appointment (kept for 12 months at most).",
    privacyLink: "Privacy policy",
    summary: "Summary",
    free: "Free",
    pay: "Pay and confirm",
    confirm: "Confirm my call",
    sending: "One moment…",
    secure: "Secure payment by Stripe. Your slot is held for you during payment.",
    cancelled: "Payment cancelled: your slot was not booked. You can start again.",
  },
};

const label = "block text-sm font-medium text-ink";

export function BookingFlow({
  locale,
  categories,
  services,
  days,
  initial,
  cancelled,
}: {
  locale: Locale;
  categories: CatalogCategory[];
  services: CatalogService[];
  days: DaySlots[];
  initial: { kind?: Kind; categorie?: string; service?: string };
  cancelled?: boolean;
}) {
  const t = copy[locale];
  const [state, action, pending] = useActionState<BookingState, FormData>(createBooking, { status: "idle" });
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<Kind>(initial.kind ?? (initial.service ? "accompagnement" : "appel"));
  const [categoryId, setCategoryId] = useState(initial.categorie ?? "");
  const [serviceId, setServiceId] = useState(initial.service ?? "");
  const [day, setDay] = useState(days[0]?.date ?? "");
  const [slot, setSlot] = useState("");
  const [mode, setMode] = useState<"visio" | "telephone">("visio");

  const category = categories.find((c) => c.id === categoryId);
  const categoryServices = useMemo(() => services.filter((s) => s.categoryId === categoryId), [services, categoryId]);
  const service = categoryServices.find((s) => s.id === serviceId);
  const isBusiness = category?.kind === "business";
  const paid = kind === "accompagnement" && !!category && !category.priceFrom && !isBusiness;
  const e = (name: string) => state.fieldErrors?.[name]?.[0];

  const canStep1 = kind === "appel" || (!!category && !!service);
  const daySlots = days.find((d) => d.date === day)?.slots ?? [];

  const fmtDay = (date: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" }).format(
      new Date(`${date}T12:00:00Z`),
    );
  const fmtTime = (iso: string) => new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  const fmtFull = (iso: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
      timeZone: "Europe/Paris",
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));

  const card = (on: boolean) =>
    `flex w-full items-start gap-3 rounded-card border-2 bg-white p-4 text-left transition-colors ${on ? "border-brand-700 bg-brand-50/50" : "border-line hover:border-brand-200"}`;

  return (
    <form action={action} noValidate className="relative rounded-[1.5rem] border border-line bg-white p-5 shadow-sm sm:p-8">
      <Honeypot />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="categorie" value={categoryId} />
      <input type="hidden" name="service" value={kind === "accompagnement" ? serviceId : (service?.id ?? "")} />
      <input type="hidden" name="slot" value={slot} />
      <input type="hidden" name="mode" value={mode} />

      {/* Étapes */}
      <ol className="mb-8 grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {t.steps.map((s, i) => (
          <li key={s} className={`border-t-2 pt-2 ${i <= step ? "border-brand-700 font-semibold text-ink" : "border-line text-muted"}`}>
            <span className="mr-1">{i + 1}.</span>
            {s}
          </li>
        ))}
      </ol>

      {cancelled && step === 0 && <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{t.cancelled}</p>}
      {state.status === "error" && state.message && (
        <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      {/* 1. Besoin */}
      <div hidden={step !== 0} className="space-y-6">
        <fieldset>
          <legend className="font-display text-xl font-medium text-ink">{t.chooseKind}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["appel", "accompagnement"] as const).map((k) => (
              <button key={k} type="button" onClick={() => setKind(k)} aria-pressed={kind === k} className={card(kind === k)}>
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-brand-700">
                  {k === "appel" ? <Phone className="h-4 w-4" aria-hidden="true" /> : <CalendarDays className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{k === "appel" ? t.call : t.support}</span>
                  <span className="mt-0.5 block text-sm text-muted">{k === "appel" ? t.callText : t.supportText}</span>
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>{kind === "appel" ? t.categoryOptional : t.category}</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={categoryId === c.id}
                onClick={() => {
                  setCategoryId(categoryId === c.id && kind === "appel" ? "" : c.id);
                  setServiceId("");
                }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                  categoryId === c.id ? "border-brand-700 bg-brand-50 font-semibold text-brand-800" : "border-line text-ink hover:border-brand-200"
                }`}
              >
                <CategoryIcon icon={c.icon} className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 leading-tight">{c.name}</span>
              </button>
            ))}
          </div>
          {e("categorie") && <p className="mt-1 text-sm text-red-700">{e("categorie")}</p>}
        </fieldset>

        {category && categoryServices.length > 0 && (
          <fieldset>
            <legend className={label}>{t.service}</legend>
            {kind === "accompagnement" && !isBusiness && <p className="mt-1 text-sm text-accent-700">{t.allIncluded}</p>}
            <ul className="mt-2 space-y-2">
              {categoryServices.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => setServiceId(s.id)} aria-pressed={serviceId === s.id} className={card(serviceId === s.id)}>
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${serviceId === s.id ? "border-brand-700 bg-brand-700 text-white" : "border-line"}`}
                    >
                      {serviceId === s.id && <Check className="h-3 w-3" aria-hidden="true" />}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{s.question}</span>
                      {serviceId === s.id && s.description && <span className="mt-1.5 block text-sm text-ink">{s.description}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {e("service") && <p className="mt-1 text-sm text-red-700">{e("service")}</p>}
          </fieldset>
        )}

        {kind === "accompagnement" && isBusiness && <p className="rounded-xl bg-surface px-4 py-3 text-sm text-ink">{t.businessNote}</p>}

        <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
          <span className="text-sm text-muted">{kind === "appel" ? t.free : category ? formatCategoryPrice(category, locale) : ""}</span>
          <button
            type="button"
            disabled={!canStep1}
            onClick={() => setStep(1)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800 disabled:opacity-40"
          >
            {t.next} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 2. Créneau */}
      <div hidden={step !== 1} className="space-y-6">
        <div>
          <h2 className="font-display text-xl font-medium text-ink">{t.slotTitle}</h2>
          <p className="text-sm text-muted">{t.parisTime}</p>
        </div>
        {days.length === 0 ? (
          <p className="text-sm text-muted">{t.noSlots}</p>
        ) : (
          <>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {days.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => {
                    setDay(d.date);
                    setSlot("");
                  }}
                  aria-pressed={day === d.date}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-sm capitalize ${day === d.date ? "border-brand-700 bg-brand-700 text-white" : "border-line text-ink hover:border-brand-200"}`}
                >
                  {fmtDay(d.date)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {daySlots.map((iso) => (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSlot(iso)}
                  aria-pressed={slot === iso}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${slot === iso ? "border-brand-700 bg-brand-50 text-brand-800" : "border-line text-ink hover:border-brand-200"}`}
                >
                  {fmtTime(iso)}
                </button>
              ))}
            </div>
          </>
        )}
        {e("slot") && <p className="text-sm text-red-700">{e("slot")}</p>}
        <fieldset>
          <legend className={label}>{t.mode}</legend>
          <div className="mt-2 flex gap-2">
            {(["visio", "telephone"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${mode === m ? "border-brand-700 bg-brand-50 font-semibold text-brand-800" : "border-line text-ink"}`}
              >
                {m === "visio" ? <Video className="h-4 w-4" aria-hidden="true" /> : <Phone className="h-4 w-4" aria-hidden="true" />}
                {m === "visio" ? t.visio : t.phone}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
          <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.back}
          </button>
          <button
            type="button"
            disabled={!slot}
            onClick={() => setStep(2)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800 disabled:opacity-40"
          >
            {t.next} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 3. Questionnaire + récapitulatif */}
      <div hidden={step !== 2} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text key={`name-${state.values ? "r" : "i"}-${pending}`} value={state.values?.name} name="name" label={t.name} error={e("name")} autoComplete="name" max={80} />
          <Text key={`email-${state.values ? "r" : "i"}-${pending}`} value={state.values?.email} name="email" label={t.email} error={e("email")} autoComplete="email" type="email" max={160} />
          <Text key={`phone-${state.values ? "r" : "i"}-${pending}`} value={state.values?.phone} name="phone" label={`${t.tel} (${t.optional})`} error={e("phone")} autoComplete="tel" type="tel" max={24} />
          {kind === "accompagnement" && <Text key={`country-${state.values ? "r" : "i"}-${pending}`} value={state.values?.country} name="country" label={t.country} error={e("country")} autoComplete="country-name" max={80} />}
        </div>
        {kind === "accompagnement" && <Area key={`situation-${state.values ? "r" : "i"}-${pending}`} value={state.values?.situation} name="situation" label={t.situation} hint={t.situationHint} error={e("situation")} max={1000} rows={2} />}
        <Area key={`need-${state.values ? "r" : "i"}-${pending}`} value={state.values?.need} name="need" label={t.need} hint={t.needHint} error={e("need")} max={2000} rows={3} />
        {kind === "accompagnement" && (
          <>
            <Area key={`goal-${state.values ? "r" : "i"}-${pending}`} value={state.values?.goal} name="goal" label={t.goal} error={e("goal")} max={1000} rows={2} />
            <Area key={`extra-${state.values ? "r" : "i"}-${pending}`} value={state.values?.extra} name="extra" label={`${t.extra} (${t.optional})`} error={e("extra")} max={1000} rows={2} />
          </>
        )}
        <p className="text-xs text-muted">{t.privacy}</p>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-brand-700" />
          <span>
            {t.consent}{" "}
            <Link href={href("/confidentialite", locale)} className="font-medium text-brand-700 underline">
              {t.privacyLink}
            </Link>
          </span>
        </label>
        {e("consent") && <p className="text-sm text-red-700">{e("consent")}</p>}

        <div className="rounded-card bg-surface p-4 text-sm">
          <p className="font-semibold text-ink">{t.summary}</p>
          <ul className="mt-2 space-y-1 text-ink">
            <li>{kind === "appel" ? t.call : `${category?.name ?? ""} — ${service?.name ?? ""}`}</li>
            {slot && (
              <li>
                {fmtFull(slot)} · {mode === "visio" ? t.visio : t.phone}
              </li>
            )}
            <li className="font-semibold">{paid && category ? formatCategoryPrice(category, locale) : t.free}</li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
          <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t.back}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {paid && <Lock className="h-4 w-4" aria-hidden="true" />}
            {pending ? t.sending : paid ? t.pay : t.confirm}
          </button>
        </div>
        {paid && <p className="text-center text-xs text-muted">{t.secure}</p>}
      </div>
    </form>
  );
}

function Text({ name, label: l, error, autoComplete, type = "text", max, value }: { name: string; label: string; error?: string; autoComplete?: string; type?: string; max: number; value?: string }) {
  return (
    <div>
      <label htmlFor={`b-${name}`} className={label}>
        {l}
      </label>
      <input id={`b-${name}`} name={name} type={type} autoComplete={autoComplete} maxLength={max} defaultValue={value} aria-invalid={error ? true : undefined} className={inputClasses} />
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function Area({ name, label: l, hint, error, max, rows, value }: { name: string; label: string; hint?: string; error?: string; max: number; rows: number; value?: string }) {
  return (
    <div>
      <label htmlFor={`b-${name}`} className={label}>
        {l}
      </label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <textarea id={`b-${name}`} name={name} rows={rows} maxLength={max} defaultValue={value} aria-invalid={error ? true : undefined} className={inputClasses} />
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
