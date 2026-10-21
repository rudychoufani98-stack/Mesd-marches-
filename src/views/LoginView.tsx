import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { alternates, href, type Locale } from "@/i18n";
import { ButtonLink, Container } from "@/components/ui/primitives";

const PATH = "/connexion";

const copy = {
  fr: {
    title: "Connexion",
    metaDescription: "L'espace client MesDémarches arrive bientôt.",
    heading: "L'espace client arrive bientôt",
    text: "Les comptes personnels ne sont pas encore ouverts. En attendant, votre plan d'action et votre progression sont enregistrés directement sur votre appareil, sans création de compte.",
    plan: "Accéder à mon plan d'action",
    contact: "Nous contacter",
  },
  en: {
    title: "Log in",
    metaDescription: "The MesDémarches client area is coming soon.",
    heading: "The client area is coming soon",
    text: "Personal accounts are not open yet. In the meantime, your action plan and your progress are saved directly on your device, without creating an account.",
    plan: "Go to my action plan",
    contact: "Contact us",
  },
} as const;

export function loginMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, robots: { index: false }, alternates: alternates(PATH, locale) };
}

export function LoginView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-lg rounded-card border border-line bg-white p-8 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <LockKeyhole className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-ink">{t.heading}</h1>
        <p className="mt-3 leading-relaxed text-muted">{t.text}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <ButtonLink href={href("/plan-action", locale)}>{t.plan}</ButtonLink>
          <ButtonLink href={href("/contact", locale)} variant="secondary">
            {t.contact}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
