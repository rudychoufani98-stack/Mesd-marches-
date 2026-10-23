import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Car,
  Check,
  FileCheck2,
  Flag,
  GraduationCap,
  Languages as LanguagesIcon,
  Rocket,
  HeartPulse,
  Home,
  KeyRound,
  Landmark,
  Languages,
  Lock,
  type LucideIcon,
  Receipt,
  ShieldCheck,
  Truck,
  UserRound,
  Wallet,
} from "lucide-react";
import { formatPrice, lowestDemarchePrice } from "@/config/pricing";
import { alternates, href, localeTags, type Locale } from "@/i18n";
import { getOffers } from "@/lib/data/content";
import { InstitutionsMarquee } from "@/components/home/InstitutionsMarquee";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { Container } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

/** Icône de chaque accompagnement (plus sobre que des emojis). */
const ICONS: Record<string, LucideIcon> = {
  "d-titre-sejour": FileCheck2,
  "d-naturalisation": Flag,
  "d-traductions": LanguagesIcon,
  "d-creation-entreprise": Rocket,
  "d-diplome": GraduationCap,
  "d-compte-bancaire": Landmark,
  "d-dossier-location": KeyRound,
  "d-aide-logement": Home,
  "d-emmenagement": Truck,
  "d-assurance-maladie": HeartPulse,
  "d-permis": Car,
  "d-emploi": Briefcase,
  "d-impots": Receipt,
  "d-comptes-en-ligne": ShieldCheck,
};

const copy = {
  fr: {
    metaTitle: "Aide aux démarches administratives en France pour étrangers et expatriés | MesDémarches",
    metaDescription:
      "Conseiller dédié pour étrangers, expatriés et nouveaux arrivants en France : logement, compte bancaire, Sécurité sociale, CAF, impôts, permis de conduire. Premier appel offert.",
    eyebrow: "Conseil administratif privé · Étrangers & expatriés",
    title: "Vos démarches en France,",
    titleAccent: "sans le stress.",
    subtitle:
      "Un conseiller dédié vous accompagne personnellement. Vous savez exactement quoi faire, votre dossier est prêt, vous avancez.",
    proofs: ["Conseiller dédié", "Français & English", "Réponse sous 48 h"],
    servicesEyebrow: "Nos accompagnements",
    servicesTitle: "Ce que nous réglons avec vous",
    servicesText: "Un objectif clair, un prix fixe. Vous choisissez, nous vous accompagnons jusqu'au bout.",
    from: "dès",
    cta: "Être accompagné·e",
    allPrices: "Tarifs et Pack Arrivée",
    otherTitle: "Votre démarche n'est pas listée ?",
    otherText: "Parlez-en à un conseiller : nous vous accompagnons sur toutes les démarches.",
    otherCta: "Appel offert",
    methodEyebrow: "La méthode",
    methodTitle: "Trois étapes. Aucune perte de temps.",
    method: [
      { title: "L'appel offert", text: "15 minutes pour comprendre votre situation et cibler ce qui est vraiment urgent." },
      { title: "Votre dossier, préparé", text: "Pièces, ordre des étapes, relecture : tout est prêt, rien n'est laissé au hasard." },
      { title: "Vous avancez, accompagné·e", text: "Chaque étape est claire. Votre conseiller reste à vos côtés jusqu'au bout." },
    ],
    commitmentsTitle: "Nos engagements",
    commitments: [
      { icon: UserRound, title: "Un interlocuteur unique", text: "Le même conseiller, du premier appel à la dernière démarche." },
      { icon: Languages, title: "Bilingue", text: "Nous échangeons en français ou en anglais, à votre convenance." },
      { icon: Wallet, title: "Prix fixes", text: "Chaque accompagnement a son prix, connu dès le départ." },
      { icon: Lock, title: "Confidentialité", text: "Votre dossier et vos données restent strictement confidentiels." },
    ],
    faqTitle: "Questions fréquentes",
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
    finalTitle: "Parlons de votre situation.",
    finalText: "15 minutes offertes, sans engagement. Vous repartez en sachant exactement quoi faire.",
    finalCta: "Réserver mon appel offert",
  },
  en: {
    metaTitle: "Help with French paperwork for foreigners and expats | MesDémarches",
    metaDescription:
      "A dedicated advisor for foreigners, expats and newcomers in France: housing, bank account, health insurance, CAF, taxes, driving licence. Free first call.",
    eyebrow: "Private administrative advice · Foreigners & expats",
    title: "Your French paperwork,",
    titleAccent: "without the stress.",
    subtitle: "A dedicated advisor supports you personally. You know exactly what to do, your file is ready, you move forward.",
    proofs: ["Dedicated advisor", "English & French", "Reply within 48h"],
    servicesEyebrow: "What we do",
    servicesTitle: "What we sort out with you",
    servicesText: "A clear goal, a fixed price. You choose, we support you all the way.",
    from: "from",
    cta: "Get support",
    allPrices: "Prices and Moving bundle",
    otherTitle: "Your procedure isn't listed?",
    otherText: "Talk to an advisor: we support you with every procedure.",
    otherCta: "Free call",
    methodEyebrow: "The method",
    methodTitle: "Three steps. No time wasted.",
    method: [
      { title: "The free call", text: "15 minutes to understand your situation and focus on what is truly urgent." },
      { title: "Your file, prepared", text: "Documents, order of steps, review: everything is ready, nothing left to chance." },
      { title: "You move forward, supported", text: "Every step is clear. Your advisor stays by your side all the way." },
    ],
    commitmentsTitle: "Our commitments",
    commitments: [
      { icon: UserRound, title: "One point of contact", text: "The same advisor, from the first call to the last step." },
      { icon: Languages, title: "Bilingual", text: "We work in English or French, whichever suits you." },
      { icon: Wallet, title: "Fixed prices", text: "Each service has its price, known from the start." },
      { icon: Lock, title: "Confidentiality", text: "Your file and your data stay strictly confidential." },
    ],
    faqTitle: "Frequently asked questions",
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
    finalTitle: "Let's talk about your situation.",
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
  const offers = await getOffers(locale);
  const steps = offers.filter((o) => o.kind === "demarche");
  const lowest = lowestDemarchePrice(offers);
  const from = lowest !== null && steps[0] ? formatPrice({ ...steps[0], price: lowest }, locale) : "15 €";
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
      <section id="demande" className="relative scroll-mt-16 overflow-hidden bg-brand-950 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-600/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent-500/15 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{c.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {c.title} <em className="font-normal text-gold-300">{c.titleAccent}</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/90">{c.subtitle}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {c.proofs.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-300/20 text-gold-300">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <QuickLeadForm offers={offers} locale={locale} />
        </Container>
      </section>

      <InstitutionsMarquee locale={locale} />

      {/* Accompagnements */}
      {steps.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="accompagnements">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">{c.servicesEyebrow}</p>
                <h2 id="accompagnements" className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                  {c.servicesTitle}
                </h2>
                <p className="mt-4 text-lg text-muted">{c.servicesText}</p>
              </div>
              <Link href={href("/tarifs", locale)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                {c.allPrices} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((o) => {
                const Icon = ICONS[o.id] ?? Check;
                return (
                  <li key={o.id} className="bg-white">
                    <Link href={`${href("/rendez-vous", locale)}?offre=${o.id}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-surface">
                      <span className="flex items-center justify-between">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-100 text-brand-700 transition-colors group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-muted">
                          {c.from} <span className="font-semibold text-ink">{formatPrice(o, locale)}</span>
                        </span>
                      </span>
                      <span className="mt-6 block font-display text-xl font-medium leading-snug text-ink">{o.headline || o.name}</span>
                      {o.why && <span className="mt-2 block text-sm leading-relaxed text-muted">{o.why}</span>}
                      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand-700">
                        {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li className="bg-brand-950">
                <a href="#demande" className="group flex h-full flex-col p-7 text-white">
                  <span className="font-display text-xl font-medium leading-snug">{c.otherTitle}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-brand-100/80">{c.otherText}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-gold-300">
                    {c.otherCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
          </Container>
        </section>
      )}

      {/* Méthode */}
      <section className="bg-brand-950 py-20 text-white sm:py-28" aria-labelledby="methode">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{c.methodEyebrow}</p>
          <h2 id="methode" className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {c.methodTitle}
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {c.method.map((step, i) => (
              <li key={step.title} className="border-t border-white/15 pt-6">
                <span className="font-display text-5xl font-light text-gold-300">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-100/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engagements */}
      <section className="py-20 sm:py-28" aria-labelledby="engagements">
        <Container>
          <h2 id="engagements" className="text-center font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            {c.commitmentsTitle}
          </h2>
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.commitments.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface text-brand-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface py-20 sm:py-24" aria-labelledby="faq-accueil">
        <Container>
          <h2 id="faq-accueil" className="text-center font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {c.faqTitle}
          </h2>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-[1.5rem] border border-line bg-white">
            {faq.map((f) => (
              <details key={f.q} className="group p-6">
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

      {/* Appel final */}
      <section className="bg-brand-950 py-20 text-center text-white sm:py-24">
        <Container>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{c.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100/80">{c.finalText}</p>
          <a
            href="#demande"
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold-300 px-7 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-200"
          >
            {c.finalCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Container>
      </section>
    </>
  );
}
