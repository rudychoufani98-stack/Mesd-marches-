import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, HelpCircle } from "lucide-react";
import { alternates, getDictionary, href, type Locale } from "@/i18n";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, PageHeader } from "@/components/ui/primitives";

const PATH = "/contact";

const copy = {
  fr: {
    title: "Contact",
    metaDescription: "Une question sur nos services ou nos tarifs ? Écrivez-nous, nous vous répondons par e-mail.",
    eyebrow: "Contact",
    heading: "Écrivez-nous",
    description: "Une question sur nos services, nos tarifs ou vos données ? Nous vous répondons par e-mail sous 2 jours ouvrés.",
    appointment: "Demander un rendez-vous",
    appointmentText: "Pour un accompagnement personnalisé.",
    faq: "Questions fréquentes",
    faqText: "Les réponses aux questions les plus courantes.",
    administration: "Pour une question sur votre dossier auprès d'une administration, contactez directement l'organisme concerné.",
  },
  en: {
    title: "Contact",
    metaDescription: "A question about our services or pricing? Write to us and we will reply by email.",
    eyebrow: "Contact",
    heading: "Write to us",
    description: "A question about our services, our pricing or your data? We reply by email within 2 working days.",
    appointment: "Request an appointment",
    appointmentText: "For personalised support.",
    faq: "Frequently asked questions",
    faqText: "Answers to the most common questions.",
    administration: "For a question about your file with a government body, contact the relevant body directly.",
  },
} as const;

export function contactMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.heading} description={t.description} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <ContactForm locale={locale} />
        <aside className="space-y-4">
          <Link href={href("/rendez-vous", locale)} className="flex gap-3 rounded-card border border-line bg-white p-5 hover:border-brand-200">
            <CalendarCheck className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-ink">{t.appointment}</span>
              <span className="mt-1 block text-sm text-muted">{t.appointmentText}</span>
            </span>
          </Link>
          <Link href={href("/faq", locale)} className="flex gap-3 rounded-card border border-line bg-white p-5 hover:border-brand-200">
            <HelpCircle className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-ink">{t.faq}</span>
              <span className="mt-1 block text-sm text-muted">{t.faqText}</span>
            </span>
          </Link>
          <p className="rounded-card bg-surface p-5 text-sm leading-relaxed text-muted">
            {getDictionary(locale).footer.disclaimer} {t.administration}
          </p>
        </aside>
      </Container>
    </>
  );
}
