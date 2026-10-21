import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";
import { FrenchVersionPrevails, legalUpdatedAt } from "./shared";

const PATH = "/mentions-legales";

const copy = {
  fr: {
    title: "Mentions légales",
    metaDescription: "Mentions légales du site MesDémarches.",
    description: "Informations sur l'éditeur et l'hébergeur du site.",
  },
  en: {
    title: "Legal notice",
    metaDescription: "Legal notice for the MesDémarches website.",
    description: "Information about the publisher and the host of the website.",
  },
} as const;

export function legalNoticeMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function LegalNoticeView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const disclaimer = getDictionary(locale).footer.disclaimer;
  return (
    <LegalDraft title={t.title} description={t.description} updatedAt={legalUpdatedAt[locale]} locale={locale}>
      {locale === "fr" ? (
        <>
          <section>
            <h2>Éditeur du site</h2>
            <ul>
              <li>
                Dénomination sociale : <Placeholder>raison sociale</Placeholder>
              </li>
              <li>
                Forme juridique et capital social : <Placeholder>forme, capital</Placeholder>
              </li>
              <li>
                Siège social : <Placeholder>adresse</Placeholder>
              </li>
              <li>
                Immatriculation : <Placeholder>RCS / SIREN</Placeholder>
              </li>
              <li>
                Numéro de TVA intracommunautaire : <Placeholder>le cas échéant</Placeholder>
              </li>
              <li>
                Directeur ou directrice de la publication : <Placeholder>nom</Placeholder>
              </li>
              <li>
                Contact : <Placeholder>adresse e-mail et téléphone</Placeholder>
              </li>
            </ul>
          </section>
          <section>
            <h2>Hébergement</h2>
            <p>
              <Placeholder>nom, adresse et téléphone de l&apos;hébergeur</Placeholder>
            </p>
          </section>
          <section>
            <h2>Nature du service</h2>
            <p>{disclaimer}</p>
            <p>
              Les informations publiées sont générales et pédagogiques. Elles ne constituent pas un conseil juridique, fiscal ou
              financier, et ne remplacent pas l&apos;information délivrée par les organismes compétents.
            </p>
          </section>
          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              Les contenus, le nom et le logo MesDémarches sont la propriété de l&apos;éditeur, sous réserve de la vérification de
              la disponibilité de la marque. Les liens vers des sites officiels renvoient vers des contenus qui restent la propriété
              de leurs éditeurs respectifs.
            </p>
          </section>
          <section>
            <h2>Liens externes</h2>
            <p>
              Le site renvoie vers des sites publics. MesDémarches n&apos;est pas responsable de leur contenu, qui peut évoluer.
            </p>
          </section>
        </>
      ) : (
        <>
          <FrenchVersionPrevails path={PATH} />
          <section>
            <h2>Website publisher</h2>
            <ul>
              <li>
                Company name: <Placeholder>company name</Placeholder>
              </li>
              <li>
                Legal form and share capital: <Placeholder>legal form, capital</Placeholder>
              </li>
              <li>
                Registered office: <Placeholder>address</Placeholder>
              </li>
              <li>
                Registration: <Placeholder>RCS / SIREN</Placeholder>
              </li>
              <li>
                Intra-EU VAT number: <Placeholder>if applicable</Placeholder>
              </li>
              <li>
                Publication director: <Placeholder>name</Placeholder>
              </li>
              <li>
                Contact: <Placeholder>email address and telephone number</Placeholder>
              </li>
            </ul>
          </section>
          <section>
            <h2>Hosting</h2>
            <p>
              <Placeholder>name, address and telephone number of the host</Placeholder>
            </p>
          </section>
          <section>
            <h2>Nature of the service</h2>
            <p>{disclaimer}</p>
            <p>
              The information published is general and educational. It does not constitute legal, tax or financial advice, and
              does not replace the information provided by the relevant authorities.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              The content, the MesDémarches name and the logo are the property of the publisher, subject to verification of the
              availability of the trade mark. Links to official websites lead to content that remains the property of its
              respective publishers.
            </p>
          </section>
          <section>
            <h2>External links</h2>
            <p>
              The website links to public websites. MesDémarches is not responsible for their content, which may change.
            </p>
          </section>
        </>
      )}
    </LegalDraft>
  );
}
