import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { formatPrice, PRICES_ARE_TEST_VALUES } from "@/config/pricing";
import { alternates, href, type Locale } from "@/i18n";
import { getOffers } from "@/lib/data/content";
import { ButtonLink, Container, Notice, PageHeader } from "@/components/ui/primitives";

const offerEmojis: Record<string, string> = { bilan: "🧭", installation: "🏡", suivi: "🔄" };

const copy = {
  fr: {
    eyebrow: "Tarifs",
    metaTitle: "Tarifs",
    metaDescription:
      "Les offres d'accompagnement MesDémarches : bilan administratif, installation en France et suivi mensuel. Ce qui est inclus, exclu, délais et conditions d'annulation.",
    title: "Des offres claires, sans surprise",
    description: "Les guides, les checklists et le plan d'action sont gratuits. Un accompagnement humain est proposé en option.",
    launchTitle: "Offres en phase de lancement",
    launchText:
      "Les prix affichés sont des prix de lancement, susceptibles d'évoluer. Aucun paiement n'est demandé en ligne pour le moment : après votre demande de rendez-vous, nous vous contactons pour confirmer le créneau et les modalités avant toute facturation.",
    highlighted: "Pour les nouveaux arrivants",
    included: "Inclus",
    excluded: "Non inclus",
    responseTime: "Délai de réponse",
    cancellation: "Annulation",
    termination: "Résiliation",
    book: "Demander ce rendez-vous",
    commonTitle: "Conditions communes à toutes les offres",
    common: [
      ["Ce que nous faisons :", "nous vous aidons à comprendre, organiser et planifier vos démarches, et nous vous orientons vers les sources officielles."],
      [
        "Ce que nous ne faisons pas :",
        "nous ne réalisons pas les démarches à votre place, nous ne représentons pas les administrations et nous ne fournissons pas de conseil juridique, fiscal ou financier personnalisé.",
      ],
      ["Aucun résultat garanti :", "les décisions relèvent exclusivement des organismes compétents."],
      ["Vos accès restent privés :", "nous ne vous demanderons jamais vos mots de passe ni vos codes d'accès aux sites administratifs."],
    ],
    withdrawal: "Droit de rétractation :",
    withdrawalText: "les modalités applicables sont précisées dans nos",
    terms: "conditions générales de vente",
    chooseTitle: "Vous ne savez pas quelle offre choisir ?",
    chooseText:
      "Commencez par créer votre plan d'action gratuit : selon vos réponses, une offre adaptée vous sera suggérée si vous souhaitez être accompagné·e.",
    plan: "Créer mon plan d'action",
    ask: "Poser une question",
  },
  en: {
    eyebrow: "Pricing",
    metaTitle: "Pricing",
    metaDescription:
      "MesDémarches support offers: admin check-up, settling in France and monthly follow-up. What's included and excluded, response times and cancellation terms.",
    title: "Clear offers, no surprises",
    description: "Guides, checklists and the action plan are free. One-to-one support is available as an option.",
    launchTitle: "Launch offers",
    launchText:
      "The prices shown are launch prices and may change. No online payment is requested for now: after your appointment request, we contact you to confirm the time slot and terms before any invoicing.",
    highlighted: "For newcomers",
    included: "Included",
    excluded: "Not included",
    responseTime: "Response time",
    cancellation: "Cancellation",
    termination: "Ending the subscription",
    book: "Book this appointment",
    commonTitle: "Terms common to all offers",
    common: [
      ["What we do:", "we help you understand, organise and plan your procedures, and we point you to the official sources."],
      [
        "What we don't do:",
        "we don't carry out procedures on your behalf, we don't represent any public authority and we don't provide personalised legal, tax or financial advice.",
      ],
      ["No guaranteed outcome:", "decisions are made solely by the relevant authorities."],
      ["Your logins stay private:", "we will never ask for your passwords or access codes to administrative websites."],
    ],
    withdrawal: "Right of withdrawal:",
    withdrawalText: "the applicable terms are set out in our",
    terms: "terms of sale",
    chooseTitle: "Not sure which offer to choose?",
    chooseText:
      "Start by creating your free action plan: based on your answers, a suitable offer will be suggested if you would like support.",
    plan: "Create my action plan",
    ask: "Ask a question",
  },
};

export function pricingMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/tarifs", locale) };
}

export async function PricingView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const offers = await getOffers(locale);
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Container className="py-12 sm:py-16">
        {PRICES_ARE_TEST_VALUES && (
          <Notice tone="info" title={c.launchTitle}>
            {c.launchText}
          </Notice>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <section
              key={offer.id}
              aria-labelledby={`offre-${offer.id}`}
              className={`relative flex flex-col rounded-card border bg-white p-6 sm:p-7 ${
                offer.highlighted ? "border-brand-700 shadow-[0_12px_32px_rgba(28,58,122,0.12)]" : "border-line"
              }`}
            >
              {offer.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">{c.highlighted}</span>
              )}
              <span className="text-3xl" aria-hidden="true">
                {offerEmojis[offer.id] ?? "✨"}
              </span>
              <h2 id={`offre-${offer.id}`} className="mt-3 text-lg font-bold text-ink">
                {offer.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{offer.tagline}</p>
              <p className="mt-5 text-4xl font-extrabold tracking-tight text-ink">{formatPrice(offer, locale)}</p>
              <p className="mt-1 text-sm text-muted">{offer.duration}</p>

              <h3 className="mt-6 text-sm font-semibold text-ink">{c.included}</h3>
              <ul className="mt-2 space-y-2">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-5 text-sm font-semibold text-ink">{c.excluded}</h3>
              <ul className="mt-2 space-y-2">
                {offer.excludes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
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
                <ButtonLink
                  href={`${href("/rendez-vous", locale)}?offre=${offer.id}`}
                  variant={offer.highlighted ? "primary" : "secondary"}
                  className="w-full"
                >
                  {c.book}
                </ButtonLink>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-2" aria-labelledby="conditions">
          <div>
            <h2 id="conditions" className="text-xl font-bold text-ink">
              {c.commonTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              {c.common.map(([label, text]) => (
                <li key={label}>
                  <strong className="text-ink">{label}</strong> {text}
                </li>
              ))}
              <li>
                <strong className="text-ink">{c.withdrawal}</strong> {c.withdrawalText}{" "}
                <Link href={href("/cgv", locale)} className="font-medium text-brand-700 underline">
                  {c.terms}
                </Link>
                .
              </li>
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">{c.chooseTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.chooseText}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href={href("/plan-action", locale)}>{c.plan}</ButtonLink>
              <ButtonLink href={href("/contact", locale)} variant="secondary">
                {c.ask}
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
