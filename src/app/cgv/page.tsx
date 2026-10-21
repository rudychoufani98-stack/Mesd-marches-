import type { Metadata } from "next";
import { formatPrice, offers } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente des prestations d'accompagnement MesDémarches.",
  alternates: { canonical: "/cgv" },
};

export default function TermsPage() {
  return (
    <LegalDraft
      title="Conditions générales de vente"
      description="Conditions applicables aux prestations d'accompagnement proposées par MesDémarches."
      updatedAt="21 octobre 2026"
    >
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions encadrent les prestations d&apos;accompagnement à l&apos;organisation de démarches
          administratives et pratiques proposées par <Placeholder>raison sociale</Placeholder>. {siteConfig.disclaimer}
        </p>
      </section>
      <section>
        <h2>2. Description des prestations</h2>
        <ul>
          {offers.map((o) => (
            <li key={o.id}>
              <strong>{o.name}</strong> — {formatPrice(o)} TTC : {o.includes.join(", ").toLowerCase()}.
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
          créneau et des présentes conditions. <Placeholder>modalités de paiement à définir</Placeholder>
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
        <h2>6. Abonnement « Suivi administratif »</h2>
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
    </LegalDraft>
  );
}
