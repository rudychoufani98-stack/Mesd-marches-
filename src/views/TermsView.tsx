import type { Metadata } from "next";
import { getOffers } from "@/lib/data/content";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";
import { FrenchVersionPrevails, formatOfferPrice, legalUpdatedAt } from "./shared";

const PATH = "/cgv";

const copy = {
  fr: {
    title: "Conditions générales de vente",
    metaDescription: "Conditions générales de vente des prestations d'accompagnement MesDémarches.",
    description: "Conditions applicables aux prestations d'accompagnement proposées par MesDémarches.",
  },
  en: {
    title: "Terms of sale",
    metaDescription: "General terms of sale for MesDémarches support services.",
    description: "Terms applicable to the support services offered by MesDémarches.",
  },
} as const;

export function termsMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export async function TermsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const offers = await getOffers(locale);
  const disclaimer = getDictionary(locale).footer.disclaimer;
  return (
    <LegalDraft title={t.title} description={t.description} updatedAt={legalUpdatedAt[locale]} locale={locale}>
      {locale === "fr" ? (
        <>
          <section>
            <h2>1. Objet</h2>
            <p>
              Les présentes conditions encadrent les prestations d&apos;accompagnement à l&apos;organisation de démarches
              administratives et pratiques proposées par <Placeholder>raison sociale</Placeholder>. {disclaimer}
            </p>
          </section>
          <section>
            <h2>2. Description des prestations</h2>
            <ul>
              {offers.map((o) => (
                <li key={o.id}>
                  <strong>{o.name}</strong> — {formatOfferPrice(o, locale)} TTC : {o.includes.join(", ").toLowerCase()}.
                </li>
              ))}
            </ul>
            <p>
              Les prestations consistent en de l&apos;information, de l&apos;organisation et de l&apos;orientation. Elles
              n&apos;incluent pas la réalisation des démarches, la représentation auprès des administrations, ni de conseil
              juridique, fiscal ou financier personnalisé. Aucun résultat n&apos;est garanti.{" "}
              <Placeholder>qualification juridique exacte des prestations à faire valider</Placeholder>
            </p>
          </section>
          <section>
            <h2>3. Commande et paiement</h2>
            <p>
              La demande de rendez-vous en ligne n&apos;engage pas le client. La commande est confirmée après acceptation du
              créneau et des présentes conditions. Le paiement s&apos;effectue en ligne par carte bancaire, en toute sécurité, sur la page de paiement de notre prestataire Stripe ; MesDémarches n&apos;a jamais accès à vos données de carte. Le prix est payable en totalité à la commande (mensuellement pour l&apos;abonnement). Un reçu et une facture sont envoyés par e-mail.
            </p>
          </section>
          <section>
            <h2>4. Droit de rétractation</h2>
            <p>
              <Placeholder>
                À rédiger avec un professionnel : délai de rétractation applicable aux contrats conclus à distance, conditions de
                l&apos;exécution anticipée à la demande expresse du client, et conséquences sur le droit de rétractation et le
                montant dû, formulaire type de rétractation
              </Placeholder>
            </p>
          </section>
          <section>
            <h2>5. Annulation et report</h2>
            <ul>
              {offers.map((o) => (
                <li key={o.id}>
                  {o.name} : {o.cancellation}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>6. Abonnement « {offers.find((o) => o.kind === "abonnement")?.name ?? "Abonnement"} »</h2>
            <p>
              Sans engagement de durée, résiliable à tout moment, effet à la fin de la période mensuelle en cours.{" "}
              <Placeholder>modalités de résiliation en ligne et de reconduction à valider au regard de la réglementation applicable</Placeholder>
            </p>
          </section>
          <section>
            <h2>7. Responsabilité</h2>
            <p>
              Les informations transmises sont générales et le client reste seul décisionnaire de ses démarches. Les décisions
              relèvent exclusivement des organismes compétents. <Placeholder>clause de responsabilité et assurance professionnelle à valider</Placeholder>
            </p>
          </section>
          <section>
            <h2>8. Médiation et litiges</h2>
            <p>
              <Placeholder>coordonnées du médiateur de la consommation désigné, droit applicable et juridiction compétente</Placeholder>
            </p>
          </section>
        </>
      ) : (
        <>
          <FrenchVersionPrevails path={PATH} />
          <section>
            <h2>1. Purpose</h2>
            <p>
              These terms govern the support services for organising administrative and practical procedures offered by{" "}
              <Placeholder>company name</Placeholder>. {disclaimer}
            </p>
          </section>
          <section>
            <h2>2. Description of the services</h2>
            <ul>
              {offers.map((o) => (
                <li key={o.id}>
                  <strong>{o.name}</strong> — {formatOfferPrice(o, locale)} including VAT: {o.includes.join(", ").toLowerCase()}.
                </li>
              ))}
            </ul>
            <p>
              The services consist of information, organisation and guidance. They do not include carrying out procedures,
              representation before government bodies, or personalised legal, tax or financial advice. No result is guaranteed.{" "}
              <Placeholder>exact legal classification of the services to be validated</Placeholder>
            </p>
          </section>
          <section>
            <h2>3. Ordering and payment</h2>
            <p>
              An online appointment request does not commit the client. The order is confirmed once the time slot and these terms
              have been accepted. Payment is made online by bank card, securely, on the payment page of our provider Stripe; MesDémarches never has access to your card details. The price is payable in full when ordering (monthly for the subscription). A receipt and an invoice are sent by email.
            </p>
          </section>
          <section>
            <h2>4. Right of withdrawal</h2>
            <p>
              <Placeholder>
                To be drafted with a professional: withdrawal period applicable to distance contracts, conditions for performance
                starting early at the client&apos;s express request and the consequences for the right of withdrawal and the
                amount due, model withdrawal form
              </Placeholder>
            </p>
          </section>
          <section>
            <h2>5. Cancellation and rescheduling</h2>
            <ul>
              {offers.map((o) => (
                <li key={o.id}>
                  {o.name}: {o.cancellation}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>6. &ldquo;{offers.find((o) => o.kind === "abonnement")?.name ?? "Subscription"}&rdquo; subscription</h2>
            <p>
              No minimum term, can be cancelled at any time, taking effect at the end of the current monthly period.{" "}
              <Placeholder>online cancellation and renewal terms to be validated against the applicable regulations</Placeholder>
            </p>
          </section>
          <section>
            <h2>7. Liability</h2>
            <p>
              The information provided is general and the client alone remains responsible for decisions about their procedures.
              Decisions are exclusively a matter for the relevant authorities.{" "}
              <Placeholder>liability clause and professional insurance to be validated</Placeholder>
            </p>
          </section>
          <section>
            <h2>8. Mediation and disputes</h2>
            <p>
              <Placeholder>contact details of the designated consumer mediator, applicable law and competent court</Placeholder>
            </p>
          </section>
        </>
      )}
    </LegalDraft>
  );
}
