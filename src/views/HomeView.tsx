import type { Metadata } from "next";
import Link from "next/link";
import { formatCategoryPrice, formatEuros } from "@/config/catalog";
import { alternates, href, localeTags, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";
import { InstitutionsMarquee } from "@/components/home/InstitutionsMarquee";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { buttonClasses, Container, FaqList } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

const copy = {
  fr: {
    metaTitle: "Aide aux démarches administratives en France pour étrangers et expatriés | MesDémarches",
    metaDescription:
      "Conseiller dédié pour étrangers, expatriés et nouveaux arrivants en France : logement, compte bancaire, Sécurité sociale, CAF, impôts, permis de conduire. Premier appel offert.",
    title: "Vos démarches en France, en toute sérénité",
    subtitle:
      "Un conseiller dédié prend votre dossier en main : il vous dit quoi faire, prépare les pièces avec vous et vous accompagne jusqu'au bout.",
    proofs: ["Conseiller dédié", "Français et anglais", "Réponse sous 48 h"],
    servicesTitle: "Nos domaines d'intervention",
    servicesText: "Un prix fixe par domaine, annoncé avant toute réservation. Il couvre l'ensemble des services du domaine.",
    allPrices: "Voir le détail des services",
    otherTitle: "Votre démarche n'est pas listée ?",
    otherText: "Parlez-en lors de l'appel offert : nous intervenons sur l'ensemble des démarches.",
    otherCta: "Demander un appel",
    methodTitle: "Un accompagnement en trois temps",
    stepLabel: "Étape",
    method: [
      { title: "Un premier échange offert", text: "Quinze minutes pour comprendre votre situation et identifier ce qui est réellement prioritaire." },
      { title: "Votre dossier préparé", text: "Pièces à réunir, ordre des étapes, relecture : votre dossier est prêt, rien n'est laissé au hasard." },
      { title: "Un suivi jusqu'au bout", text: "Chaque étape est claire. Votre conseiller reste votre interlocuteur jusqu'à la fin de l'accompagnement." },
    ],
    commitmentsTitle: "Nos engagements",
    commitmentsText: "Ce qui guide chacun de nos accompagnements.",
    commitments: [
      { title: "Un interlocuteur unique", text: "Le même conseiller, du premier appel à la dernière démarche." },
      { title: "Bilingue", text: "Nous échangeons en français ou en anglais, à votre convenance." },
      { title: "Des prix fixes", text: "Chaque accompagnement a son prix, connu dès le départ." },
      { title: "La confidentialité", text: "Votre dossier et vos données restent strictement confidentiels." },
    ],
    faqTitle: "Questions fréquentes",
    faqText: "Une autre question ? Posez-la lors de l'appel offert.",
    faq: (from: string) => [
      {
        q: "Qu'est-ce que MesDémarches ?",
        a: "Un service de conseil privé qui accompagne les étrangers, expatriés et nouveaux arrivants dans toutes leurs démarches administratives en France.",
      },
      {
        q: "Combien ça coûte ?",
        a: `Le premier appel de 15 minutes est offert. Ensuite, chaque accompagnement a un prix fixe, à partir de ${from}.`,
      },
      {
        q: "Je ne sais pas par où commencer.",
        a: "C'est exactement le rôle de l'appel offert : en 15 minutes, votre conseiller vous dit quoi faire en premier.",
      },
      {
        q: "En combien de temps êtes-vous recontacté·e ?",
        a: "Nous revenons vers vous sous 48 heures ouvrées pour fixer votre appel.",
      },
    ],
    finalTitle: "Parlons de votre situation",
    finalText: "15 minutes offertes, sans engagement. Vous repartez en sachant exactement quoi faire.",
    finalCta: "Réserver mon appel offert",
  },
  en: {
    metaTitle: "Help with French paperwork for foreigners and expats | MesDémarches",
    metaDescription:
      "A dedicated advisor for foreigners, expats and newcomers in France: housing, bank account, health insurance, CAF, taxes, driving licence. Free first call.",
    title: "Your paperwork in France, with complete peace of mind",
    subtitle:
      "A dedicated advisor takes your file in hand: what to do, which documents to prepare, and support until everything is done.",
    proofs: ["Dedicated advisor", "English and French", "Reply within 48 hours"],
    servicesTitle: "Our areas of expertise",
    servicesText: "One fixed price per area, stated before you book. It covers every service in that area.",
    allPrices: "See all services in detail",
    otherTitle: "Your procedure isn't listed?",
    otherText: "Mention it during the free call: we handle every kind of procedure.",
    otherCta: "Request a call",
    methodTitle: "Our approach, in three stages",
    stepLabel: "Step",
    method: [
      { title: "A free first conversation", text: "Fifteen minutes to understand your situation and identify what truly comes first." },
      { title: "Your file, prepared", text: "Documents to gather, order of steps, review: your file is ready, nothing is left to chance." },
      { title: "Support to the end", text: "Every step is clear. Your advisor remains your contact until the end of the engagement." },
    ],
    commitmentsTitle: "Our commitments",
    commitmentsText: "What guides every one of our engagements.",
    commitments: [
      { title: "One point of contact", text: "The same advisor, from the first call to the last step." },
      { title: "Bilingual", text: "We work in English or French, whichever suits you." },
      { title: "Fixed prices", text: "Each service has its price, known from the start." },
      { title: "Confidentiality", text: "Your file and your data stay strictly confidential." },
    ],
    faqTitle: "Frequently asked questions",
    faqText: "Another question? Ask it during the free call.",
    faq: (from: string) => [
      {
        q: "What is MesDémarches?",
        a: "A private advisory service supporting foreigners, expats and newcomers with all their administrative procedures in France.",
      },
      {
        q: "How much does it cost?",
        a: `The first 15-minute call is free. After that, each service has a fixed price, from ${from}.`,
      },
      {
        q: "I don't know where to start.",
        a: "That's exactly what the free call is for: in 15 minutes, your advisor tells you what to do first.",
      },
      {
        q: "How quickly will you get back to me?",
        a: "We get back to you within 2 working days to schedule your call.",
      },
    ],
    finalTitle: "Let's talk about your situation",
    finalText: "15 free minutes, no commitment. You leave knowing exactly what to do.",
    finalCta: "Book my free call",
  },
};

export function homeMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: alternates("/", locale),
    openGraph: { locale: locale === "en" ? "en_GB" : "fr_FR", title: c.metaTitle, description: c.metaDescription },
  };
}

export async function HomeView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const { categories } = await getCatalog(locale);
  const prices = categories.filter((cat) => cat.kind === "particulier").map((cat) => cat.price);
  const from = formatEuros(prices.length ? Math.min(...prices) : 29, locale);
  const faq = c.faq(from);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeTags[locale],
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      {/* Héros : promesse + formulaire de demande d'appel */}
      <section id="demande" className="scroll-mt-20 bg-brand-950 text-white">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <h1 className="font-display text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.025em] sm:text-[2.9rem] lg:text-[3.5rem]">{c.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-100/85">{c.subtitle}</p>
            <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-100/75">
              {c.proofs.map((p, i) => (
                <li key={p} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden="true" className="h-3.5 w-px bg-white/25" />}
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <QuickLeadForm categories={categories} locale={locale} />
        </Container>
      </section>

      <InstitutionsMarquee locale={locale} />

      {/* Domaines d'intervention : présentés comme un barème, prix fixe par domaine */}
      {categories.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="accompagnements">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 id="accompagnements" className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                  {c.servicesTitle}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{c.servicesText}</p>
              </div>
              <Link href={href("/services", locale)} className="text-[15px] font-semibold text-brand-900 underline decoration-brand-300 underline-offset-[6px] transition-colors hover:decoration-brand-900 shrink-0">
                {c.allPrices}
              </Link>
            </div>
            <ul className="mt-12 border-t border-ink/25">
              {categories.map((cat) => (
                <li key={cat.id} className="border-b border-ink/15">
                  <Link
                    href={cat.kind === "business" ? `${href("/services", locale)}#entreprises` : href(`/services/${cat.id}`, locale)}
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 sm:py-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_9rem]"
                  >
                    <span className="font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-brand-700 sm:text-[1.35rem]">
                      {cat.name}
                    </span>
                    <span className="order-3 col-span-2 text-[15px] leading-relaxed text-muted lg:order-none lg:col-span-1">{cat.description}</span>
                    <span className="whitespace-nowrap text-right text-[15px] font-semibold tabular-nums text-ink">
                      {formatCategoryPrice(cat, locale)}
                      <span aria-hidden="true" className="ml-3 inline-block text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-brand-700">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="grid gap-2 border-b border-ink/15 py-6 sm:py-7 lg:items-baseline lg:gap-x-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_9rem]">
                <span className="font-display text-xl font-semibold leading-tight text-ink sm:text-[1.35rem]">{c.otherTitle}</span>
                <span className="text-[15px] leading-relaxed text-muted">{c.otherText}</span>
                <a href="#demande" className="text-[15px] font-semibold text-brand-900 underline decoration-brand-300 underline-offset-[6px] transition-colors hover:decoration-brand-900 lg:text-right">
                  {c.otherCta}
                </a>
              </li>
            </ul>
          </Container>
        </section>
      )}

      {/* Méthode */}
      <section className="border-y border-line bg-surface py-20 sm:py-28" aria-labelledby="methode">
        <Container>
          <h2 id="methode" className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.4rem] max-w-2xl">
            {c.methodTitle}
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {c.method.map((step, i) => (
              <li key={step.title} className="border-t border-ink/25 pt-6">
                <p className="text-sm font-medium text-brand-700">
                  {c.stepLabel} {i + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.3rem] font-semibold leading-tight text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engagements */}
      <section className="py-20 sm:py-28" aria-labelledby="engagements">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 id="engagements" className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
              {c.commitmentsTitle}
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">{c.commitmentsText}</p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {c.commitments.map((item) => (
              <div key={item.title} className="border-t border-ink/25 pt-5">
                <dt className="font-display text-xl font-semibold leading-tight text-ink">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface py-20 sm:py-28" aria-labelledby="faq-accueil">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 id="faq-accueil" className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
              {c.faqTitle}
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">{c.faqText}</p>
          </div>
          <FaqList items={faq} />
        </Container>
      </section>

      {/* Appel final */}
      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">{c.finalTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-100/80">{c.finalText}</p>
          </div>
          <a href="#demande" className={buttonClasses("light", "lg", "shrink-0")}>
            {c.finalCta}
          </a>
        </Container>
      </section>
    </>
  );
}
