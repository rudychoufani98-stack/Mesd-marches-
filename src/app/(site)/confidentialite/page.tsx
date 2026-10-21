import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_VERSION, REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment MesDémarches collecte, utilise et protège vos données personnelles.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalDraft
      title="Politique de confidentialité"
      description="Nous collectons le minimum de données nécessaire et ne les vendons jamais."
      updatedAt="21 octobre 2026"
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <Placeholder>raison sociale, adresse, contact</Placeholder>. Contact pour les questions relatives aux données :{" "}
          <Placeholder>adresse e-mail dédiée</Placeholder>.
        </p>
      </section>
      <section>
        <h2>Données traitées</h2>
        <ul>
          <li>
            <strong>Formulaire de contact</strong> : nom, adresse e-mail, sujet et message. Finalité : répondre à votre
            demande. Base légale : <Placeholder>à valider — mesures précontractuelles / intérêt légitime</Placeholder>.
          </li>
          <li>
            <strong>Demande de rendez-vous</strong> : nom, adresse e-mail, offre choisie, mode et disponibilités, message
            facultatif. Finalité : organiser le rendez-vous. Base légale : <Placeholder>à valider — mesures précontractuelles</Placeholder>.
          </li>
          <li>
            <strong>Plan d&apos;action et checklists</strong> : vos réponses et votre progression sont enregistrées uniquement
            dans le stockage local de votre navigateur. Elles ne sont pas transmises à nos serveurs.
          </li>
        </ul>
        <p>
          Avec chaque demande, nous enregistrons la date et l&apos;heure de votre accord ainsi que la version de cette
          politique en vigueur ({PRIVACY_VERSION}), afin de pouvoir en justifier.
        </p>
        <p>
          Nous ne demandons ni pièce d&apos;identité, ni numéro de sécurité sociale, ni numéro fiscal, ni coordonnées bancaires,
          ni identifiants de connexion aux sites administratifs. Merci de ne pas en indiquer dans vos messages.
        </p>
      </section>
      <section>
        <h2>Durées de conservation</h2>
        <ul>
          <li>
            Demandes de contact et de rendez-vous : {REQUEST_RETENTION_MONTHS} mois après leur réception, puis suppression
            automatique. <Placeholder>durée à valider</Placeholder>
          </li>
          <li>
            Données clients : <Placeholder>durée de la relation commerciale + durée de prescription applicable — à valider</Placeholder>.
          </li>
          <li>Données du navigateur : vous pouvez les effacer à tout moment avec le bouton « Recommencer » du plan d&apos;action ou en vidant les données du site.</li>
        </ul>
      </section>
      <section>
        <h2>Destinataires et sous-traitants</h2>
        <p>
          Vos données sont destinées uniquement à l&apos;équipe MesDémarches, seule à avoir accès à l&apos;espace de gestion.
          Prestataires techniques : hébergement du site (Vercel), base de données (Supabase){" "}
          <Placeholder>préciser la région d&apos;hébergement des données, l&apos;outil de notification éventuel et les garanties en cas de transfert hors UE</Placeholder>.
          Les notifications internes de nouvelle demande ne contiennent aucune donnée personnelle.
          Aucune donnée n&apos;est vendue ni utilisée à des fins publicitaires.
        </p>
      </section>
      <section>
        <h2>Cookies et mesure d&apos;audience</h2>
        <p>
          Le site n&apos;utilise pas de cookies publicitaires ni d&apos;outil de mesure d&apos;audience à ce jour, et ne dépose
          aucun cookie aux visiteurs. Seul l&apos;espace de gestion réservé à l&apos;équipe utilise un cookie de connexion,
          strictement nécessaire. Le stockage
          local du navigateur sert uniquement à conserver votre plan et vos checklists, à votre demande. Si un outil de mesure
          d&apos;audience est ajouté, cette page sera mise à jour et votre consentement sera recueilli lorsque la
          réglementation l&apos;exige.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez de droits d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
          portabilité. Pour les exercer, utilisez le{" "}
          <Link href="/contact" className="font-medium text-brand-700 underline">
            formulaire de contact
          </Link>{" "}
          (sujet « Mes données personnelles »), en écrivant depuis l&apos;adresse utilisée lors de votre demande. Nous vous
          répondons dans un délai d&apos;un mois. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </section>
      <section>
        <h2>Sécurité</h2>
        <p>
          Les échanges avec le site sont chiffrés (HTTPS). Les formulaires sont validés côté serveur et protégés contre les
          envois automatisés. Les demandes sont stockées dans une base dont l&apos;accès est limité à l&apos;équipe par des règles
          d&apos;accès strictes : un visiteur peut déposer une demande mais jamais lire celles des autres. Aucune clé secrète
          n&apos;est exposée dans le navigateur.
        </p>
      </section>
    </LegalDraft>
  );
}
