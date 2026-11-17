import type { Metadata } from "next";
import Link from "next/link";
import { alternates, getDictionary, href, type Locale } from "@/i18n";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { PrintButton } from "@/components/ui/PrintButton";

const PATH = "/professionnels";

const copy = {
  fr: {
    metaTitle: "Notaires, banques, courtiers : travaillons ensemble",
    metaDescription:
      "MesDémarches prépare les nouveaux arrivants à leurs rendez-vous : dossiers organisés, questions préparées, calendrier clair. Parlons d'un partenariat.",
    badge: "Espace professionnels",
    titleStart: "Travaillons ensemble :",
    titleHighlight: "des clients mieux préparés",
    intro:
      "MesDémarches aide les nouveaux arrivants en France à organiser leurs démarches. Quand ils arrivent dans votre étude ou votre agence, leurs documents sont prêts et leurs questions sont claires.",
    contactCta: "Échanger avec nous",
    audiencesTitle: "Pour quels professionnels ?",
    audiences: [
      { title: "Notaires", text: "Achat immobilier, succession, actes de la vie familiale : des clients qui comprennent les étapes et arrivent avec les bonnes pièces." },
      { title: "Banques", text: "Ouverture de compte, premier rendez-vous : des clients préparés, qui savent quelles questions poser et quels justificatifs apporter." },
      { title: "Courtiers", text: "Des personnes qui comprennent le vocabulaire (TAEG, coût total, assurance) avant de rencontrer un professionnel du crédit." },
      { title: "Agences et propriétaires", text: "Des dossiers de location complets, lisibles et rangés, sans pièce abusive demandée ni oubliée." },
    ],
    stepsTitle: "Comment ça fonctionne",
    steps: [
      { title: "Le client vient nous voir", text: "Il nous confie l'organisation de ses démarches." },
      { title: "Nous préparons ensemble", text: "Documents réunis et classés, étapes expliquées, questions notées, calendrier construit." },
      { title: "Il arrive prêt à son rendez-vous", text: "Notaire, banque, courtier : vous gagnez du temps, et le conseil reste le vôtre." },
    ],
    scopeTitle: "Notre périmètre",
    weDoTitle: "Ce que nous faisons pour vos clients",
    weDo: [
      { text: "Organiser les documents du client et vérifier qu'il n'en manque pas pour son rendez-vous" },
      { text: "Expliquer les étapes et le vocabulaire, à partir des sources officielles" },
      { text: "Préparer avec le client la liste de ses questions" },
      { text: "Construire un calendrier réaliste de ses démarches" },
    ],
    weDontTitle: "Ce qui reste votre métier",
    weDont: [
      { text: "Aucun conseil juridique, fiscal ou en crédit : cela reste votre métier" },
      { text: "Aucune transmission des coordonnées d'un client sans son accord exprès" },
    ],
    talkTitle: "Parlons-en",
    talkText:
      "Vous êtes notaire, banquier, courtier ou agent immobilier et vous accompagnez des nouveaux arrivants ? Échangeons sur la façon de travailler ensemble et sur un éventuel partenariat.",
    talkCta: "Proposer un échange",
    methodBefore: "Pour en savoir plus sur notre méthode, consultez",
    methodLink: "Comment ça marche",
  },
  en: {
    metaTitle: "Notaries, banks, brokers: let's work together",
    metaDescription:
      "MesDémarches prepares newcomers for their appointments: organised files, prepared questions, a clear timeline. Let's talk about a partnership.",
    badge: "For professionals",
    titleStart: "Let's work together:",
    titleHighlight: "better-prepared clients",
    intro:
      "MesDémarches helps newcomers to France organise their procedures. When they arrive at your office or agency, their documents are ready and their questions are clear.",
    contactCta: "Talk to us",
    audiencesTitle: "Which professionals is it for?",
    audiences: [
      { title: "Notaries", text: "Property purchases, inheritance, family deeds: clients who understand the steps and arrive with the right documents." },
      { title: "Banks", text: "Opening an account, a first appointment: prepared clients who know which questions to ask and which supporting documents to bring." },
      { title: "Brokers", text: "People who understand the vocabulary (APR, total cost, insurance) before meeting a lending professional." },
      { title: "Agencies and landlords", text: "Complete, clear and well-organised rental applications, with no improper document requested and none forgotten." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "The client comes to us", text: "They entrust us with organising their procedures." },
      { title: "We prepare together", text: "Documents gathered and filed, steps explained, questions noted, timeline built." },
      { title: "They arrive ready for their appointment", text: "Notary, bank, broker: you save time, and the advice remains yours." },
    ],
    scopeTitle: "Our scope",
    weDoTitle: "What we do for your clients",
    weDo: [
      { text: "Organise the client's documents and check that nothing is missing for their appointment" },
      { text: "Explain the steps and the vocabulary, based on official sources" },
      { text: "Prepare the client's list of questions with them" },
      { text: "Build a realistic timeline for their procedures" },
    ],
    weDontTitle: "What remains your job",
    weDont: [
      { text: "No legal, tax or lending advice: that remains your job" },
      { text: "No sharing of a client's contact details without their explicit consent" },
    ],
    talkTitle: "Let's talk",
    talkText:
      "Are you a notary, banker, broker or estate agent working with newcomers? Let's discuss how we could work together and a possible partnership.",
    talkCta: "Suggest a conversation",
    methodBefore: "To find out more about our method, see",
    methodLink: "How it works",
  },
};

export function professionalsMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function ProfessionalsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const contactHref = href("/contact", locale);
  const stepLabel = locale === "en" ? "Step" : "Étape";
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <p className="text-sm font-medium text-brand-700">{t.badge}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            {t.titleStart} {t.titleHighlight}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t.intro}</p>
          <div className="no-print mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactHref} size="lg">
              {t.contactCta}
            </ButtonLink>
            <PrintButton locale={locale} />
          </div>
        </Container>
      </section>

      <Container className="space-y-20 py-16 sm:py-24">
        <section aria-labelledby="pour-qui">
          <h2 id="pour-qui" className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
            {t.audiencesTitle}
          </h2>
          <dl className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.audiences.map((a) => (
              <div key={a.title} className="border-t border-ink/25 pt-5">
                <dt className="font-display text-xl font-semibold leading-tight text-ink">{a.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">{a.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="fonctionnement">
          <h2 id="fonctionnement" className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
            {t.stepsTitle}
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <li key={s.title} className="border-t border-ink/25 pt-5">
                <p className="text-sm font-medium text-brand-700">
                  {stepLabel} {i + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="perimetre" className="grid gap-12 md:grid-cols-2">
          <h2 id="perimetre" className="sr-only">
            {t.scopeTitle}
          </h2>
          {[
            { title: t.weDoTitle, items: t.weDo },
            { title: t.weDontTitle, items: t.weDont },
          ].map((block) => (
            <div key={block.title} className="border-t border-ink/25 pt-5">
              <h3 className="font-display text-xl font-semibold leading-tight text-ink">{block.title}</h3>
              <ul className="mt-5 space-y-3">
                {block.items.map((w) => (
                  <li key={w.text} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-brand-700" />
                    {w.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="parlons-en" className="rounded-md bg-brand-950 p-8 text-white sm:p-12">
          <h2 id="parlons-en" className="font-display text-[1.7rem] font-semibold leading-tight sm:text-[2.1rem]">
            {t.talkTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-100/85">{t.talkText}</p>
          <div className="no-print mt-8">
            <ButtonLink href={contactHref} variant="light" size="lg">
              {t.talkCta}
            </ButtonLink>
          </div>
        </section>

        <p className="text-sm text-muted">
          {getDictionary(locale).footer.disclaimer} {t.methodBefore}{" "}
          <Link href={href("/comment-ca-marche", locale)} className="font-medium text-brand-700 underline">
            {t.methodLink}
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
