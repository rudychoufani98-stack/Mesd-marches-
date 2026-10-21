import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getSources, type SourceId } from "@/content/sources";
import { localizeSource } from "@/content/translations";
import { alternates, type Locale } from "@/i18n";
import { BudgetTool } from "@/components/tools/BudgetTool";
import { Container, PageHeader } from "@/components/ui/primitives";

const PATH = "/outils/budget";
const SOURCE_IDS: readonly SourceId[] = ["mesquestionsdargent", "banque-france"];

const copy = {
  fr: {
    title: "Outil de budget mensuel",
    metaDescription: "Calculez simplement votre reste à vivre mensuel. Gratuit, sans inscription, vos données restent sur votre appareil.",
    eyebrow: "Outil gratuit",
    heading: "Mon budget mensuel",
    description:
      "Listez vos revenus et vos dépenses pour connaître votre reste à vivre. Un outil d'organisation simple, sans conseil financier.",
    further: "Pour aller plus loin",
    newTab: "(ouvre un nouvel onglet)",
  },
  en: {
    title: "Monthly budget tool",
    metaDescription:
      "Easily work out how much money you have left each month. Free, no sign-up, your data stays on your device.",
    eyebrow: "Free tool",
    heading: "My monthly budget",
    description:
      "List your income and expenses to see how much money you have left over. A simple organisation tool, with no financial advice.",
    further: "Find out more",
    newTab: "(opens in a new tab)",
  },
} as const;

export function budgetMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

/** Liste des sources officielles dans la langue de la page (même rendu que SourceList). */
function Sources({ locale }: { locale: Locale }) {
  const sources = getSources(SOURCE_IDS).map((s) => localizeSource(s, locale));
  const newTab = copy[locale].newTab;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {sources.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
          >
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold text-ink group-hover:text-brand-700">{s.name}</span>
              <span className="block text-xs leading-relaxed text-muted">{s.label}</span>
              <span className="sr-only"> {newTab}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BudgetView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.heading} description={t.description} />
      <Container className="py-10 sm:py-14">
        <BudgetTool locale={locale} />
        <section className="mt-12" aria-labelledby="pour-aller-plus-loin">
          <h2 id="pour-aller-plus-loin" className="text-xl font-bold text-ink">
            {t.further}
          </h2>
          <div className="mt-4">
            <Sources locale={locale} />
          </div>
        </section>
      </Container>
    </>
  );
}
