import type { Metadata } from "next";
import Link from "next/link";
import { Download, Eraser, FileText, PenLine, ShieldOff } from "lucide-react";
import { REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { alternates, href, type Locale } from "@/i18n";
import { ContactForm } from "@/components/forms/ContactForm";
import { ClearLocalDataButton } from "@/components/privacy/ClearLocalDataButton";
import { Container, PageHeader } from "@/components/ui/primitives";

const PATH = "/mes-donnees";

const copy = {
  fr: {
    title: "Mes données personnelles",
    metaDescription:
      "Comment accéder à vos données, les corriger ou les faire supprimer, et effacer les données enregistrées sur votre appareil.",
    eyebrow: "Vos droits",
    description: "Vous gardez la main sur vos informations. Voici ce que nous conservons et comment exercer vos droits.",
    keptTitle: "Ce que nous conservons",
    requestsLead: "Si vous nous avez écrit ou demandé un rendez-vous",
    requestsText: (months: number) =>
      `votre nom, votre e-mail, votre message et la date de votre accord. Ces informations sont supprimées automatiquement au bout de ${months} mois.`,
    localLead: "Votre plan d'action, vos checklists et votre budget",
    localText: "ils restent uniquement dans votre navigateur. Nous n'y avons pas accès. Vous pouvez les effacer ci-dessous.",
    nothingLead: "Rien d'autre",
    nothingText: "pas de cookie publicitaire, pas de mesure d'audience, pas de revente de données.",
    cookiesLink: "En savoir plus sur les cookies",
    sep: " : ",
    rightsTitle: "Vos droits",
    rights: [
      { icon: FileText, title: "Accès", text: "Savoir quelles données nous détenons sur vous et en obtenir une copie." },
      { icon: PenLine, title: "Rectification", text: "Faire corriger une information inexacte." },
      { icon: Eraser, title: "Effacement", text: "Faire supprimer vos données." },
      { icon: Download, title: "Portabilité", text: "Recevoir vos données dans un format lisible par une machine." },
      { icon: ShieldOff, title: "Opposition et limitation", text: "Vous opposer à un traitement ou en demander la limitation." },
    ],
    howBefore: "Envoyez votre demande avec le formulaire ci-contre,",
    howStrong: "depuis l'adresse e-mail utilisée",
    howAfter:
      "lors de votre demande initiale : cela nous permet de vérifier qu'elle vient bien de vous. Nous répondons dans un délai d'un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr).",
    deviceTitle: "Données enregistrées sur cet appareil",
    deviceText:
      "Plan d'action, progression des checklists, budget et préférences d'affichage. Ces données ne quittent jamais votre navigateur.",
    policyBefore: "Pour le détail complet, consultez notre",
    policyLink: "politique de confidentialité",
    formTitle: "Faire une demande",
  },
  en: {
    title: "My personal data",
    metaDescription:
      "How to access your data, have it corrected or deleted, and delete the data saved on your device.",
    eyebrow: "Your rights",
    description: "You stay in control of your information. Here is what we keep and how to exercise your rights.",
    keptTitle: "What we keep",
    requestsLead: "If you have written to us or requested an appointment",
    requestsText: (months: number) =>
      `your name, your email address, your message and the date of your consent. This information is deleted automatically after ${months} months.`,
    localLead: "Your action plan, checklists and budget",
    localText: "they stay only in your browser. We have no access to them. You can delete them below.",
    nothingLead: "Nothing else",
    nothingText: "no advertising cookies, no audience measurement, no resale of data.",
    cookiesLink: "Learn more about cookies",
    sep: ": ",
    rightsTitle: "Your rights",
    rights: [
      { icon: FileText, title: "Access", text: "Find out what data we hold about you and obtain a copy." },
      { icon: PenLine, title: "Rectification", text: "Have inaccurate information corrected." },
      { icon: Eraser, title: "Erasure", text: "Have your data deleted." },
      { icon: Download, title: "Portability", text: "Receive your data in a machine-readable format." },
      { icon: ShieldOff, title: "Objection and restriction", text: "Object to processing or ask for it to be restricted." },
    ],
    howBefore: "Send your request using the form opposite,",
    howStrong: "from the email address you used",
    howAfter:
      "for your original request: this allows us to check that it really comes from you. We reply within one month. If you believe your rights have not been respected, you can refer the matter to the CNIL (cnil.fr).",
    deviceTitle: "Data saved on this device",
    deviceText: "Action plan, checklist progress, budget and display preferences. This data never leaves your browser.",
    policyBefore: "For full details, see our",
    policyLink: "privacy policy",
    formTitle: "Make a request",
  },
};

export function myDataMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function MyDataView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="ce-que-nous-gardons">
            <h2 id="ce-que-nous-gardons" className="text-xl font-bold text-ink">
              {t.keptTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-ink">{t.requestsLead}</strong>
                {t.sep}
                {t.requestsText(REQUEST_RETENTION_MONTHS)}
              </li>
              <li>
                <strong className="text-ink">{t.localLead}</strong>
                {t.sep}
                {t.localText}
              </li>
              <li>
                <strong className="text-ink">{t.nothingLead}</strong>
                {t.sep}
                {t.nothingText}{" "}
                <Link href={href("/cookies", locale)} className="font-medium text-brand-700 underline">
                  {t.cookiesLink}
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="vos-droits">
            <h2 id="vos-droits" className="text-xl font-bold text-ink">
              {t.rightsTitle}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {t.rights.map((r) => (
                <li key={r.title} className="flex gap-3 rounded-card border border-line bg-white p-4">
                  <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-ink">{r.title}</span>
                    <span className="block text-sm text-muted">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.howBefore} <strong className="text-ink">{t.howStrong}</strong> {t.howAfter}
            </p>
          </section>

          <section aria-labelledby="cet-appareil" className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <h2 id="cet-appareil" className="text-lg font-bold text-ink">
              {t.deviceTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{t.deviceText}</p>
            <div className="mt-4">
              <ClearLocalDataButton locale={locale} />
            </div>
          </section>

          <p className="text-sm text-muted">
            {t.policyBefore}{" "}
            <Link href={href("/confidentialite", locale)} className="font-medium text-brand-700 underline">
              {t.policyLink}
            </Link>
            .
          </p>
        </div>

        <aside aria-labelledby="formulaire-droits">
          <h2 id="formulaire-droits" className="mb-4 text-lg font-bold text-ink">
            {t.formTitle}
          </h2>
          <ContactForm locale={locale} defaultSubject="donnees" />
        </aside>
      </Container>
    </>
  );
}
