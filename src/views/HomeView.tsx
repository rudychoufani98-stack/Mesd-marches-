import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice, lowestDemarchePrice } from "@/config/pricing";
import { categories, getCategory } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, getDictionary, href, localeTags, type Locale } from "@/i18n";
import { getActiveDomains, getOffers, getPublishedGuides } from "@/lib/data/content";
import { CategoryCard } from "@/components/home/CategoryCard";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { GuideCard } from "@/components/guides/shared";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

/** Guides mis en avant sur l'accueil (les plus recherchés par les nouveaux arrivants). */
const FEATURED_GUIDES = [
  "premieres-demarches-installation",
  "preparer-dossier-locatif",
  "comprendre-ouverture-compte-bancaire",
  "s-orienter-protection-sociale",
  "permis-de-conduire-etranger",
  "preparer-sa-declaration-de-revenus",
];

const copy = {
  fr: {
    metaTitle: "Aide aux démarches administratives en France pour étrangers et expatriés | MesDémarches",
    metaDescription:
      "Perdu dans la paperasse française ? MesDémarches guide les étrangers, expatriés et nouveaux arrivants : logement, compte bancaire, Sécurité sociale, CAF, impôts, permis de conduire. Premier appel gratuit, puis dès 15 € la démarche.",
    badge: "Étrangers, expatriés, nouveaux arrivants : on est là pour vous",
    title: "Perdu dans les démarches en France ? ",
    titleAccent: "On vous guide, pas à pas.",
    subtitle:
      "Logement, banque, Sécurité sociale, CAF, impôts, permis de conduire… Un conseiller vous explique quoi faire, dans quel ordre, et prépare chaque démarche avec vous.",
    chipsLabel: "En bref",
    chips: (from: string) => [
      { emoji: "🎁", label: "Premier appel gratuit" },
      { emoji: "💶", label: `Dès ${from} la démarche` },
      { emoji: "💬", label: "En français ou en anglais" },
      { emoji: "🔒", label: "Vos données protégées" },
    ],
    cta: "Réserver mon appel gratuit",
    ctaSecondary: "Faire mon plan gratuit",
    stepsTitle: "Les démarches qu'on prépare avec vous",
    stepsText: "Choisissez ce qui vous bloque : on vous aide à le régler, à prix fixe.",
    seeAll: "Voir tous les tarifs",
    howEyebrow: "Comment ça marche ?",
    howTitle: "Simple comme un coup de fil",
    stepLabel: "Étape",
    how: [
      { emoji: "📞", title: "Un appel gratuit de 15 min", text: "Vous nous racontez votre situation. On identifie ensemble ce qui est urgent." },
      { emoji: "🗂️", title: "On prépare votre démarche", text: "Liste des documents, étapes dans l'ordre, relecture : vous savez exactement quoi faire." },
      { emoji: "✅", title: "Vous avancez sereinement", text: "Vous faites la démarche sur le site officiel, en confiance. On reste là pour vos questions." },
    ],
    guidesTitle: "Nos guides gratuits pour s'installer en France",
    guidesText: "Des explications simples et les liens vers les sites officiels, pour avancer seul·e si vous préférez.",
    allGuides: "Tous les guides",
    domainsTitle: "Toutes les démarches, par thème",
    discover: "Découvrir",
    faqTitle: "Questions fréquentes",
    faq: (from: string) => [
      {
        q: "Qu'est-ce que MesDémarches ?",
        a: "Un service d'accompagnement qui aide les étrangers, expatriés et nouveaux arrivants à comprendre et organiser leurs démarches administratives en France. C'est un service privé, pas un site officiel de l'administration.",
      },
      {
        q: "Je viens d'arriver en France, par où commencer ?",
        a: "En général : vos documents personnels, un justificatif d'adresse, un compte bancaire et l'Assurance Maladie. Notre plan d'action gratuit vous donne l'ordre adapté à votre situation, et l'appel découverte est gratuit.",
      },
      {
        q: "Combien ça coûte ?",
        a: `Le premier appel de 15 minutes est gratuit. Ensuite, chaque démarche accompagnée coûte à partir de ${from}, ou vous pouvez choisir le Pack Arrivée.`,
      },
      {
        q: "Faites-vous les démarches à ma place ?",
        a: "Non : on prépare tout avec vous et vous faites la démarche vous-même sur le site officiel. Vous gardez la main sur vos comptes, et on ne vous demande jamais vos mots de passe.",
      },
    ],
    startTitle: "Une question sur vos démarches ?",
    startText: "Parlez-en gratuitement avec un conseiller. 15 minutes, sans engagement.",
  },
  en: {
    metaTitle: "Help with French paperwork for foreigners and expats | MesDémarches",
    metaDescription:
      "Lost in French bureaucracy? MesDémarches helps foreigners, expats and newcomers in France: housing, bank account, health insurance, CAF, taxes, driving licence. Free first call, then from €15 per procedure.",
    badge: "Foreigners, expats, newcomers: we're here for you",
    title: "Lost in French paperwork? ",
    titleAccent: "We guide you, step by step.",
    subtitle:
      "Housing, bank account, health insurance, CAF, taxes, driving licence… An advisor tells you what to do, in what order, and prepares each procedure with you.",
    chipsLabel: "At a glance",
    chips: (from: string) => [
      { emoji: "🎁", label: "Free first call" },
      { emoji: "💶", label: `From ${from} per procedure` },
      { emoji: "💬", label: "In English or French" },
      { emoji: "🔒", label: "Your data protected" },
    ],
    cta: "Book my free call",
    ctaSecondary: "Get my free plan",
    stepsTitle: "The procedures we prepare with you",
    stepsText: "Pick what's holding you back: we help you sort it out, at a fixed price.",
    seeAll: "See all prices",
    howEyebrow: "How does it work?",
    howTitle: "As simple as a phone call",
    stepLabel: "Step",
    how: [
      { emoji: "📞", title: "A free 15-minute call", text: "You tell us about your situation. Together we work out what's urgent." },
      { emoji: "🗂️", title: "We prepare your procedure", text: "Documents list, steps in order, review: you know exactly what to do." },
      { emoji: "✅", title: "You move forward with confidence", text: "You complete the procedure on the official website. We're still here for your questions." },
    ],
    guidesTitle: "Our free guides to settling in France",
    guidesText: "Simple explanations and links to official websites, if you'd rather go it alone.",
    allGuides: "All guides",
    domainsTitle: "Every procedure, by topic",
    discover: "Discover",
    faqTitle: "Frequently asked questions",
    faq: (from: string) => [
      {
        q: "What is MesDémarches?",
        a: "A support service that helps foreigners, expats and newcomers understand and organise their administrative procedures in France. It is a private service, not an official government website.",
      },
      {
        q: "I've just moved to France: where do I start?",
        a: "Usually: your personal documents, proof of address, a bank account and health insurance. Our free action plan gives you the right order for your situation, and the discovery call is free.",
      },
      {
        q: "How much does it cost?",
        a: `The first 15-minute call is free. After that, each supported procedure costs from ${from}, or you can choose the Moving to France bundle.`,
      },
      {
        q: "Do you do the procedures for me?",
        a: "No: we prepare everything with you and you complete the procedure yourself on the official website. You stay in control of your accounts, and we never ask for your passwords.",
      },
    ],
    startTitle: "A question about your paperwork?",
    startText: "Talk it through with an advisor for free. 15 minutes, no commitment.",
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
  const dict = getDictionary(locale);
  const [domains, offers, guides] = await Promise.all([getActiveDomains(locale), getOffers(locale), getPublishedGuides(locale)]);
  const steps = offers.filter((o) => o.kind === "demarche");
  const discovery = offers.find((o) => o.kind === "decouverte");
  const lowest = lowestDemarchePrice(offers);
  const from = lowest !== null && steps[0] ? formatPrice({ ...steps[0], price: lowest }, locale) : "15 €";
  const featured = FEATURED_GUIDES.map((slug) => guides.find((g) => g.slug === slug)).filter((g) => g !== undefined).slice(0, 6);
  const faq = c.faq(from);
  const bookFree = `${href("/rendez-vous", locale)}${discovery ? `?offre=${discovery.id}` : ""}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeTags[locale],
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
              <span aria-hidden="true">👋</span> {c.badge}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {c.title}
              <span className="text-brand-700">{c.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{c.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={bookFree} size="lg">
                <span aria-hidden="true">📞</span> {c.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={href("/plan-action", locale)} size="lg" variant="secondary">
                {c.ctaSecondary}
              </ButtonLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={c.chipsLabel}>
              {c.chips(from).map((chip) => (
                <li key={chip.label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-line">
                  <span aria-hidden="true">{chip.emoji}</span> {chip.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroIllustration />
          </div>
        </Container>
      </section>

      {steps.length > 0 && (
        <section className="bg-surface py-16 sm:py-20" aria-labelledby="demarches">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div id="demarches">
                <SectionHeading title={c.stepsTitle} description={c.stepsText} />
              </div>
              <Link href={href("/tarifs", locale)} className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                {c.seeAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((o) => {
                const category = o.category ? getCategory(o.category) : undefined;
                return (
                  <li key={o.id}>
                    <Link
                      href={`${href("/rendez-vous", locale)}?offre=${o.id}`}
                      className="group flex h-full items-center gap-4 rounded-card border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)]"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl" aria-hidden="true">
                        {category?.emoji ?? "📌"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold leading-snug text-ink group-hover:text-brand-700">{o.name}</span>
                        <span className="mt-0.5 block text-sm text-muted">{o.tagline}</span>
                      </span>
                      <span className="shrink-0 text-lg font-extrabold text-ink">{formatPrice(o, locale)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20" aria-labelledby="comment">
        <Container>
          <div id="comment">
            <SectionHeading eyebrow={c.howEyebrow} title={c.howTitle} align="center" />
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {c.how.map((step, i) => (
              <li key={step.title} className="relative rounded-card border border-line bg-white p-6">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-2xl" aria-hidden="true">
                  {step.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  <span className="sr-only">
                    {c.stepLabel} {i + 1} :{" "}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ButtonLink href={bookFree} size="lg">
              {c.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section className="bg-surface py-16 sm:py-20" aria-labelledby="guides-gratuits">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div id="guides-gratuits">
                <SectionHeading title={c.guidesTitle} description={c.guidesText} />
              </div>
              <Link href={href("/guides", locale)} className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                {c.allGuides} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((g) => (
                <GuideCard key={g.slug} guide={g} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.domainsTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((raw) => {
              const category = localizeCategory(raw, locale);
              const domain = domains.find((d) => d.category === raw.id);
              return (
                <CategoryCard
                  key={raw.id}
                  category={category}
                  href={href(domain ? `/services/${domain.slug}` : "/services", locale)}
                  ctaLabel={c.discover}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="faq-accueil">
        <Container>
          <h2 id="faq-accueil" className="text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {c.faqTitle}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-card border border-line bg-white">
            {faq.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  <h3 className="text-base">{f.q}</h3>
                  <span className="text-xl text-brand-700 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-[1.5rem] bg-brand-900 px-6 py-12 text-center text-white sm:px-12">
            <span className="text-4xl" aria-hidden="true">
              📞
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{c.startTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-200">{c.startText}</p>
            <ButtonLink href={bookFree} size="lg" variant="secondary" className="mt-7">
              {c.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <p className="mx-auto mt-8 max-w-2xl text-xs text-brand-300">{dict.footer.disclaimer}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
