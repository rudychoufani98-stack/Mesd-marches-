import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice, type Offer } from "@/config/pricing";
import { getOffers } from "@/lib/data/content";
import { siteConfig } from "@/config/site";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Les réponses aux questions les plus fréquentes sur MesDémarches : service, tarifs, données personnelles.",
  alternates: { canonical: "/faq" },
};

function buildFaqs(offers: Offer[]): { q: string; a: React.ReactNode; text: string }[] {
  return [
  {
    q: "MesDémarches est-il un site officiel ?",
    text: `Non. ${siteConfig.disclaimer} Les démarches officielles se font sur les sites des organismes publics, vers lesquels nous vous orientons.`,
    a: (
      <>
        Non. {siteConfig.disclaimer} Les démarches officielles se font sur les sites des organismes publics, vers lesquels
        nous vous orientons.
      </>
    ),
  },
  {
    q: "Les guides et le plan d'action sont-ils gratuits ?",
    text: "Oui. Les guides, les checklists, le plan d'action et l'outil de budget sont gratuits et sans inscription.",
    a: <>Oui. Les guides, les checklists, le plan d&apos;action et l&apos;outil de budget sont gratuits et sans inscription.</>,
  },
  {
    q: "Combien coûte l'accompagnement ?",
    text: `Nos offres : ${offers.map((o) => `${o.name} (${formatPrice(o)})`).join(", ")}.`,
    a: (
      <>
        Nos offres : {offers.map((o) => `${o.name} (${formatPrice(o)})`).join(", ")}. Le détail figure sur la{" "}
        <Link href="/tarifs" className="font-medium text-brand-700 underline">
          page Tarifs
        </Link>
        .
      </>
    ),
  },
  {
    q: "Êtes-vous payés par des banques, des courtiers ou des notaires ?",
    text: `Non. ${siteConfig.independence}`,
    a: <>Non. {siteConfig.independence}</>,
  },
  {
    q: "Faites-vous les démarches à ma place ?",
    text: "Non. Nous vous aidons à comprendre, organiser et planifier vos démarches, mais vous les réalisez vous-même auprès des organismes compétents.",
    a: <>Non. Nous vous aidons à comprendre, organiser et planifier vos démarches, mais vous les réalisez vous-même auprès des organismes compétents.</>,
  },
  {
    q: "Pouvez-vous me dire à quoi j'ai droit ou quelles sont mes obligations ?",
    text: "Non. Seuls les organismes compétents peuvent déterminer vos droits et obligations. Nous vous indiquons où vous renseigner.",
    a: <>Non. Seuls les organismes compétents peuvent déterminer vos droits et obligations. Nous vous indiquons où vous renseigner.</>,
  },
  {
    q: "Mes réponses au questionnaire sont-elles envoyées quelque part ?",
    text: "Non. Votre plan d'action et votre progression sont enregistrés uniquement dans votre navigateur.",
    a: <>Non. Votre plan d&apos;action et votre progression sont enregistrés uniquement dans votre navigateur.</>,
  },
  {
    q: "Me demanderez-vous mes mots de passe ?",
    text: "Jamais. Ne communiquez vos identifiants de connexion aux sites administratifs à personne.",
    a: <>Jamais. Ne communiquez vos identifiants de connexion aux sites administratifs à personne.</>,
  },
  {
    q: "Existe-t-il un accompagnement public gratuit ?",
    text: "Oui. Les espaces France services proposent un accompagnement public et gratuit pour de nombreuses démarches.",
    a: (
      <>
        Oui. Les espaces France services proposent un accompagnement public et gratuit pour de nombreuses démarches (
        <a href="https://www.france-services.gouv.fr/" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">
          france-services.gouv.fr
        </a>
        ).
      </>
    ),
  },
  ];
}

export default async function FaqPage() {
  const faqs = buildFaqs(await getOffers());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.text } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow="FAQ" title="Questions fréquentes" />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl divide-y divide-line rounded-card border border-line bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                <h2 className="text-base">{f.q}</h2>
                <span className="text-xl text-brand-700 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Vous n&apos;avez pas trouvé votre réponse ?{" "}
          <Link href="/contact" className="font-medium text-brand-700 underline">
            Contactez-nous
          </Link>
        </p>
      </Container>
    </>
  );
}
