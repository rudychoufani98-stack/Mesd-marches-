import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/content/categories";
import { getActiveDomains } from "@/lib/data/content";
import { CategoryCard } from "@/components/home/CategoryCard";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";

const steps = [
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
  {
    emoji: "✅",
    title: "Vous avancez étape par étape",
    text: "Cochez vos tâches, suivez votre progression et consultez les guides à votre rythme.",
  },
];

const audiences = [
  { emoji: "🧳", title: "Vous arrivez en France", text: "Logement, compte bancaire, assurance maladie : par quoi commencer ?" },
  { emoji: "💼", title: "Vous commencez un emploi", text: "Documents d'embauche, fiche de paie, prélèvement à la source." },
  { emoji: "🎓", title: "Vous êtes étudiant·e", text: "Les bons sites, les bonnes étapes, sans vous perdre." },
  { emoji: "👨‍👩‍👧", title: "Vous organisez votre famille", text: "École, déménagement, contrats du quotidien." },
];

const reasons = [
  { emoji: "🧭", title: "Un parcours structuré", text: "Des étapes claires, dans un ordre logique, pour savoir quoi faire et quand." },
  { emoji: "📖", title: "Des explications simples", text: "Un vocabulaire accessible et des glossaires pour chaque notion." },
  { emoji: "🔗", title: "Les sources officielles", text: "Chaque guide renvoie vers les sites publics qui font référence." },
  { emoji: "🙋", title: "Un humain si besoin", text: "Les guides sont gratuits. Un rendez-vous est possible quand vous le souhaitez." },
  { emoji: "💶", title: "Des tarifs transparents", text: "Ce qui est inclus et ce qui ne l'est pas est écrit noir sur blanc." },
  { emoji: "🔒", title: "Vos données protégées", text: "Aucun cookie publicitaire, votre plan reste sur votre appareil." },
];

const heroChips = [
  { emoji: "✅", label: "Checklists à cocher" },
  { emoji: "🗓️", label: "Calendrier clair" },
  { emoji: "🔗", label: "Sources officielles" },
];

export default async function HomePage() {
  const domains = await getActiveDomains();

  return (
    <>
      {/* Section principale */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
              <span aria-hidden="true">👋</span> Bienvenue ! Service privé et indépendant d&apos;accompagnement
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Vos démarches en France, <span className="text-brand-700">en toute simplicité.</span>{" "}
              <span aria-hidden="true">✨</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Un plan clair, des étapes organisées et des ressources utiles pour avancer sereinement dans vos démarches
              administratives.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Points forts">
              {heroChips.map((c) => (
                <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-line">
                  <span aria-hidden="true">{c.emoji}</span> {c.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/plan-action" size="lg">
                <span aria-hidden="true">🚀</span> Organiser mes démarches <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                Découvrir nos services
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              <span aria-hidden="true">🎁</span> Plan d&apos;action et guides gratuits, sans inscription.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroIllustration />
          </div>
        </Container>
      </section>

      {/* Pour qui */}
      <section className="py-14 sm:py-16" aria-labelledby="pour-qui">
        <Container>
          <div id="pour-qui">
            <SectionHeading eyebrow="Pour qui ?" title="Vous vous reconnaissez ?" align="center" />
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
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

      {/* Comment ça marche */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="comment">
        <Container>
          <div id="comment">
            <SectionHeading eyebrow="Comment ça marche ?" title="Trois étapes pour y voir clair" align="center" />
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-card border border-line bg-white p-6">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-2xl" aria-hidden="true">
                  {step.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ButtonLink href="/plan-action" size="lg">
              Essayer gratuitement <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Domaines */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Nos domaines d'accompagnement"
            title="Toutes vos démarches, rangées par thème"
            description="Choisissez un domaine pour découvrir les guides, les outils et l'accompagnement proposés."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const domain = domains.find((d) => d.category === c.id);
              return <CategoryCard key={c.id} category={c} href={domain ? `/services/${domain.slug}` : "/services"} />;
            })}
          </div>
        </Container>
      </section>

      {/* Indépendance */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid items-center gap-6 rounded-[1.5rem] border border-accent-200 bg-accent-50/60 p-6 sm:p-10 md:grid-cols-[auto_1fr]">
            <span className="text-5xl" aria-hidden="true">
              🤝
            </span>
            <div>
              <h2 className="text-2xl font-bold text-ink">Un conseil 100 % indépendant</h2>
              <p className="mt-2 leading-relaxed text-ink">{siteConfig.independence}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pourquoi */}
      <section className="bg-brand-900 py-16 text-white sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-300">Pourquoi MesDémarches ?</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Une méthode simple, honnête et à votre rythme</h2>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
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
          <p className="mt-10 max-w-3xl text-sm text-brand-300">{siteConfig.disclaimer}</p>
        </Container>
      </section>

      {/* Appel à l'action */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-[1.5rem] border border-line bg-gradient-to-br from-brand-50 to-accent-50 px-6 py-12 text-center sm:px-12">
            <span className="text-4xl" aria-hidden="true">
              🧭
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Par où commencer ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Décrivez les démarches que vous devez organiser et découvrez les prochaines étapes possibles.
            </p>
            <ButtonLink href="/plan-action" size="lg" className="mt-7">
              Créer mon plan d&apos;action <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
