import type { Metadata } from "next";
import Link from "next/link";
import { alternates, href, type Locale } from "@/i18n";
import { ClearLocalDataButton } from "@/components/privacy/ClearLocalDataButton";
import { Container, PageHeader } from "@/components/ui/primitives";
import { FrenchVersionPrevails } from "./shared";

const PATH = "/cookies";

const copy = {
  fr: {
    title: "Cookies et stockage local",
    metaDescription: "MesDémarches n'utilise ni cookie publicitaire ni mesure d'audience. Détail des informations enregistrées sur votre appareil.",
    eyebrow: "Transparence",
    description:
      "Nous n'utilisons ni cookie publicitaire, ni mesure d'audience, ni traceur de réseaux sociaux. Voici tout ce qui est enregistré sur votre appareil.",
    labels: { where: "Où", purpose: "À quoi ça sert", duration: "Durée", consent: "Consentement" },
    items: [
      {
        name: "Checklists des guides clients et budget",
        where: "Stockage local de votre navigateur",
        purpose: "Conserver vos cases cochées et vos montants.",
        duration: "Jusqu'à ce que vous l'effaciez",
        consent: "Non requis : nécessaire au service que vous utilisez",
      },
      {
        name: "Information sur les cookies",
        where: "Stockage local de votre navigateur",
        purpose: "Ne plus afficher le bandeau d'information une fois lu.",
        duration: "Jusqu'à ce que vous l'effaciez",
        consent: "Non requis",
      },
      {
        name: "Paiement sécurisé (Stripe)",
        where: "Cookies de Stripe, uniquement sur la page de paiement hébergée par Stripe",
        purpose: "Faire fonctionner le paiement et prévenir la fraude. Aucun cookie Stripe n'est déposé sur les autres pages du site.",
        duration: "Fixée par Stripe (voir stripe.com/cookie-settings)",
        consent: "Non requis : strictement nécessaire au paiement que vous demandez",
      },
      {
        name: "Agenda de réservation (Calendly)",
        where: "Cookies de Calendly, uniquement dans l'agenda affiché après un paiement",
        purpose: "Afficher l'agenda et enregistrer votre rendez-vous. Calendly vous demande votre accord pour ses cookies non essentiels.",
        duration: "Fixée par Calendly",
        consent: "Recueilli par Calendly pour les cookies non essentiels",
      },
      {
        name: "Session de l'espace administrateur",
        where: "Cookie, uniquement sur /admin",
        purpose: "Maintenir la connexion de l'équipe MesDémarches. Jamais déposé aux visiteurs du site.",
        duration: "Durée de la session",
        consent: "Non requis : strictement nécessaire",
      },
    ],
    clearTitle: "Tout effacer",
    clearText:
      "Vous pouvez supprimer à tout moment les données enregistrées par MesDémarches sur cet appareil. Vous pouvez aussi le faire depuis les réglages de votre navigateur.",
    future:
      "Si nous ajoutons un jour un outil soumis à votre accord (par exemple une mesure d'audience), nous vous le demanderons avant tout dépôt, avec un bouton « Refuser » aussi simple que « Accepter », et cette page sera mise à jour. Pour vos autres droits, consultez la page",
    myData: "Mes données personnelles",
  },
  en: {
    title: "Cookies and local storage",
    metaDescription:
      "MesDémarches uses no advertising cookies and no audience measurement. Details of the information saved on your device.",
    eyebrow: "Transparency",
    description:
      "We use no advertising cookies, no audience measurement and no social media trackers. Here is everything that is saved on your device.",
    labels: { where: "Where", purpose: "What it is for", duration: "Duration", consent: "Consent" },
    items: [
      {
        name: "Client guide checklists and budget",
        where: "Your browser's local storage",
        purpose: "To keep your ticked boxes and your amounts.",
        duration: "Until you delete it",
        consent: "Not required: necessary for the service you are using",
      },
      {
        name: "Cookie information",
        where: "Your browser's local storage",
        purpose: "To stop showing the information banner once you have read it.",
        duration: "Until you delete it",
        consent: "Not required",
      },
      {
        name: "Secure payment (Stripe)",
        where: "Stripe cookies, only on the payment page hosted by Stripe",
        purpose: "To make payment work and prevent fraud. No Stripe cookie is placed on the other pages of the website.",
        duration: "Set by Stripe (see stripe.com/cookie-settings)",
        consent: "Not required: strictly necessary for the payment you request",
      },
      {
        name: "Booking calendar (Calendly)",
        where: "Calendly cookies, only in the calendar shown after a payment",
        purpose: "To display the calendar and save your appointment. Calendly asks for your consent for its non-essential cookies.",
        duration: "Set by Calendly",
        consent: "Collected by Calendly for non-essential cookies",
      },
      {
        name: "Administrator area session",
        where: "Cookie, only on /admin",
        purpose: "To keep the MesDémarches team logged in. Never placed on website visitors' devices.",
        duration: "Length of the session",
        consent: "Not required: strictly necessary",
      },
    ],
    clearTitle: "Delete everything",
    clearText:
      "You can delete the data saved by MesDémarches on this device at any time. You can also do this from your browser settings.",
    future:
      "If we ever add a tool that requires your consent (for example audience measurement), we will ask you before anything is placed, with a “Refuse” button as simple as “Accept”, and this page will be updated. For your other rights, see the page",
    myData: "My personal data",
  },
};

export function cookiesMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  return { title: t.title, description: t.metaDescription, alternates: alternates(PATH, locale) };
}

export function CookiesView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-8">
          {locale === "en" && <FrenchVersionPrevails path={PATH} />}
          <div className="overflow-hidden rounded-card border border-line bg-white">
            <ul className="divide-y divide-line">
              {t.items.map((i) => (
                <li key={i.name} className="p-5">
                  <h2 className="font-semibold text-ink">{i.name}</h2>
                  <dl className="mt-2 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[140px_1fr]">
                    <dt className="text-muted">{t.labels.where}</dt>
                    <dd className="text-ink">{i.where}</dd>
                    <dt className="text-muted">{t.labels.purpose}</dt>
                    <dd className="text-ink">{i.purpose}</dd>
                    <dt className="text-muted">{t.labels.duration}</dt>
                    <dd className="text-ink">{i.duration}</dd>
                    <dt className="text-muted">{t.labels.consent}</dt>
                    <dd className="text-ink">{i.consent}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>

          <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-lg font-bold text-ink">{t.clearTitle}</h2>
            <p className="mt-2 text-sm text-muted">{t.clearText}</p>
            <div className="mt-4">
              <ClearLocalDataButton locale={locale} />
            </div>
          </section>

          <p className="text-sm leading-relaxed text-muted">
            {t.future}{" "}
            <Link href={href("/mes-donnees", locale)} className="font-medium text-brand-700 underline">
              {t.myData}
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
