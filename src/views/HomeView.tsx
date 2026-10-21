import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { categories } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, getDictionary, href, type Locale } from "@/i18n";
import { getActiveDomains } from "@/lib/data/content";
import { CategoryCard } from "@/components/home/CategoryCard";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";

const copy = {
  fr: {
    badge: "Bienvenue ! Service privé et indépendant d'accompagnement",
    title: "Vos démarches en France, ",
    titleAccent: "en toute simplicité.",
    subtitle:
      "Un plan clair, des étapes organisées et des ressources utiles pour avancer sereinement dans vos démarches administratives.",
    chips: [
      { emoji: "✅", label: "Checklists à cocher" },
      { emoji: "🗓️", label: "Calendrier clair" },
      { emoji: "🔗", label: "Sources officielles" },
    ],
    chipsLabel: "Points forts",
    cta: "Organiser mes démarches",
    ctaSecondary: "Découvrir nos services",
    free: "Plan d'action et guides gratuits, sans inscription.",
    forWhoEyebrow: "Pour qui ?",
    forWhoTitle: "Vous vous reconnaissez ?",
    audiences: [
      { emoji: "🧳", title: "Vous arrivez en France", text: "Logement, compte bancaire, assurance maladie : par quoi commencer ?" },
      { emoji: "💼", title: "Vous commencez un emploi", text: "Documents d'embauche, fiche de paie, prélèvement à la source." },
      { emoji: "🎓", title: "Vous êtes étudiant·e", text: "Les bons sites, les bonnes étapes, sans vous perdre." },
      { emoji: "👨‍👩‍👧", title: "Vous organisez votre famille", text: "École, déménagement, contrats du quotidien." },
    ],
    howEyebrow: "Comment ça marche ?",
    howTitle: "Trois étapes pour y voir clair",
    stepLabel: "Étape",
    steps: [
      {
        emoji: "💬",
        title: "Vous décrivez votre situation",
        text: "Cinq questions simples sur votre objectif, votre délai et les domaines qui vous concernent. Aucun document demandé.",
      },
      {
        emoji: "🗺️",
        title: "Vous recevez un plan d'action clair",
        text: "Les tâches dans un ordre logique, avec les documents à préparer et les liens vers les sources officielles.",
      },
      { emoji: "✅", title: "Vous avancez étape par étape", text: "Cochez vos tâches, suivez votre progression et consultez les guides à votre rythme." },
    ],
    tryFree: "Essayer gratuitement",
    domainsEyebrow: "Nos domaines d'accompagnement",
    domainsTitle: "Toutes vos démarches, rangées par thème",
    domainsText: "Choisissez un domaine pour découvrir les guides, les outils et l'accompagnement proposés.",
    whyEyebrow: "Pourquoi MesDémarches ?",
    whyTitle: "Une méthode simple, honnête et à votre rythme",
    reasons: [
      { emoji: "🧭", title: "Un parcours structuré", text: "Des étapes claires, dans un ordre logique, pour savoir quoi faire et quand." },
      { emoji: "📖", title: "Des explications simples", text: "Un vocabulaire accessible et des glossaires pour chaque notion." },
      { emoji: "🔗", title: "Les sources officielles", text: "Chaque guide renvoie vers les sites publics qui font référence." },
      { emoji: "🙋", title: "Un humain si besoin", text: "Les guides sont gratuits. Un rendez-vous est possible quand vous le souhaitez." },
      { emoji: "💶", title: "Des tarifs transparents", text: "Ce qui est inclus et ce qui ne l'est pas est écrit noir sur blanc." },
      { emoji: "🔒", title: "Vos données protégées", text: "Aucun cookie publicitaire, votre plan reste sur votre appareil." },
    ],
    startTitle: "Par où commencer ?",
    startText: "Décrivez les démarches que vous devez organiser et découvrez les prochaines étapes possibles.",
    startCta: "Créer mon plan d'action",
  },
  en: {
    badge: "Welcome! An independent, private support service",
    title: "Your paperwork in France, ",
    titleAccent: "made simple.",
    subtitle: "A clear plan, organised steps and useful resources to move forward calmly with your administrative procedures.",
    chips: [
      { emoji: "✅", label: "Tick-off checklists" },
      { emoji: "🗓️", label: "Clear timeline" },
      { emoji: "🔗", label: "Official sources" },
    ],
    chipsLabel: "Highlights",
    cta: "Organise my paperwork",
    ctaSecondary: "Discover our services",
    free: "Free action plan and guides, no sign-up needed.",
    forWhoEyebrow: "Who is it for?",
    forWhoTitle: "Does this sound like you?",
    audiences: [
      { emoji: "🧳", title: "You're moving to France", text: "Housing, bank account, health insurance: where do you start?" },
      { emoji: "💼", title: "You're starting a job", text: "Hiring documents, payslip (fiche de paie), withholding tax." },
      { emoji: "🎓", title: "You're a student", text: "The right websites and the right steps, without getting lost." },
      { emoji: "👨‍👩‍👧", title: "You're organising your family", text: "School, moving house, everyday contracts." },
    ],
    howEyebrow: "How does it work?",
    howTitle: "Three steps to see clearly",
    stepLabel: "Step",
    steps: [
      {
        emoji: "💬",
        title: "You describe your situation",
        text: "Five simple questions about your goal, your timeframe and the areas that concern you. No documents required.",
      },
      {
        emoji: "🗺️",
        title: "You get a clear action plan",
        text: "Tasks in a logical order, with the documents to prepare and links to official sources.",
      },
      { emoji: "✅", title: "You move forward step by step", text: "Tick off your tasks, track your progress and read the guides at your own pace." },
    ],
    tryFree: "Try it for free",
    domainsEyebrow: "What we can help with",
    domainsTitle: "All your procedures, organised by topic",
    domainsText: "Choose a topic to discover the guides, tools and support available.",
    whyEyebrow: "Why MesDémarches?",
    whyTitle: "A simple, honest method, at your own pace",
    reasons: [
      { emoji: "🧭", title: "A structured path", text: "Clear steps, in a logical order, so you know what to do and when." },
      { emoji: "📖", title: "Simple explanations", text: "Plain language and glossaries for every key term." },
      { emoji: "🔗", title: "Official sources", text: "Every guide links to the public websites that are the reference." },
      { emoji: "🙋", title: "A real person if needed", text: "The guides are free. You can book an appointment whenever you like." },
      { emoji: "💶", title: "Transparent pricing", text: "What's included and what isn't is written down in black and white." },
      { emoji: "🔒", title: "Your data protected", text: "No advertising cookies; your plan stays on your device." },
    ],
    startTitle: "Where do I start?",
    startText: "Describe the procedures you need to organise and discover the possible next steps.",
    startCta: "Create my action plan",
  },
};

export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    title: { absolute: t.site.defaultTitle },
    description: t.site.description,
    alternates: alternates("/", locale),
    openGraph: { locale: locale === "en" ? "en_GB" : "fr_FR", title: t.site.defaultTitle, description: t.site.description },
  };
}

export async function HomeView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const dict = getDictionary(locale);
  const domains = await getActiveDomains(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
              <span aria-hidden="true">👋</span> {c.badge}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {c.title}
              <span className="text-brand-700">{c.titleAccent}</span> <span aria-hidden="true">✨</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{c.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={c.chipsLabel}>
              {c.chips.map((chip) => (
                <li key={chip.label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-line">
                  <span aria-hidden="true">{chip.emoji}</span> {chip.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href("/plan-action", locale)} size="lg">
                <span aria-hidden="true">🚀</span> {c.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={href("/services", locale)} size="lg" variant="secondary">
                {c.ctaSecondary}
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              <span aria-hidden="true">🎁</span> {c.free}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroIllustration />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16" aria-labelledby="pour-qui">
        <Container>
          <div id="pour-qui">
            <SectionHeading eyebrow={c.forWhoEyebrow} title={c.forWhoTitle} align="center" />
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.audiences.map((a) => (
              <li key={a.title} className="rounded-card border border-line bg-white p-5 text-center transition-shadow hover:shadow-[0_12px_30px_rgba(22,32,58,0.07)]">
                <span className="text-4xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="comment">
        <Container>
          <div id="comment">
            <SectionHeading eyebrow={c.howEyebrow} title={c.howTitle} align="center" />
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {c.steps.map((step, i) => (
              <li key={step.title} className="relative rounded-card border border-line bg-white p-6">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-2xl" aria-hidden="true">
                  {step.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  <span className="sr-only">
                    {c.stepLabel} {i + 1} :{" "}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ButtonLink href={href("/plan-action", locale)} size="lg">
              {c.tryFree} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={c.domainsEyebrow} title={c.domainsTitle} description={c.domainsText} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((raw) => {
              const category = localizeCategory(raw, locale);
              const domain = domains.find((d) => d.category === raw.id);
              return (
                <CategoryCard
                  key={raw.id}
                  category={category}
                  href={href(domain ? `/services/${domain.slug}` : "/services", locale)}
                  ctaLabel={locale === "en" ? "Discover" : "Découvrir"}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-900 py-16 text-white sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-300">{c.whyEyebrow}</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{c.whyTitle}</h2>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.reasons.map((r) => (
              <li key={r.title} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl" aria-hidden="true">
                  {r.emoji}
                </span>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-200">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm text-brand-300">{dict.footer.disclaimer}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-[1.5rem] border border-line bg-gradient-to-br from-brand-50 to-accent-50 px-6 py-12 text-center sm:px-12">
            <span className="text-4xl" aria-hidden="true">
              🧭
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{c.startTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">{c.startText}</p>
            <ButtonLink href={href("/plan-action", locale)} size="lg" className="mt-7">
              {c.startCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
