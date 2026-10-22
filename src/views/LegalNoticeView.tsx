import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import type { ReactNode } from "react";
import { hostingProvider, legalIdentity as id } from "@/config/legal";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";

function Value({ value, missing }: { value: string; missing: ReactNode }) {
  return value ? <>{value}</> : <Placeholder>{missing}</Placeholder>;
}
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
                Dénomination sociale : <Value value={id.companyName} missing="raison sociale" />
              </li>
              <li>
                Forme juridique et capital social : <Value value={id.legalForm} missing="forme, capital" />
              </li>
              <li>
                Siège social : <Value value={id.address} missing="adresse" />
              </li>
              <li>
                Immatriculation : <Value value={id.registration} missing="RCS / SIREN" />
              </li>
              <li>
                Numéro de TVA intracommunautaire : <Value value={id.vatNumber} missing="le cas échéant" />
              </li>
              <li>
                Directeur ou directrice de la publication : <Value value={id.publicationDirector} missing="nom" />
              </li>
              <li>
                Contact : <Value value={[id.email, id.phone].filter(Boolean).join(" · ")} missing="adresse e-mail et téléphone" />
              </li>
            </ul>
          </section>
          <section>
            <h2>Hébergement</h2>
            <p>
              {hostingProvider.name}, {hostingProvider.address} — {hostingProvider.website}
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
                Company name: <Value value={id.companyName} missing="company name" />
              </li>
              <li>
                Legal form and share capital: <Value value={id.legalForm} missing="legal form, capital" />
              </li>
              <li>
                Registered office: <Value value={id.address} missing="address" />
              </li>
              <li>
                Registration: <Value value={id.registration} missing="RCS / SIREN" />
              </li>
              <li>
                Intra-EU VAT number: <Value value={id.vatNumber} missing="if applicable" />
              </li>
              <li>
                Publication director: <Value value={id.publicationDirector} missing="name" />
              </li>
              <li>
                Contact: <Value value={[id.email, id.phone].filter(Boolean).join(" · ")} missing="email address and telephone number" />
              </li>
            </ul>
          </section>
          <section>
            <h2>Hosting</h2>
            <p>
              {hostingProvider.name}, {hostingProvider.address.replace("États-Unis", "United States")} — {hostingProvider.website}
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
