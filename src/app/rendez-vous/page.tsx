import type { Metadata } from "next";
import { Suspense } from "react";
import { getOffer } from "@/config/pricing";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Demander un rendez-vous",
  description: "Demandez un rendez-vous d'accompagnement en visio ou par téléphone. Sans engagement, aucun paiement en ligne.",
  alternates: { canonical: "/rendez-vous" },
};

const steps = [
  "Vous envoyez votre demande avec vos disponibilités.",
  "Nous vous proposons un créneau par e-mail sous 2 jours ouvrés.",
  "Vous confirmez le créneau et les modalités avant toute facturation.",
];

async function AppointmentFormWithOffer({ searchParams }: Pick<PageProps<"/rendez-vous">, "searchParams">) {
  const sp = await searchParams;
  const offer = typeof sp.offre === "string" ? getOffer(sp.offre) : undefined;
  return <AppointmentForm defaultOffer={offer?.id} />;
}

export default function AppointmentPage({ searchParams }: PageProps<"/rendez-vous">) {
  return (
    <>
      <PageHeader
        eyebrow="Accompagnement"
        title="Demander un rendez-vous"
        description="Un échange en visio ou par téléphone pour faire le point sur vos démarches et organiser les prochaines étapes."
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-surface" />}>
          <AppointmentFormWithOffer searchParams={searchParams} />
        </Suspense>
        <aside className="rounded-card border border-line bg-surface p-5">
          <h2 className="font-semibold text-ink">Comment ça se passe ?</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm text-muted">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Nous ne réalisons pas les démarches à votre place et ne vous demanderons jamais vos identifiants d&apos;accès aux sites
            administratifs.
          </p>
        </aside>
      </Container>
    </>
  );
}
