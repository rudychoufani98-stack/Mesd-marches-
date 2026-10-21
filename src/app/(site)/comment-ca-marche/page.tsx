import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Décrivez votre situation, recevez un plan d'action organisé et avancez étape par étape. Découvrez la méthode MesDémarches et ses limites.",
  alternates: { canonical: "/comment-ca-marche" },
};

const steps = [
  {
    title: "Vous décrivez votre situation",
    text: "Cinq questions simples : votre objectif, depuis combien de temps vous êtes en France, les domaines concernés, votre délai et la façon dont vous souhaitez avancer. Aucun document, aucun numéro personnel.",
  },
  {
    title: "Vous recevez un plan d'action organisé",
    text: "Des règles d'organisation définies à l'avance sélectionnent les tâches pertinentes et les classent dans un ordre logique : d'abord ce qui conditionne la suite, puis la mise en place, puis l'organisation dans la durée. Chaque tâche indique pourquoi elle vous est proposée.",
  },
  {
    title: "Vous avancez étape par étape",
    text: "Cochez les tâches au fur et à mesure, consultez les guides pratiques et les sources officielles. Votre progression est conservée sur votre appareil.",
  },
  {
    title: "Si vous le souhaitez, un accompagnement humain",
    text: "Un rendez-vous permet de faire le point, d'ajuster votre plan et de répondre à vos questions d'organisation.",
  },
];

const weDo = [
  "Vous aider à lister et prioriser vos démarches",
  "Expliquer les notions et le vocabulaire administratif",
  "Vous orienter vers les sites officiels qui font référence",
  "Vous aider à préparer et classer vos documents",
];

const weDont = [
  "Réaliser les démarches à votre place",
  "Représenter une administration ou parler en son nom",
  "Fournir un conseil juridique, fiscal ou financier personnalisé",
  "Garantir le résultat d'une démarche",
  "Vous demander vos mots de passe ou codes d'accès",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="Comment ça marche" title="Une méthode simple pour avancer sereinement" description={siteConfig.promise} />
      <Container className="py-12 sm:py-16">
        <ol className="relative space-y-8 border-l-2 border-brand-100 pl-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[2.85rem] inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <h2 className="text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <section className="rounded-card border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Ce que nous faisons</h2>
            <ul className="mt-4 space-y-3">
              {weDo.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-card border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Ce que nous ne faisons pas</h2>
            <ul className="mt-4 space-y-3">
              {weDont.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-8 text-sm text-muted">
          Besoin d&apos;un accompagnement public et gratuit ? Les espaces France services accueillent le public pour de
          nombreuses démarches.
        </p>

        <div className="mt-12 text-center">
          <ButtonLink href="/plan-action" size="lg">
            Créer mon plan d&apos;action <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
