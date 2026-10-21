import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { alternates, href, type Locale } from "@/i18n";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

const PATH = "/comment-ca-marche";

const copy = {
  fr: {
    title: "Comment ça marche",
    metaDescription:
      "Décrivez votre situation, recevez un plan d'action organisé et avancez étape par étape. Découvrez la méthode MesDémarches et ses limites.",
    heading: "Une méthode simple pour avancer sereinement",
    promise: siteConfig.promise,
    steps: [
      {
        emoji: "💬",
        title: "Vous décrivez votre situation",
        text: "Cinq questions simples : votre objectif, depuis combien de temps vous êtes en France, les domaines concernés, votre délai et la façon dont vous souhaitez avancer. Aucun document, aucun numéro personnel.",
      },
      {
        emoji: "🗺️",
        title: "Vous recevez un plan d'action organisé",
        text: "Des règles d'organisation définies à l'avance sélectionnent les tâches pertinentes et les classent dans un ordre logique : d'abord ce qui conditionne la suite, puis la mise en place, puis l'organisation dans la durée. Chaque tâche indique pourquoi elle vous est proposée.",
      },
      {
        emoji: "✅",
        title: "Vous avancez étape par étape",
        text: "Cochez les tâches au fur et à mesure, consultez les guides pratiques et les sources officielles. Votre progression est conservée sur votre appareil.",
      },
      {
        emoji: "🙋",
        title: "Si vous le souhaitez, un accompagnement humain",
        text: "Un rendez-vous permet de faire le point, d'ajuster votre plan et de répondre à vos questions d'organisation.",
      },
    ],
    weDoTitle: "Ce que nous faisons",
    weDo: [
      "Vous aider à lister et prioriser vos démarches",
      "Expliquer les notions et le vocabulaire administratif",
      "Vous orienter vers les sites officiels qui font référence",
      "Vous aider à préparer et classer vos documents",
      "Vous aider à préparer vos rendez-vous (banque, notaire, propriétaire…) et les questions à poser",
    ],
    weDontTitle: "Ce que nous ne faisons pas",
    weDont: [
      "Réaliser les démarches à votre place",
      "Représenter une administration ou parler en son nom",
      "Fournir un conseil juridique, fiscal ou financier personnalisé",
      "Garantir le résultat d'une démarche",
      "Vous recommander un crédit, une banque ou un produit financier",
      "Vous demander vos mots de passe ou codes d'accès",
    ],
    publicHelp:
      "Besoin d'un accompagnement public et gratuit ? Les espaces France services accueillent le public pour de nombreuses démarches.",
    cta: "Créer mon plan d'action",
  },
  en: {
    title: "How it works",
    metaDescription:
      "Describe your situation, receive an organised action plan and move forward step by step. Discover the MesDémarches method and its limits.",
    heading: "A simple method to move forward with peace of mind",
    promise: "We help you organise your procedures in France, understand the steps and move forward at your own pace.",
    steps: [
      {
        emoji: "💬",
        title: "You describe your situation",
        text: "Five simple questions: your goal, how long you have been in France, the areas concerned, your timeframe and how you would like to proceed. No documents, no personal numbers.",
      },
      {
        emoji: "🗺️",
        title: "You receive an organised action plan",
        text: "Organisation rules defined in advance select the relevant tasks and put them in a logical order: first what everything else depends on, then getting set up, then longer-term organisation. Each task explains why it is suggested to you.",
      },
      {
        emoji: "✅",
        title: "You move forward step by step",
        text: "Tick off tasks as you go and consult the practical guides and official sources. Your progress is kept on your device.",
      },
      {
        emoji: "🙋",
        title: "If you wish, support from a person",
        text: "An appointment lets you take stock, adjust your plan and get answers to your questions about getting organised.",
      },
    ],
    weDoTitle: "What we do",
    weDo: [
      "Help you list and prioritise your procedures",
      "Explain administrative concepts and vocabulary",
      "Direct you to the authoritative official websites",
      "Help you prepare and file your documents",
      "Help you prepare for your appointments (bank, notary, landlord…) and the questions to ask",
    ],
    weDontTitle: "What we don't do",
    weDont: [
      "Carry out procedures on your behalf",
      "Represent a government body or speak on its behalf",
      "Provide personalised legal, tax or financial advice",
      "Guarantee the outcome of a procedure",
      "Recommend a loan, a bank or a financial product to you",
      "Ask for your passwords or access codes",
    ],
    publicHelp: "Need free public support? France services centres welcome the public for many procedures.",
    cta: "Create my action plan",
  },
};

export function howItWorksMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function HowItWorksView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHeader eyebrow={t.title} title={t.heading} description={t.promise} />
      <Container className="py-12 sm:py-16">
        <ol className="relative space-y-8 border-l-2 border-brand-100 pl-8">
          {t.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[2.85rem] inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <h2 className="text-xl font-bold text-ink">
                <span aria-hidden="true" className="mr-2">
                  {s.emoji}
                </span>
                {s.title}
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <section className="rounded-card border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">
              <span aria-hidden="true">👍</span> {t.weDoTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {t.weDo.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-card border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">
              <span aria-hidden="true">✋</span> {t.weDontTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {t.weDont.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-8 text-sm text-muted">{t.publicHelp}</p>

        <div className="mt-12 text-center">
          <ButtonLink href={href("/plan-action", locale)} size="lg">
            {t.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
