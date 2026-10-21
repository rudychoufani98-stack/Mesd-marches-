import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalDraft, Placeholder } from "@/components/ui/LegalDraft";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site MesDémarches.",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalNoticePage() {
  return (
    <LegalDraft title="Mentions légales" description="Informations sur l'éditeur et l'hébergeur du site." updatedAt="21 octobre 2026">
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
        <p>{siteConfig.disclaimer}</p>
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
    </LegalDraft>
  );
}
