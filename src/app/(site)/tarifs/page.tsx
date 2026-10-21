import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { formatPrice, PRICES_ARE_TEST_VALUES } from "@/config/pricing";
import { getOffers } from "@/lib/data/content";
import { ButtonLink, Container, Notice, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Les offres d'accompagnement MesDémarches : bilan administratif, installation en France et suivi mensuel. Ce qui est inclus, exclu, délais et conditions d'annulation.",
  alternates: { canonical: "/tarifs" },
};

export default async function PricingPage() {
  const offers = await getOffers();
  return (
    <>
      <PageHeader
        eyebrow="Tarifs"
        title="Des offres claires, sans surprise"
        description="Les guides, les checklists et le plan d'action sont gratuits. Un accompagnement humain est proposé en option."
      />
      <Container className="py-12 sm:py-16">
        {PRICES_ARE_TEST_VALUES && (
          <Notice tone="info" title="Offres en phase de lancement">
            Les prix affichés sont des prix de lancement, susceptibles d&apos;évoluer. Aucun paiement n&apos;est demandé en ligne
            pour le moment : après votre demande de rendez-vous, nous vous contactons pour confirmer le créneau et les modalités
            avant toute facturation.
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
                <span className="absolute -top-3 left-6 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">
                  Pour les nouveaux arrivants
                </span>
              )}
              <h2 id={`offre-${offer.id}`} className="text-lg font-bold text-ink">
                {offer.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{offer.tagline}</p>
              <p className="mt-5 text-4xl font-extrabold tracking-tight text-ink">{formatPrice(offer)}</p>
              <p className="mt-1 text-sm text-muted">{offer.duration}</p>

              <h3 className="mt-6 text-sm font-semibold text-ink">Inclus</h3>
              <ul className="mt-2 space-y-2">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-5 text-sm font-semibold text-ink">Non inclus</h3>
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
                  <dt className="font-semibold text-ink">Délai de réponse</dt>
                  <dd className="text-muted">{offer.responseTime}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{offer.billing === "mensuel" ? "Résiliation" : "Annulation"}</dt>
                  <dd className="text-muted">{offer.cancellation}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <ButtonLink href={`/rendez-vous?offre=${offer.id}`} variant={offer.highlighted ? "primary" : "secondary"} className="w-full">
                  Demander ce rendez-vous
                </ButtonLink>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-2" aria-labelledby="conditions">
          <div>
            <h2 id="conditions" className="text-xl font-bold text-ink">
              Conditions communes à toutes les offres
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-ink">Ce que nous faisons :</strong> nous vous aidons à comprendre, organiser et
                planifier vos démarches, et nous vous orientons vers les sources officielles.
              </li>
              <li>
                <strong className="text-ink">Ce que nous ne faisons pas :</strong> nous ne réalisons pas les démarches à votre
                place, nous ne représentons pas les administrations et nous ne fournissons pas de conseil juridique, fiscal ou
                financier personnalisé.
              </li>
              <li>
                <strong className="text-ink">Aucun résultat garanti :</strong> les décisions relèvent exclusivement des
                organismes compétents.
              </li>
              <li>
                <strong className="text-ink">Vos accès restent privés :</strong> nous ne vous demanderons jamais vos mots de
                passe ni vos codes d&apos;accès aux sites administratifs.
              </li>
              <li>
                <strong className="text-ink">Droit de rétractation :</strong> les modalités applicables sont précisées dans nos{" "}
                <Link href="/cgv" className="font-medium text-brand-700 underline">
                  conditions générales de vente
                </Link>
                .
              </li>
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="text-lg font-bold text-ink">Vous ne savez pas quelle offre choisir ?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Commencez par créer votre plan d&apos;action gratuit : selon vos réponses, une offre adaptée vous sera suggérée si
              vous souhaitez être accompagné·e.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href="/plan-action">Créer mon plan d&apos;action</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Poser une question
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
