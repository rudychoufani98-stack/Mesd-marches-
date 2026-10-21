import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_VERSION, REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { alternates, href, type Locale } from "@/i18n";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";
import { FrenchVersionPrevails, legalUpdatedAt } from "./shared";

const PATH = "/confidentialite";

const copy = {
  fr: {
    title: "Politique de confidentialité",
    metaDescription: "Comment MesDémarches collecte, utilise et protège vos données personnelles.",
    description: "Nous collectons le minimum de données nécessaire et ne les vendons jamais.",
  },
  en: {
    title: "Privacy policy",
    metaDescription: "How MesDémarches collects, uses and protects your personal data.",
    description: "We collect only the minimum data necessary and never sell it.",
  },
} as const;

export function privacyMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

const linkClass = "font-medium text-brand-700 underline";

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <LegalDraft title={t.title} description={t.description} updatedAt={legalUpdatedAt[locale]} locale={locale}>
      {locale === "fr" ? (
        <>
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
              strictement nécessaire (détail sur la page{" "}
              <Link href={href("/cookies", locale)} className={linkClass}>
                Cookies et stockage local
              </Link>
              ). Le stockage
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
              <Link href={href("/contact", locale)} className={linkClass}>
                formulaire de contact
              </Link>{" "}
              (sujet « Mes données personnelles ») ou la page{" "}
              <Link href={href("/mes-donnees", locale)} className={linkClass}>
                Mes données personnelles
              </Link>
              , en écrivant depuis l&apos;adresse utilisée lors de votre demande. Nous vous
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
        </>
      ) : (
        <>
          <FrenchVersionPrevails path={PATH} />
          <section>
            <h2>Data controller</h2>
            <p>
              <Placeholder>company name, address, contact</Placeholder>. Contact for questions about your data:{" "}
              <Placeholder>dedicated email address</Placeholder>.
            </p>
          </section>
          <section>
            <h2>Data processed</h2>
            <ul>
              <li>
                <strong>Contact form</strong>: name, email address, subject and message. Purpose: to reply to your request. Legal
                basis: <Placeholder>to be confirmed — pre-contractual measures / legitimate interest</Placeholder>.
              </li>
              <li>
                <strong>Appointment request</strong>: name, email address, chosen offer, format and availability, optional
                message. Purpose: to arrange the appointment. Legal basis: <Placeholder>to be confirmed — pre-contractual measures</Placeholder>.
              </li>
              <li>
                <strong>Action plan and checklists</strong>: your answers and your progress are saved only in your browser&apos;s
                local storage. They are not sent to our servers.
              </li>
            </ul>
            <p>
              With each request, we record the date and time of your consent and the version of this policy in force (
              {PRIVACY_VERSION}), so that we can demonstrate it.
            </p>
            <p>
              We never ask for an identity document, social security number, tax number, bank details or login details for
              government websites. Please do not include any of these in your messages.
            </p>
          </section>
          <section>
            <h2>Retention periods</h2>
            <ul>
              <li>
                Contact and appointment requests: {REQUEST_RETENTION_MONTHS} months after they are received, then automatic
                deletion. <Placeholder>period to be confirmed</Placeholder>
              </li>
              <li>
                Customer data: <Placeholder>duration of the business relationship + applicable limitation period — to be confirmed</Placeholder>.
              </li>
              <li>
                Browser data: you can delete it at any time with the &ldquo;Start again&rdquo; button in the action plan or by
                clearing the site&apos;s data.
              </li>
            </ul>
          </section>
          <section>
            <h2>Recipients and processors</h2>
            <p>
              Your data is intended solely for the MesDémarches team, who alone have access to the management area. Technical
              providers: website hosting (Vercel), database (Supabase){" "}
              <Placeholder>specify the data hosting region, any notification tool used and the safeguards in the event of transfers outside the EU</Placeholder>.
              Internal notifications of new requests contain no personal data. No data is sold or used for advertising purposes.
            </p>
          </section>
          <section>
            <h2>Cookies and audience measurement</h2>
            <p>
              The website does not currently use advertising cookies or any audience measurement tool, and places no cookies on
              visitors&apos; devices. Only the management area reserved for the team uses a strictly necessary login cookie
              (details on the{" "}
              <Link href={href("/cookies", locale)} className={linkClass}>
                Cookies and local storage
              </Link>{" "}
              page). The browser&apos;s local storage is used only to keep your plan and your checklists, at your request. If an
              audience measurement tool is added, this page will be updated and your consent will be obtained where the
              regulations require it.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p>
              You have the rights of access, rectification, erasure, restriction, objection and portability. To exercise them,
              use the{" "}
              <Link href={href("/contact", locale)} className={linkClass}>
                contact form
              </Link>{" "}
              (subject &ldquo;My personal data&rdquo;) or the{" "}
              <Link href={href("/mes-donnees", locale)} className={linkClass}>
                My personal data
              </Link>{" "}
              page, writing from the address used for your request. We will reply within one month. You may also lodge a
              complaint with the CNIL (cnil.fr).
            </p>
          </section>
          <section>
            <h2>Security</h2>
            <p>
              Communications with the website are encrypted (HTTPS). Forms are validated on the server and protected against
              automated submissions. Requests are stored in a database whose access is restricted to the team by strict access
              rules: a visitor can submit a request but can never read anyone else&apos;s. No secret key is exposed in the
              browser.
            </p>
          </section>
        </>
      )}
    </LegalDraft>
  );
}
