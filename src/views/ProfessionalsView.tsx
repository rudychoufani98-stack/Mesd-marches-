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
    titleHighlight: "des clients mieux préparés.",
    intro:
      "MesDémarches aide les nouveaux arrivants en France à organiser leurs démarches. Quand ils arrivent dans votre étude ou votre agence, leurs documents sont prêts et leurs questions sont claires.",
    contactCta: "Échanger avec nous",
    audiencesTitle: "Pour quels professionnels ?",
    audiences: [
      { emoji: "⚖️", title: "Notaires", text: "Achat immobilier, succession, actes de la vie familiale : des clients qui comprennent les étapes et arrivent avec les bonnes pièces." },
      { emoji: "🏦", title: "Banques", text: "Ouverture de compte, premier rendez-vous : des clients préparés, qui savent quelles questions poser et quels justificatifs apporter." },
      { emoji: "🤝", title: "Courtiers", text: "Des personnes qui comprennent le vocabulaire (TAEG, coût total, assurance) avant de rencontrer un professionnel du crédit." },
      { emoji: "🔑", title: "Agences et propriétaires", text: "Des dossiers de location complets, lisibles et rangés, sans pièce abusive demandée ni oubliée." },
    ],
    stepsTitle: "Comment ça fonctionne",
    steps: [
      { emoji: "👋", title: "Le client vient nous voir", text: "Il nous confie l'organisation de ses démarches." },
      { emoji: "🧭", title: "Nous préparons ensemble", text: "Documents réunis et classés, étapes expliquées, questions notées, calendrier construit." },
      { emoji: "🏛️", title: "Il arrive prêt à son rendez-vous", text: "Notaire, banque, courtier : vous gagnez du temps, et le conseil reste le vôtre." },
    ],
    scopeTitle: "Notre périmètre",
    weDoTitle: "Ce que nous faisons pour vos clients",
    weDo: [
      { emoji: "🗂️", text: "Organiser les documents du client et vérifier qu'il n'en manque pas pour son rendez-vous" },
      { emoji: "📖", text: "Expliquer les étapes et le vocabulaire, à partir des sources officielles" },
      { emoji: "📝", text: "Préparer avec le client la liste de ses questions" },
      { emoji: "🗓️", text: "Construire un calendrier réaliste de ses démarches" },
    ],
    weDontTitle: "Ce qui reste votre métier",
    weDont: [
      { emoji: "⚖️", text: "Aucun conseil juridique, fiscal ou en crédit : cela reste votre métier" },
      { emoji: "🔒", text: "Aucune transmission des coordonnées d'un client sans son accord exprès" },
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
    titleHighlight: "better-prepared clients.",
    intro:
      "MesDémarches helps newcomers to France organise their procedures. When they arrive at your office or agency, their documents are ready and their questions are clear.",
    contactCta: "Talk to us",
    audiencesTitle: "Which professionals is it for?",
    audiences: [
      { emoji: "⚖️", title: "Notaries", text: "Property purchases, inheritance, family deeds: clients who understand the steps and arrive with the right documents." },
      { emoji: "🏦", title: "Banks", text: "Opening an account, a first appointment: prepared clients who know which questions to ask and which supporting documents to bring." },
      { emoji: "🤝", title: "Brokers", text: "People who understand the vocabulary (APR, total cost, insurance) before meeting a lending professional." },
      { emoji: "🔑", title: "Agencies and landlords", text: "Complete, clear and well-organised rental applications, with no improper document requested and none forgotten." },
    ],
    stepsTitle: "How it works",
    steps: [
      { emoji: "👋", title: "The client comes to us", text: "They entrust us with organising their procedures." },
      { emoji: "🧭", title: "We prepare together", text: "Documents gathered and filed, steps explained, questions noted, timeline built." },
      { emoji: "🏛️", title: "They arrive ready for their appointment", text: "Notary, bank, broker: you save time, and the advice remains yours." },
    ],
    scopeTitle: "Our scope",
    weDoTitle: "What we do for your clients",
    weDo: [
      { emoji: "🗂️", text: "Organise the client's documents and check that nothing is missing for their appointment" },
      { emoji: "📖", text: "Explain the steps and the vocabulary, based on official sources" },
      { emoji: "📝", text: "Prepare the client's list of questions with them" },
      { emoji: "🗓️", text: "Build a realistic timeline for their procedures" },
    ],
    weDontTitle: "What remains your job",
    weDont: [
      { emoji: "⚖️", text: "No legal, tax or lending advice: that remains your job" },
      { emoji: "🔒", text: "No sharing of a client's contact details without their explicit consent" },
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
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <Container className="py-14 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-sm font-medium text-brand-800">
            <span aria-hidden="true">🤝</span> {t.badge}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            {t.titleStart} <span className="text-brand-700">{t.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t.intro}</p>
          <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactHref} size="lg">
              <span aria-hidden="true">✉️</span> {t.contactCta}
            </ButtonLink>
            <PrintButton locale={locale} />
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-14 sm:py-20">
        <section aria-labelledby="pour-qui">
          <h2 id="pour-qui" className="text-2xl font-bold text-ink sm:text-3xl">
            {t.audiencesTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.audiences.map((a) => (
              <div key={a.title} className="rounded-card border border-line bg-white p-5">
                <span className="text-3xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="fonctionnement">
          <h2 id="fonctionnement" className="text-2xl font-bold text-ink sm:text-3xl">
            {t.stepsTitle}
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-card border border-line bg-white p-6">
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-3xl" aria-hidden="true">
                  {s.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="perimetre" className="grid gap-6 md:grid-cols-2">
          <h2 id="perimetre" className="sr-only">
            {t.scopeTitle}
          </h2>
          <div className="rounded-card border border-accent-200 bg-accent-50/50 p-6">
            <h3 className="text-lg font-bold text-ink">{t.weDoTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.weDo.map((w) => (
                <li key={w.text} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden="true">{w.emoji}</span> {w.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-white p-6">
            <h3 className="text-lg font-bold text-ink">{t.weDontTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.weDont.map((w) => (
                <li key={w.text} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden="true">{w.emoji}</span> {w.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="parlons-en" className="rounded-card bg-brand-900 p-6 text-white sm:p-10">
          <h2 id="parlons-en" className="text-2xl font-bold sm:text-3xl">
            {t.talkTitle} <span aria-hidden="true">💬</span>
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-brand-100">{t.talkText}</p>
          <div className="no-print mt-6">
            <ButtonLink href={contactHref} variant="secondary">
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
