import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { formatEuros, type CatalogCategory } from "@/config/catalog";
import { getCatalog } from "@/lib/data/catalog";
import { alternates, href, type Locale } from "@/i18n";
import { Container, PageHeader } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

const PATH = "/faq";

const copy = {
  fr: {
    title: "Questions fréquentes",
    metaDescription: "Les réponses aux questions les plus fréquentes sur MesDémarches : service, tarifs, données personnelles.",
    eyebrow: "FAQ",
    notFound: "Vous n'avez pas trouvé votre réponse ?",
    contact: "Contactez-nous",
  },
  en: {
    title: "Frequently asked questions",
    metaDescription: "Answers to the most frequently asked questions about MesDémarches: service, pricing, personal data.",
    eyebrow: "FAQ",
    notFound: "Didn't find your answer?",
    contact: "Contact us",
  },
} as const;

const linkClass = "font-medium text-brand-700 underline";

type Faq = { q: string; a: ReactNode; text: string };

function buildFaqs(categories: CatalogCategory[], locale: Locale): Faq[] {
  const prices = categories.filter((c) => c.kind === "particulier").map((c) => c.price);
  const from = prices.length ? `${formatEuros(Math.min(...prices), locale)}–${formatEuros(Math.max(...prices), locale)}` : "";
  const offerList =
    locale === "en"
      ? `a free 15-minute discovery call, then one fixed price per category${from ? ` (${from})` : ""}, and a dedicated offer for companies`
      : `un appel découverte offert de 15 minutes, puis un prix fixe par catégorie${from ? ` (${from})` : ""}, ainsi qu'une offre dédiée aux entreprises`;
  const pricingLink = (label: string) => (
    <Link href={href("/tarifs", locale)} className={linkClass}>
      {label}
    </Link>
  );
  const plain = (text: string): Faq["a"] => <>{text}</>;
  const faq = (q: string, text: string, a?: ReactNode): Faq => ({ q, text, a: a ?? plain(text) });

  if (locale === "en") {
    return [
      faq("What is MesDémarches?", "A private advisory service: a dedicated advisor supports foreigners, expats and newcomers with all their administrative procedures in France."),
      faq("How much does it cost?", `We offer ${offerList}.`, <>We offer {offerList}. See the {pricingLink("Pricing page")}.</>),
      faq("How does the support work?", "It starts with a free 15-minute call. Your advisor then prepares your file with you (documents, order of steps, review) and stays available until the procedure is done."),
      faq("Can you help with my residence permit or naturalisation?", "Yes. We prepare your residence permit or naturalisation file with you: documents, translations, online submission and interview preparation."),
      faq("I don't speak French well. Is that a problem?", "Not at all. All our support is available in English as well as French."),
      faq("I don't live in Paris, or I haven't arrived in France yet.", "No problem: everything happens by phone or video, wherever you are in France or abroad."),
      faq("Is my data protected?", "Yes. Your file stays strictly confidential, your data is never sold, and we never ask for your passwords."),
    ];
  }

  return [
    faq("Qu'est-ce que MesDémarches ?", "Un service de conseil privé : un conseiller dédié accompagne les étrangers, expatriés et nouveaux arrivants dans toutes leurs démarches administratives en France."),
    faq("Combien ça coûte ?", `Nous proposons ${offerList}.`, <>Nous proposons {offerList}. Voir la {pricingLink("page Tarifs")}.</>),
    faq("Comment se passe l'accompagnement ?", "Tout commence par un appel offert de 15 minutes. Votre conseiller prépare ensuite votre dossier avec vous (pièces, ordre des étapes, relecture) et reste disponible jusqu'au bout de la démarche."),
    faq("Pouvez-vous m'aider pour mon titre de séjour ou ma naturalisation ?", "Oui. Nous préparons avec vous votre dossier de titre de séjour ou de naturalisation : pièces, traductions, dépôt en ligne et préparation à l'entretien."),
    faq("Je ne parle pas bien français, est-ce un problème ?", "Pas du tout. Tout l'accompagnement est possible en anglais comme en français."),
    faq("Je n'habite pas à Paris, ou je ne suis pas encore arrivé·e en France.", "Aucun souci : tout se fait par téléphone ou en visio, où que vous soyez en France ou à l'étranger."),
    faq("Mes données sont-elles protégées ?", "Oui. Votre dossier reste strictement confidentiel, vos données ne sont jamais vendues et nous ne vous demandons jamais vos mots de passe."),
  ];
}

export function faqMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export async function FaqView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const faqs = buildFaqs((await getCatalog(locale)).categories, locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "en" ? "en-GB" : "fr-FR",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.text } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <PageHeader eyebrow={t.eyebrow} title={t.title} />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl divide-y divide-line rounded-card border border-line bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                <h2 className="text-base">{f.q}</h2>
                <span className="text-xl text-brand-700 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          {t.notFound}{" "}
          <Link href={href("/contact", locale)} className={linkClass}>
            {t.contact}
          </Link>
        </p>
      </Container>
    </>
  );
}
