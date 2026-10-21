import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur nos services ou nos tarifs ? Écrivez-nous, nous vous répondons par e-mail.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Écrivez-nous" description="Une question sur nos services, nos tarifs ou vos données ? Nous vous répondons par e-mail sous 2 jours ouvrés." />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <aside className="space-y-4">
          <Link href="/rendez-vous" className="flex gap-3 rounded-card border border-line bg-white p-5 hover:border-brand-200">
            <CalendarCheck className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-ink">Demander un rendez-vous</span>
              <span className="mt-1 block text-sm text-muted">Pour un accompagnement personnalisé.</span>
            </span>
          </Link>
          <Link href="/faq" className="flex gap-3 rounded-card border border-line bg-white p-5 hover:border-brand-200">
            <HelpCircle className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-ink">Questions fréquentes</span>
              <span className="mt-1 block text-sm text-muted">Les réponses aux questions les plus courantes.</span>
            </span>
          </Link>
          <p className="rounded-card bg-surface p-5 text-sm leading-relaxed text-muted">
            {siteConfig.disclaimer} Pour une question sur votre dossier auprès d&apos;une administration, contactez directement
            l&apos;organisme concerné.
          </p>
        </aside>
      </Container>
    </>
  );
}
