import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { formatEuros } from "@/config/pricing";
import { href, type Locale } from "@/i18n";
import { getOffers } from "@/lib/data/content";
import { startCheckout } from "@/lib/payments/actions";
import { buildCart, parseOfferIds } from "@/lib/payments/cart";
import { getStripe, paymentsEnabled } from "@/lib/payments/stripe";
import { Button, ButtonLink, Container } from "@/components/ui/primitives";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { CalendlyEmbed, calendlyUrl } from "@/components/booking/CalendlyEmbed";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const copy = {
  fr: {
    payTitle: "Votre accompagnement",
    payText: "Vérifiez votre commande, puis réglez en toute sécurité sur la page de paiement Stripe.",
    total: "Total TTC",
    perMonth: "/ mois",
    pay: "Payer en toute sécurité",
    secure: "Paiement sécurisé par Stripe. Facture envoyée par e-mail.",
    invalid: "Ce lien de paiement n'est plus valable. Contactez votre conseiller pour en recevoir un nouveau.",
    thanksTitle: "Merci, votre paiement est confirmé",
    thanksText: "Votre conseiller vous contacte sous 48 h ouvrées pour démarrer. Votre reçu et votre facture vous sont envoyés par e-mail.",
    calendarTitle: "Paiement confirmé : choisissez votre créneau",
    calendarText: "Dernière étape : réservez dès maintenant votre rendez-vous avec votre conseiller. Votre reçu et votre facture vous sont envoyés par e-mail.",
    calendarLabel: "Agenda de réservation de votre rendez-vous",
    amount: "Montant",
    email: "Reçu envoyé à",
    book: "Choisir mon créneau d'appel",
    invoices: "Mes factures et mon abonnement",
    unavailableTitle: "Paiement en ligne momentanément indisponible",
    unavailableText: "Réservez votre appel offert : votre conseiller vous enverra un lien de paiement.",
    freeCall: "Réserver mon appel offert",
    home: "Retour à l'accueil",
  },
  en: {
    payTitle: "Your support",
    payText: "Check your order, then pay securely on the Stripe payment page.",
    total: "Total incl. VAT",
    perMonth: "/ month",
    pay: "Pay securely",
    secure: "Secure payment by Stripe. Invoice sent by email.",
    invalid: "This payment link is no longer valid. Contact your advisor to receive a new one.",
    thanksTitle: "Thank you, your payment is confirmed",
    thanksText: "Your advisor will contact you within 2 working days to get started. Your receipt and invoice are sent by email.",
    calendarTitle: "Payment confirmed: choose your time slot",
    calendarText: "Last step: book your appointment with your advisor now. Your receipt and invoice are sent by email.",
    calendarLabel: "Booking calendar for your appointment",
    amount: "Amount",
    email: "Receipt sent to",
    book: "Choose my call slot",
    invoices: "My invoices and subscription",
    unavailableTitle: "Online payment temporarily unavailable",
    unavailableText: "Book your free call: your advisor will send you a payment link.",
    freeCall: "Book my free call",
    home: "Back to home",
  },
};

export function paymentMetadata(locale: Locale): Metadata {
  return { title: locale === "en" ? "Payment" : "Paiement", robots: { index: false, follow: false } };
}

const card = "mx-auto max-w-lg rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_20px_50px_rgba(22,32,58,0.08)] sm:p-9";

/* ---------------------------------------------------------------- /payer */

export function PayView(props: { searchParams: SearchParams; locale: Locale }) {
  return (
    <Container className="py-14 sm:py-20">
      <Suspense fallback={<PageSkeleton />}>
        <PaySummary {...props} />
      </Suspense>
    </Container>
  );
}

async function PaySummary({ searchParams, locale }: { searchParams: SearchParams; locale: Locale }) {
  const t = copy[locale];
  const sp = await searchParams;
  const offres = typeof sp.offres === "string" ? sp.offres : "";
  const cart = paymentsEnabled() ? buildCart(await getOffers(locale), parseOfferIds(offres), locale) : null;

  if (!cart) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-muted">{t.invalid}</p>
        <ButtonLink href={`${href("/rendez-vous", locale)}?offre=decouverte`} className="mt-6">
          {t.freeCall}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={startCheckout} className={card}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="offres" value={cart.ids.join(",")} />
      {typeof sp.ref === "string" && <input type="hidden" name="ref" value={sp.ref} />}
      {typeof sp.sig === "string" && <input type="hidden" name="sig" value={sp.sig} />}
      <h1 className="font-display text-3xl font-medium text-ink">{t.payTitle}</h1>
      <p className="mt-2 text-sm text-muted">{t.payText}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {cart.items.map((i) => (
          <li key={i.name} className="flex justify-between gap-3">
            <span className="text-ink">{i.name}</span>
            <span className="shrink-0 text-muted">{formatEuros(i.price, locale)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-baseline justify-between border-t border-line pt-4 font-semibold text-ink">
        <span>
          {t.total}
          {cart.discountPercent > 0 ? ` (−${cart.discountPercent} %)` : ""}
        </span>
        <span className="text-2xl">
          {formatEuros(cart.total, locale)}
          {cart.mode === "subscription" && <span className="text-sm font-normal text-muted"> {t.perMonth}</span>}
        </span>
      </p>
      <Button type="submit" size="lg" className="mt-7 w-full">
        <Lock className="h-4 w-4" aria-hidden="true" /> {t.pay}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">{t.secure}</p>
    </form>
  );
}

/* ------------------------------------------------------ /paiement/merci */

export function ThankYouView(props: { searchParams: SearchParams; locale: Locale }) {
  return (
    <Container className="py-14 sm:py-20">
      <Suspense fallback={<PageSkeleton />}>
        <ThankYou {...props} />
      </Suspense>
    </Container>
  );
}

async function ThankYou({ searchParams, locale }: { searchParams: SearchParams; locale: Locale }) {
  const t = copy[locale];
  const sp = await searchParams;
  const stripe = getStripe();
  const sessionId = typeof sp.session_id === "string" && /^cs_[A-Za-z0-9_]{10,200}$/.test(sp.session_id) ? sp.session_id : null;
  const session = stripe && sessionId ? await stripe.checkout.sessions.retrieve(sessionId).catch(() => null) : null;
  const paid = session && (session.payment_status === "paid" || session.payment_status === "no_payment_required");

  if (!paid) {
    return (
      <div className={`${card} text-center`}>
        <h1 className="font-display text-2xl font-medium text-ink">{t.unavailableTitle}</h1>
        <p className="mt-3 text-muted">{t.unavailableText}</p>
        <ButtonLink href={`${href("/rendez-vous", locale)}?offre=decouverte`} className="mt-6">
          {t.freeCall}
        </ButtonLink>
      </div>
    );
  }

  const portal = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;

  // Agenda Calendly configuré : le client réserve directement son créneau.
  if (calendlyUrl()) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">{t.calendarTitle}</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t.calendarText}</p>
          {session.amount_total !== null && (
            <p className="mt-2 text-sm text-muted">
              {t.amount} : <span className="font-semibold text-ink">{formatEuros(session.amount_total / 100, locale)}</span>
              {session.customer_details?.email ? ` · ${session.customer_details.email}` : ""}
            </p>
          )}
        </div>
        <div className="mt-8">
          <CalendlyEmbed
            title={t.calendarLabel}
            name={session.customer_details?.name}
            email={session.customer_details?.email}
            reference={session.client_reference_id ?? session.id.slice(-12)}
          />
        </div>
        {portal && (
          <p className="mt-6 text-center">
            <a href={portal} className="text-sm font-medium text-brand-700 underline">
              {t.invoices}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${card} text-center`}>
      <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-medium text-ink">{t.thanksTitle}</h1>
      <p className="mt-3 text-muted">{t.thanksText}</p>
      <dl className="mx-auto mt-6 max-w-xs space-y-1 text-sm">
        {session.amount_total !== null && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.amount}</dt>
            <dd className="font-semibold text-ink">{formatEuros(session.amount_total / 100, locale)}</dd>
          </div>
        )}
        {session.customer_details?.email && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.email}</dt>
            <dd className="break-all text-ink">{session.customer_details.email}</dd>
          </div>
        )}
      </dl>
      <div className="mt-7 flex flex-col gap-2">
        <ButtonLink href={`${href("/rendez-vous", locale)}?offre=${session.metadata?.offres?.split(",").length === 1 ? session.metadata.offres : "decouverte"}`}>
          {t.book} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        {portal && (
          <a href={portal} className="text-sm font-medium text-brand-700 underline">
            {t.invoices}
          </a>
        )}
        <Link href={href("/", locale)} className="text-sm text-muted hover:text-ink">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
