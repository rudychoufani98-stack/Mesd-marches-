import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Offer } from "@/config/pricing";
import { getOffers } from "@/lib/data/content";
import { alternates, getDictionary, href, type Locale } from "@/i18n";
import { Container, PageHeader } from "@/components/ui/primitives";
import { formatOfferPrice } from "./shared";

const PATH = "/faq";

const copy = {
  fr: {
    title: "Questions fréquentes",
    metaDescription: "Les réponses aux questions les plus fréquentes sur MesDémarches : service, tarifs, données personnelles.",
    eyebrow: "FAQ",
    notFound: "Vous n'avez pas trouvé votre réponse ?",
    contact: "Contactez-nous",
  },
  en: {
    title: "Frequently asked questions",
    metaDescription: "Answers to the most frequently asked questions about MesDémarches: service, pricing, personal data.",
    eyebrow: "FAQ",
    notFound: "Didn't find your answer?",
    contact: "Contact us",
  },
} as const;

const linkClass = "font-medium text-brand-700 underline";

type Faq = { q: string; a: ReactNode; text: string };

function buildFaqs(offers: Offer[], locale: Locale): Faq[] {
  const disclaimer = getDictionary(locale).footer.disclaimer;
  const offerList = offers.map((o) => `${o.name} (${formatOfferPrice(o, locale)})`).join(", ");
  const franceServicesLink = (
    <a href="https://www.france-services.gouv.fr/" target="_blank" rel="noopener noreferrer" className={linkClass}>
      france-services.gouv.fr
    </a>
  );

  if (locale === "en") {
    return [
      {
        q: "Is MesDémarches an official website?",
        text: `No. ${disclaimer} Official procedures are carried out on the websites of public bodies, to which we direct you.`,
        a: (
          <>
            No. {disclaimer} Official procedures are carried out on the websites of public bodies, to which we direct you.
          </>
        ),
      },
      {
        q: "Are the guides and the action plan free?",
        text: "Yes. The guides, checklists, action plan and budget tool are free and require no sign-up.",
        a: <>Yes. The guides, checklists, action plan and budget tool are free and require no sign-up.</>,
      },
      {
        q: "How much does the support cost?",
        text: `Our offers: ${offerList}.`,
        a: (
          <>
            Our offers: {offerList}. Full details are on the{" "}
            <Link href={href("/tarifs", locale)} className={linkClass}>
              Pricing page
            </Link>
            .
          </>
        ),
      },
      {
        q: "Do you carry out the procedures for me?",
        text: "No. We help you understand, organise and plan your procedures, but you carry them out yourself with the relevant bodies.",
        a: <>No. We help you understand, organise and plan your procedures, but you carry them out yourself with the relevant bodies.</>,
      },
      {
        q: "Can you tell me what I am entitled to or what my obligations are?",
        text: "No. Only the relevant bodies can determine your rights and obligations. We tell you where to find out.",
        a: <>No. Only the relevant bodies can determine your rights and obligations. We tell you where to find out.</>,
      },
      {
        q: "Are my answers to the questionnaire sent anywhere?",
        text: "No. Your action plan and your progress are saved only in your browser.",
        a: <>No. Your action plan and your progress are saved only in your browser.</>,
      },
      {
        q: "Will you ask for my passwords?",
        text: "Never. Do not share your login details for government websites with anyone.",
        a: <>Never. Do not share your login details for government websites with anyone.</>,
      },
      {
        q: "Is there free public support?",
        text: "Yes. France services centres offer free public support for many procedures.",
        a: <>Yes. France services centres offer free public support for many procedures ({franceServicesLink}).</>,
      },
    ];
  }

  return [
    {
      q: "MesDémarches est-il un site officiel ?",
      text: `Non. ${disclaimer} Les démarches officielles se font sur les sites des organismes publics, vers lesquels nous vous orientons.`,
      a: (
        <>
          Non. {disclaimer} Les démarches officielles se font sur les sites des organismes publics, vers lesquels
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
      text: `Nos offres : ${offerList}.`,
      a: (
        <>
          Nos offres : {offerList}. Le détail figure sur la{" "}
          <Link href={href("/tarifs", locale)} className={linkClass}>
            page Tarifs
          </Link>
          .
        </>
      ),
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
          {franceServicesLink}).
        </>
      ),
    },
  ];
}

export function faqMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export async function FaqView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const faqs = buildFaqs(await getOffers(locale), locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "en" ? "en-GB" : "fr-FR",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.text } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow={t.eyebrow} title={t.title} />
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
          {t.notFound}{" "}
          <Link href={href("/contact", locale)} className={linkClass}>
            {t.contact}
          </Link>
        </p>
      </Container>
    </>
  );
}
