import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, ShieldCheck, Video } from "lucide-react";
import { alternates, href, type Locale } from "@/i18n";
import { getBookingSettings, getCatalog, getTakenSlots } from "@/lib/data/catalog";
import { availableSlots, formatSlot } from "@/lib/booking/slots";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

const copy = {
  fr: {
    title: "Réserver un rendez-vous",
    metaDescription: "Réservez un appel découverte gratuit ou un accompagnement personnalisé : choisissez votre créneau, payez en ligne en toute sécurité.",
    eyebrow: "Réservation",
    description: "Choisissez votre besoin, votre créneau, et c'est réservé. En français ou en anglais, en visio ou par téléphone.",
    reassurance: [
      { icon: CalendarCheck, text: "Créneau confirmé immédiatement" },
      { icon: Video, text: "En visio ou par téléphone" },
      { icon: ShieldCheck, text: "Paiement sécurisé, données confidentielles" },
    ],
    confirmedTitle: "Votre appel est réservé",
    confirmedText: "Votre conseiller vous contactera",
    byVideo: "en visio (le lien vous est envoyé par e-mail)",
    byPhone: "par téléphone",
    confirmedNote: "Un empêchement ? Répondez simplement à notre e-mail ou écrivez-nous via la page Contact.",
    home: "Retour à l'accueil",
  },
  en: {
    title: "Book an appointment",
    metaDescription: "Book a free discovery call or a personal support session: choose your time slot and pay securely online.",
    eyebrow: "Booking",
    description: "Choose your need and your time slot, and it's booked. In English or French, by video or phone.",
    reassurance: [
      { icon: CalendarCheck, text: "Time slot confirmed instantly" },
      { icon: Video, text: "By video or phone" },
      { icon: ShieldCheck, text: "Secure payment, confidential data" },
    ],
    confirmedTitle: "Your call is booked",
    confirmedText: "Your advisor will contact you",
    byVideo: "by video (the link will be sent by email)",
    byPhone: "by phone",
    confirmedNote: "Can't make it? Simply reply to our email or write to us via the Contact page.",
    home: "Back to home",
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function appointmentMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.title, description: c.metaDescription, alternates: alternates("/rendez-vous", locale) };
}

async function Booking({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  await connection();
  const sp = await searchParams;
  const [catalog, settings] = await Promise.all([getCatalog(locale), getBookingSettings()]);
  const now = new Date();
  const taken = await getTakenSlots(now, new Date(now.getTime() + (settings.horizonDays + 2) * 86400_000));
  const days = availableSlots(settings, now, taken);
  const str = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const categorie = catalog.categories.some((c) => c.id === str("categorie")) ? str("categorie") : undefined;
  const service = catalog.services.some((s) => s.id === str("service") && s.categoryId === categorie) ? str("service") : undefined;
  const kind = str("mode") === "appel" ? "appel" : str("mode") === "accompagnement" || service ? "accompagnement" : undefined;
  return (
    <BookingFlow
      locale={locale}
      categories={catalog.categories}
      services={catalog.services}
      days={days}
      initial={{ kind, categorie, service }}
      cancelled={str("annule") === "1"}
    />
  );
}

export function AppointmentView({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = copy[locale];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Container className="py-10 sm:py-14">
        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
          {c.reassurance.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent-600" aria-hidden="true" /> {text}
            </li>
          ))}
        </ul>
        <Suspense fallback={<div className="h-[32rem] animate-pulse rounded-[1.5rem] bg-surface" />}>
          <Booking locale={locale} searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

/* ---------------------------------------------- /rendez-vous/confirmation */

export function bookingConfirmationMetadata(locale: Locale): Metadata {
  return { title: copy[locale].confirmedTitle, robots: { index: false, follow: false } };
}

async function Confirmation({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = copy[locale];
  const sp = await searchParams;
  const d = typeof sp.d === "string" && !Number.isNaN(Date.parse(sp.d)) ? sp.d : null;
  return (
    <div className="mx-auto max-w-lg rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-sm">
      <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-medium text-ink">{c.confirmedTitle}</h1>
      {d && (
        <p className="mt-3 text-lg text-ink">
          {c.confirmedText} <strong>{formatSlot(d, locale)}</strong> {sp.mode === "telephone" ? c.byPhone : c.byVideo}.
        </p>
      )}
      <p className="mt-3 text-sm text-muted">{c.confirmedNote}</p>
      <ButtonLink href={href("/", locale)} variant="secondary" className="mt-6">
        {c.home}
      </ButtonLink>
      <p className="mt-4 text-xs text-muted">
        <Link href={href("/services", locale)} className="underline">
          MesDémarches
        </Link>
      </p>
    </div>
  );
}

export function BookingConfirmationView({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  return (
    <Container className="py-14 sm:py-20">
      <Suspense fallback={<div className="mx-auto h-72 max-w-lg animate-pulse rounded-[1.5rem] bg-surface" />}>
        <Confirmation locale={locale} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
