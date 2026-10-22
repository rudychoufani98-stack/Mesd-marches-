import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { legalIdentity } from "@/config/legal";
import { PRIVACY_VERSION, REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { alternates, href, type Locale } from "@/i18n";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";
import { FrenchVersionPrevails, legalUpdatedAt } from "./shared";

const PATH = "/confidentialite";

const copy = {
  fr: {
    title: "Politique de confidentialité",
    metaDescription: "Comment MesDémarches collecte, utilise et protège vos données personnelles.",
    description: "Nous collectons le minimum de données nécessaire, les protégeons et ne les vendons jamais.",
  },
  en: {
    title: "Privacy policy",
    metaDescription: "How MesDémarches collects, uses and protects your personal data.",
    description: "We collect only the minimum data necessary, protect it and never sell it.",
  },
} as const;

export function privacyMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

const linkClass = "font-medium text-brand-700 underline";

/** Valeur de l'identité légale, ou mention à compléter si elle est vide. */
function Value({ value, missing }: { value: string; missing: ReactNode }) {
  return value ? <>{value}</> : <Placeholder>{missing}</Placeholder>;
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const id = legalIdentity;
  return (
    <LegalDraft title={t.title} description={t.description} updatedAt={legalUpdatedAt[locale]} locale={locale}>
      {locale === "fr" ? (
        <>
          <section>
            <h2>Responsable du traitement</h2>
            <p>
              <Value value={id.companyName} missing="raison sociale" />, <Value value={id.address} missing="adresse" />. Pour toute
              question sur vos données : <Value value={id.email} missing="adresse e-mail de contact" />.
            </p>
          </section>
          <section>
            <h2>Données traitées, finalités et bases légales</h2>
            <ul>
              <li>
                <strong>Demande d&apos;appel ou de rendez-vous</strong> (formulaire de l&apos;accueil et page Rendez-vous) : nom,
                e-mail, téléphone (facultatif), besoin choisi, mode de rendez-vous, disponibilités, message facultatif. Finalité :
                vous recontacter et organiser le rendez-vous. Base légale : mesures précontractuelles prises à votre demande
                (article 6.1.b du RGPD).
              </li>
              <li>
                <strong>Formulaire de contact</strong> : nom, e-mail, sujet, message. Finalité : répondre à votre message. Base
                légale : notre intérêt légitime à répondre aux personnes qui nous écrivent (article 6.1.f).
              </li>
              <li>
                <strong>Paiement</strong> : nom, e-mail, adresse de facturation, prestation achetée, montant et date. Le paiement
                est réalisé sur la page sécurisée de Stripe : nous n&apos;avons jamais accès à vos données de carte. Finalités :
                encaisser le paiement et établir la facture. Bases légales : exécution du contrat (6.1.b) et obligations
                comptables (6.1.c).
              </li>
              <li>
                <strong>Rendez-vous réservé dans l&apos;agenda</strong> (après un paiement) : nom, e-mail, créneau choisi et
                réponses éventuelles, via Calendly. Finalité : planifier votre rendez-vous. Base légale : exécution du contrat
                (6.1.b).
              </li>
              <li>
                <strong>Documents de votre dossier</strong> : pendant l&apos;accompagnement, vous pouvez nous transmettre des
                documents (justificatifs, actes, titres…) afin que nous vérifions votre dossier. Ils servent uniquement à cette
                vérification et ne sont jamais réutilisés. Base légale : exécution du contrat (6.1.b). Ne nous envoyez jamais vos
                mots de passe ni vos codes d&apos;accès aux sites administratifs.
              </li>
            </ul>
            <p>
              Avec chaque demande, nous enregistrons la date et l&apos;heure de votre accord ainsi que la version de cette
              politique en vigueur ({PRIVACY_VERSION}), afin de pouvoir en justifier. Les guides réservés aux clients
              s&apos;ouvrent par un lien personnel qui ne contient aucune donnée vous concernant.
            </p>
          </section>
          <section>
            <h2>Durées de conservation</h2>
            <ul>
              <li>
                Demandes d&apos;appel, de rendez-vous et de contact : {REQUEST_RETENTION_MONTHS} mois après leur réception, puis
                suppression automatique.
              </li>
              <li>
                Données des clients : pendant la durée de l&apos;accompagnement, puis archivage pendant 5 ans (délai de prescription
                en matière civile) en cas de litige.
              </li>
              <li>Documents de votre dossier : supprimés au plus tard 3 mois après la fin de l&apos;accompagnement.</li>
              <li>Factures : 10 ans, conformément aux obligations comptables.</li>
            </ul>
          </section>
          <section>
            <h2>Destinataires et sous-traitants</h2>
            <p>
              Vos données sont destinées uniquement à l&apos;équipe MesDémarches. Nous faisons appel aux prestataires suivants,
              qui agissent pour notre compte et selon nos instructions : Vercel (hébergement du site), Supabase (base de
              données), Stripe (paiement en ligne) et Calendly (prise de rendez-vous). Certains de ces prestataires sont situés
              ou ont accès aux données hors de l&apos;Union européenne, notamment aux États-Unis : ces transferts sont encadrés par
              le Data Privacy Framework UE–États-Unis et/ou par les clauses contractuelles types de la Commission européenne.
            </p>
            <p>Aucune donnée n&apos;est vendue, louée ni utilisée à des fins publicitaires.</p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>
              Le site n&apos;utilise ni cookie publicitaire ni outil de mesure d&apos;audience. Les pages de paiement (Stripe) et
              l&apos;agenda de réservation (Calendly) peuvent déposer leurs propres cookies, nécessaires à leur fonctionnement et
              à la sécurité des paiements. Détail sur la page{" "}
              <Link href={href("/cookies", locale)} className={linkClass}>
                Cookies et stockage local
              </Link>
              .
            </p>
          </section>
          <section>
            <h2>Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
              portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Pour les
              exercer, utilisez la page{" "}
              <Link href={href("/mes-donnees", locale)} className={linkClass}>
                Mes données personnelles
              </Link>{" "}
              ou écrivez-nous depuis l&apos;adresse utilisée lors de votre demande. Nous répondons dans un délai d&apos;un mois. Si
              vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).
            </p>
          </section>
          <section>
            <h2>Sécurité</h2>
            <p>
              Les échanges avec le site sont chiffrés (HTTPS). Les formulaires sont vérifiés côté serveur et protégés contre les
              envois automatisés. Les demandes sont stockées dans une base dont l&apos;accès est réservé à l&apos;équipe : un visiteur
              peut déposer une demande mais jamais lire celles des autres. Les données de carte bancaire sont traitées uniquement
              par Stripe (certifié PCI DSS). Aucune clé secrète n&apos;est exposée dans le navigateur.
            </p>
          </section>
        </>
      ) : (
        <>
          <FrenchVersionPrevails path={PATH} />
          <section>
            <h2>Data controller</h2>
            <p>
              <Value value={id.companyName} missing="company name" />, <Value value={id.address} missing="address" />. For any
              question about your data: <Value value={id.email} missing="contact email address" />.
            </p>
          </section>
          <section>
            <h2>Data processed, purposes and legal bases</h2>
            <ul>
              <li>
                <strong>Call or appointment request</strong> (home page form and Appointment page): name, email, phone
                (optional), chosen need, meeting format, availability, optional message. Purpose: to get back to you and arrange
                the appointment. Legal basis: pre-contractual measures taken at your request (Article 6(1)(b) GDPR).
              </li>
              <li>
                <strong>Contact form</strong>: name, email, subject, message. Purpose: to reply to your message. Legal basis: our
                legitimate interest in replying to people who write to us (Article 6(1)(f)).
              </li>
              <li>
                <strong>Payment</strong>: name, email, billing address, service purchased, amount and date. Payment is made on
                Stripe&apos;s secure page: we never have access to your card details. Purposes: to collect payment and issue the
                invoice. Legal bases: performance of the contract (6(1)(b)) and accounting obligations (6(1)(c)).
              </li>
              <li>
                <strong>Appointment booked in the calendar</strong> (after a payment): name, email, chosen slot and any answers,
                via Calendly. Purpose: to schedule your appointment. Legal basis: performance of the contract (6(1)(b)).
              </li>
              <li>
                <strong>Documents for your file</strong>: during the support, you may send us documents (proofs, certificates,
                permits…) so that we can check your file. They are used only for this check and never reused. Legal basis:
                performance of the contract (6(1)(b)). Never send us your passwords or login codes for government websites.
              </li>
            </ul>
            <p>
              With each request, we record the date and time of your consent and the version of this policy in force (
              {PRIVACY_VERSION}), so that we can demonstrate it. Client guides open through a personal link that contains no data
              about you.
            </p>
          </section>
          <section>
            <h2>Retention periods</h2>
            <ul>
              <li>
                Call, appointment and contact requests: {REQUEST_RETENTION_MONTHS} months after they are received, then automatic
                deletion.
              </li>
              <li>
                Client data: for the duration of the support, then archived for 5 years (civil limitation period) in case of a
                dispute.
              </li>
              <li>Documents for your file: deleted no later than 3 months after the end of the support.</li>
              <li>Invoices: 10 years, in line with accounting obligations.</li>
            </ul>
          </section>
          <section>
            <h2>Recipients and processors</h2>
            <p>
              Your data is intended solely for the MesDémarches team. We use the following providers, who act on our behalf and
              on our instructions: Vercel (website hosting), Supabase (database), Stripe (online payment) and Calendly
              (appointment booking). Some of these providers are located, or access data, outside the European Union, notably in
              the United States: these transfers are covered by the EU–US Data Privacy Framework and/or the European
              Commission&apos;s standard contractual clauses.
            </p>
            <p>No data is sold, rented or used for advertising purposes.</p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>
              The website uses no advertising cookies and no audience measurement tool. The payment pages (Stripe) and the
              booking calendar (Calendly) may place their own cookies, which are necessary for them to work and to secure
              payments. Details on the{" "}
              <Link href={href("/cookies", locale)} className={linkClass}>
                Cookies and local storage
              </Link>{" "}
              page.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p>
              You have the right of access, rectification, erasure, restriction, objection and portability, as well as the right
              to set guidelines on what happens to your data after your death. To exercise them, use the{" "}
              <Link href={href("/mes-donnees", locale)} className={linkClass}>
                My personal data
              </Link>{" "}
              page or write to us from the address used for your request. We reply within one month. If you believe your rights
              are not respected, you may lodge a complaint with the CNIL (cnil.fr).
            </p>
          </section>
          <section>
            <h2>Security</h2>
            <p>
              Communications with the website are encrypted (HTTPS). Forms are checked on the server and protected against
              automated submissions. Requests are stored in a database whose access is reserved for the team: a visitor can
              submit a request but can never read anyone else&apos;s. Card details are processed only by Stripe (PCI DSS
              certified). No secret key is exposed in the browser.
            </p>
          </section>
        </>
      )}
    </LegalDraft>
  );
}
