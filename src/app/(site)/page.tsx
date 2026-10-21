import { ArrowRight, BookOpenCheck, ExternalLink, HandHeart, ListChecks, Map as MapIcon, MessageSquareText, Receipt, Route } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/content/categories";
import { getActiveDomains } from "@/lib/data/content";
import { CategoryCard } from "@/components/home/CategoryCard";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";

const steps = [
  {
    icon: MessageSquareText,
    title: "Vous décrivez votre situation",
    text: "Quelques questions simples sur votre objectif, votre délai et les domaines qui vous concernent. Aucun document n'est demandé.",
  },
  {
    icon: MapIcon,
    title: "Vous recevez un plan d'action organisé",
    text: "Les tâches sont classées dans un ordre logique, avec les documents à préparer et les liens vers les sources officielles.",
  },
  {
    icon: ListChecks,
    title: "Vous avancez étape par étape",
    text: "Cochez vos tâches, suivez votre progression et consultez les guides pratiques à votre rythme.",
  },
];

const reasons = [
  { icon: Route, title: "Un parcours structuré", text: "Des étapes claires, dans un ordre logique, pour savoir quoi faire et quand." },
  { icon: BookOpenCheck, title: "Des explications accessibles", text: "Un vocabulaire simple et des glossaires pour comprendre chaque notion." },
  { icon: ExternalLink, title: "Des liens vers les sources officielles", text: "Chaque guide renvoie vers les sites publics qui font référence." },
  { icon: HandHeart, title: "Un accompagnement humain en option", text: "Les guides sont gratuits. Un rendez-vous est possible si vous le souhaitez." },
  {
    icon: Receipt,
    title: "Des tarifs et des limites transparents",
    text: "Ce qui est inclus et ce qui ne l'est pas est indiqué clairement, avant toute demande.",
  },
];

export default async function HomePage() {
  const domains = await getActiveDomains();
  return (
    <>
      {/* Section principale */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
              Service privé et indépendant d&apos;accompagnement
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Vos démarches en France, <span className="text-brand-700">en toute simplicité.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Un plan clair, des étapes organisées et des ressources utiles pour avancer sereinement dans vos démarches
              administratives.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/plan-action" size="lg">
                Organiser mes démarches <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                Découvrir nos services
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroIllustration />
          </div>
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
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Domaines */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Nos domaines d'accompagnement"
            title="Toutes vos démarches, organisées par thème"
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
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-300">
                  <r.icon className="h-5 w-5" aria-hidden="true" />
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
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Par où commencer ?</h2>
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
