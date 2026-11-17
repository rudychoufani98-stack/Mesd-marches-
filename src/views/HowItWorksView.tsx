import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { alternates, href, type Locale } from "@/i18n";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

const PATH = "/comment-ca-marche";

const copy = {
  fr: {
    title: "Comment ça marche",
    metaDescription:
      "Un appel offert, un dossier préparé avec votre conseiller, un suivi jusqu'au bout : la méthode MesDémarches pour réussir vos démarches en France.",
    heading: "Votre conseiller vous accompagne, du premier appel à la dernière démarche",
    promise: "Une méthode simple, pensée pour les étrangers et les expatriés : vous savez quoi faire, votre dossier est prêt, vous avancez.",
    steps: [
      {
        title: "L'appel offert",
        text: "15 minutes par téléphone ou en visio. Vous nous expliquez votre situation, on identifie ensemble ce qui est urgent et ce qu'il faut faire en premier.",
      },
      {
        title: "Votre dossier, préparé avec vous",
        text: "Liste de pièces personnalisée, ordre des étapes, relecture de chaque document : tout est prêt avant le dépôt.",
      },
      {
        title: "Vous avancez, accompagné·e",
        text: "Chaque étape est claire. Votre conseiller répond à vos questions et reste à vos côtés jusqu'au bout de la démarche.",
      },
    ],
    weDoTitle: "Avec votre conseiller",
    weDo: [
      "Un interlocuteur unique, en français ou en anglais",
      "Vos démarches prioritaires identifiées dès le premier appel",
      "Un dossier complet, relu avant chaque envoi",
      "Des réponses rapides à toutes vos questions",
      "Une préparation à vos rendez-vous (préfecture, banque, propriétaire…)",
      "Un prix fixe, connu dès le départ",
    ],
    cta: "Réserver mon appel offert",
  },
  en: {
    title: "How it works",
    metaDescription:
      "A free call, a file prepared with your advisor, support all the way: the MesDémarches method for getting your French paperwork done.",
    heading: "Your advisor supports you, from the first call to the last step",
    promise: "A simple method designed for foreigners and expats: you know what to do, your file is ready, you move forward.",
    steps: [
      {
        title: "The free call",
        text: "15 minutes by phone or video. You tell us about your situation, and together we identify what is urgent and what to do first.",
      },
      {
        title: "Your file, prepared with you",
        text: "A personalised document list, the order of steps, a review of every document: everything is ready before you submit.",
      },
      {
        title: "You move forward, supported",
        text: "Every step is clear. Your advisor answers your questions and stays by your side until the procedure is done.",
      },
    ],
    weDoTitle: "With your advisor",
    weDo: [
      "One point of contact, in English or French",
      "Your priority procedures identified from the first call",
      "A complete file, reviewed before anything is sent",
      "Quick answers to all your questions",
      "Preparation for your appointments (prefecture, bank, landlord…)",
      "A fixed price, known from the start",
    ],
    cta: "Book my free call",
  },
};

export function howItWorksMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function HowItWorksView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const stepLabel = locale === "en" ? "Step" : "Étape";
  return (
    <>
      <PageHeader eyebrow={t.title} title={t.heading} description={t.promise} />
      <Container className="py-16 sm:py-20">
        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {t.steps.map((s, i) => (
            <li key={s.title} className="border-t border-ink/25 pt-6">
              <p className="text-sm font-medium text-brand-700">
                {stepLabel} {i + 1}
              </p>
              <h2 className="mt-3 font-display text-[1.3rem] font-semibold leading-tight text-ink">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-20 rounded-md bg-brand-950 p-8 text-white sm:p-12">
          <h2 className="font-display text-[1.7rem] font-semibold leading-tight">{t.weDoTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.weDo.map((i) => (
              <li key={i} className="flex gap-3 text-brand-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" aria-hidden="true" /> {i}
              </li>
            ))}
          </ul>
          <ButtonLink href={`${href("/rendez-vous", locale)}?mode=appel`} size="lg" variant="light" className="mt-9">
            {t.cta}
          </ButtonLink>
        </section>
      </Container>
    </>
  );
}
