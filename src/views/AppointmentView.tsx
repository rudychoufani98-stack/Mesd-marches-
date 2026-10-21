import type { Metadata } from "next";
import { Suspense } from "react";
import { alternates, type Locale } from "@/i18n";
import { getOffers } from "@/lib/data/content";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Container, PageHeader } from "@/components/ui/primitives";

const copy = {
  fr: {
    title: "Demander un rendez-vous",
    metaDescription: "Demandez un rendez-vous d'accompagnement en visio ou par téléphone. Sans engagement, aucun paiement en ligne.",
    eyebrow: "Accompagnement",
    description: "Un échange en visio ou par téléphone pour faire le point sur vos démarches et organiser les prochaines étapes.",
    howTitle: "Comment ça se passe ?",
    steps: [
      "Vous envoyez votre demande avec vos disponibilités.",
      "Nous vous proposons un créneau par e-mail sous 2 jours ouvrés.",
      "Vous confirmez le créneau et les modalités avant toute facturation.",
    ],
    note: "Nous ne réalisons pas les démarches à votre place et ne vous demanderons jamais vos identifiants d'accès aux sites administratifs.",
  },
  en: {
    title: "Book an appointment",
    metaDescription: "Request a support appointment by video call or phone. No commitment, no online payment.",
    eyebrow: "Personal support",
    description: "A video or phone call to review your procedures and organise the next steps. Appointments can be held in English.",
    howTitle: "How does it work?",
    steps: [
      "You send your request with your availability.",
      "We suggest a time slot by email within 2 working days.",
      "You confirm the time slot and terms before any invoicing.",
    ],
    note: "We don't carry out procedures on your behalf and we will never ask for your login details for administrative websites.",
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function appointmentMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.title, description: c.metaDescription, alternates: alternates("/rendez-vous", locale) };
}

async function FormWithOffer({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const sp = await searchParams;
  const offers = await getOffers(locale);
  const offer = typeof sp.offre === "string" ? offers.find((o) => o.id === sp.offre) : undefined;
  const fallback = offers.find((o) => o.kind === "decouverte")?.id;
  const selectionIds = typeof sp.offres === "string" ? sp.offres.split(",").filter(Boolean).slice(0, 20) : [];
  return <AppointmentForm offers={offers} defaultOffer={offer?.id ?? fallback} selectionIds={selectionIds} locale={locale} />;
}

export function AppointmentView({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = copy[locale];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-surface" />}>
          <FormWithOffer locale={locale} searchParams={searchParams} />
        </Suspense>
        <aside className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-semibold text-ink">{c.howTitle}</h2>
          <ol className="mt-4 space-y-4">
            {c.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm text-muted">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">{c.note}</p>
        </aside>
      </Container>
    </>
  );
}
