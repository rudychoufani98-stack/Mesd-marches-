import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { alternates, type Locale } from "@/i18n";
import { getOffers, getPublishedGuideSlugs } from "@/lib/data/content";
import { PlanBuilder } from "@/components/plan/PlanBuilder";
import { Container, PageHeader } from "@/components/ui/primitives";

const copy = {
  fr: {
    metaTitle: "Créer mon plan d'action",
    metaDescription:
      "Répondez à 5 questions et obtenez un plan d'action organisé pour vos démarches en France : tâches, documents à préparer et sources officielles.",
    eyebrow: "Plan d'action gratuit",
    title: "Organisez vos démarches en 5 questions",
    description:
      "Décrivez votre situation en quelques clics et obtenez une liste de tâches dans un ordre logique, avec les documents à préparer et les liens officiels.",
    privacy: "Aucun document ni numéro personnel n'est demandé. Vos réponses restent sur votre appareil.",
  },
  en: {
    metaTitle: "Create my action plan",
    metaDescription:
      "Answer 5 questions and get an organised action plan for your procedures in France: tasks, documents to prepare and official sources.",
    eyebrow: "Free action plan",
    title: "Organise your paperwork in 5 questions",
    description:
      "Describe your situation in a few clicks and get a list of tasks in a logical order, with the documents to prepare and official links.",
    privacy: "No documents or personal numbers are requested. Your answers stay on your device.",
  },
};

export function planMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/plan-action", locale) };
}

export async function PlanView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [offers, publishedGuideSlugs] = await Promise.all([getOffers(locale), getPublishedGuideSlugs(locale)]);
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description}>
        <p className="mt-5 inline-flex items-start gap-2 text-sm text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
          {c.privacy}
        </p>
      </PageHeader>
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <PlanBuilder offers={offers} publishedGuideSlugs={publishedGuideSlugs} locale={locale} />
        </div>
      </Container>
    </>
  );
}
