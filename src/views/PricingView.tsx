import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice, lowestDemarchePrice, type Offer } from "@/config/pricing";
import { alternates, href, type Locale } from "@/i18n";
import { getOffers } from "@/lib/data/content";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";
import { DemarcheSelector } from "@/components/pricing/DemarcheSelector";
import { jsonLd } from "@/lib/seo";

const copy = {
  fr: {
    metaTitle: "Tarifs : aide aux démarches administratives à partir de 15 €",
    metaDescription:
      "Appel découverte gratuit, puis un prix par démarche : compte bancaire, dossier de location, CAF, Assurance Maladie, permis de conduire étranger, impôts… Aide pour étrangers et nouveaux arrivants en France.",
    eyebrow: "Tarifs",
    title: "Des prix simples, à la démarche",
    description: "Commencez par un appel gratuit. Ensuite, vous ne payez que l'aide dont vous avez vraiment besoin.",
    launchTitle: "Prix de lancement",
    launchText:
      "Aucun paiement en ligne pour le moment : après votre demande, nous vous contactons pour confirmer le rendez-vous et les modalités avant toute facturation.",
    freeTitle: "Commencez par un appel gratuit",
    freeCta: "Réserver mon appel gratuit",
    perStepTitle: "À la démarche",
    perStepText: "Composez votre accompagnement : cochez les démarches qui vous concernent, le prix s'ajuste tout seul.",
    eachIncludes: "Pour chaque démarche :",
    choose: "Choisir",
    from: "à partir de",
    packsTitle: "Pack et abonnement",
    packsText: "Pour être accompagné·e sur plusieurs démarches, ou avoir quelqu'un à qui poser vos questions toute l'année.",
    popular: "Le plus choisi",
    included: "Inclus",
    excluded: "Non inclus",
    responseTime: "Délai de réponse",
    cancellation: "Annulation",
    termination: "Résiliation",
    book: "Choisir cette formule",
    commonTitle: "Bon à savoir",
    common: [
      ["On vous accompagne,", "mais c'est vous qui faites la démarche : vous gardez la main sur vos comptes et vos documents."],
      ["Pas de conseil juridique, fiscal ou financier personnalisé :", "pour cela, nous vous orientons vers les professionnels compétents."],
      ["Aucun résultat garanti :", "les décisions relèvent des organismes concernés."],
      ["Vos accès restent privés :", "nous ne vous demanderons jamais vos mots de passe."],
    ],
    withdrawal: "Droit de rétractation et annulation :",
    withdrawalText: "les modalités sont précisées dans nos",
    terms: "conditions générales de vente",
  },
  en: {
    metaTitle: "Pricing: help with French paperwork from €15",
    metaDescription:
      "Free discovery call, then one price per procedure: bank account, rental file, CAF housing aid, health insurance, foreign driving licence exchange, tax return… Help for foreigners and expats in France.",
    eyebrow: "Pricing",
    title: "Simple prices, per procedure",
    description: "Start with a free call. After that, you only pay for the help you really need.",
    launchTitle: "Launch prices",
    launchText:
      "No online payment for now: after your request, we contact you to confirm the appointment and terms before any invoicing.",
    freeTitle: "Start with a free call",
    freeCta: "Book my free call",
    perStepTitle: "Per procedure",
    perStepText: "Build your own support: tick the procedures that apply to you and the price adjusts automatically.",
    eachIncludes: "For each procedure:",
    choose: "Choose",
    from: "from",
    packsTitle: "Bundle and subscription",
    packsText: "For support with several procedures, or someone to ask questions to all year round.",
    popular: "Most popular",
    included: "Included",
    excluded: "Not included",
    responseTime: "Response time",
    cancellation: "Cancellation",
    termination: "Ending the subscription",
    book: "Choose this option",
    commonTitle: "Good to know",
    common: [
      ["We support you,", "but you carry out the procedure yourself: you stay in control of your accounts and documents."],
      ["No personalised legal, tax or financial advice:", "for that, we point you to the right professionals."],
      ["No guaranteed outcome:", "decisions are made by the relevant authorities."],
      ["Your logins stay private:", "we will never ask for your passwords."],
    ],
    withdrawal: "Right of withdrawal and cancellation:",
    withdrawalText: "details are in our",
    terms: "terms of sale",
  },
};

export function pricingMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/tarifs", locale) };
}

function bookHref(offer: Offer, locale: Locale) {
  return `${href("/rendez-vous", locale)}?offre=${offer.id}`;
}

export async function PricingView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const offers = await getOffers(locale);
  const discovery = offers.find((o) => o.kind === "decouverte");
  const steps = offers.filter((o) => o.kind === "demarche");
  const bundles = offers.filter((o) => o.kind === "pack" || o.kind === "abonnement");
  const lowest = lowestDemarchePrice(offers);

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: c.title,
    itemListElement: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      description: o.tagline,
      price: o.price,
      priceCurrency: "EUR",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(catalogJsonLd)} />
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Container className="space-y-14 py-12 sm:py-16">
        {discovery && (
          <section className="grid items-center gap-6 rounded-[1.5rem] border border-accent-200 bg-gradient-to-br from-accent-50 to-brand-50 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                <span aria-hidden="true">📞</span> {formatPrice(discovery, locale)} · {discovery.duration}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{c.freeTitle}</h2>
              <ul className="mt-3 space-y-1.5">
                {discovery.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href={bookHref(discovery, locale)} size="lg">
              {c.freeCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </section>
        )}

        {steps.length > 0 && (
          <section aria-labelledby="a-la-demarche">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 id="a-la-demarche" className="text-2xl font-bold text-ink sm:text-3xl">
                  {c.perStepTitle}{" "}
                  {lowest !== null && (
                    <span className="text-lg font-semibold text-accent-700">
                      ({c.from} {formatPrice({ ...steps[0], price: lowest }, locale)})
                    </span>
                  )}
                </h2>
                <p className="mt-2 text-muted">{c.perStepText}</p>
              </div>
            </div>
            <div className="mt-5 rounded-card border border-line bg-surface p-4 text-sm text-ink">
              <strong>{c.eachIncludes}</strong>{" "}
              {steps[0].includes.map((item, i) => (
                <span key={item}>
                  <Check className="mx-1 inline h-4 w-4 text-accent-600" aria-hidden="true" />
                  {item}
                  {i < steps[0].includes.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <DemarcheSelector offers={steps} pack={bundles.find((o) => o.kind === "pack")} locale={locale} />
            </div>
          </section>
        )}

        {bundles.length > 0 && (
          <section aria-labelledby="formules">
            <h2 id="formules" className="text-2xl font-bold text-ink sm:text-3xl">
              {c.packsTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">{c.packsText}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {bundles.map((offer) => (
                <section
                  key={offer.id}
                  aria-labelledby={`offre-${offer.id}`}
                  className={`relative flex flex-col rounded-card border bg-white p-6 sm:p-7 ${
                    offer.highlighted ? "border-brand-700 shadow-[0_12px_32px_rgba(28,58,122,0.12)]" : "border-line"
                  }`}
                >
                  {offer.highlighted && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">{c.popular}</span>
                  )}
                  <span className="text-3xl" aria-hidden="true">
                    {offer.kind === "abonnement" ? "🔄" : "🏡"}
                  </span>
                  <h3 id={`offre-${offer.id}`} className="mt-3 text-lg font-bold text-ink">
                    {offer.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{offer.tagline}</p>
                  <p className="mt-5 text-4xl font-extrabold tracking-tight text-ink">{formatPrice(offer, locale)}</p>
                  <p className="mt-1 text-sm text-muted">{offer.duration}</p>

                  <h4 className="mt-6 text-sm font-semibold text-ink">{c.included}</h4>
                  <ul className="mt-2 space-y-2">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                    <div>
                      <dt className="font-semibold text-ink">{c.responseTime}</dt>
                      <dd className="text-muted">{offer.responseTime}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">{offer.billing === "mensuel" ? c.termination : c.cancellation}</dt>
                      <dd className="text-muted">{offer.cancellation}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-6">
                    <ButtonLink href={bookHref(offer, locale)} variant={offer.highlighted ? "primary" : "secondary"} className="w-full">
                      {c.book}
                    </ButtonLink>
                  </div>
                </section>
              ))}
            </div>
          </section>
        )}

        <p className="text-center text-sm text-muted">
          <Link href={href("/cgv", locale)} className="font-medium text-brand-700 underline">
            {c.terms}
          </Link>
        </p>
      </Container>
    </>
  );
}
