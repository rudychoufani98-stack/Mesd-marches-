import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, Lock } from "lucide-react";
import { formatEuros, isPayable } from "@/config/catalog";
import { href, type Locale } from "@/i18n";
import { getCategoryById } from "@/lib/data/catalog";
import { startCheckout } from "@/lib/payments/actions";
import { getStripe, paymentsEnabled } from "@/lib/payments/stripe";
import { formatSlot } from "@/lib/booking/slots";
import { createPublicClient } from "@/lib/supabase/public";
import { Button, ButtonLink, Container } from "@/components/ui/primitives";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { CalendlyEmbed, calendlyUrl } from "@/components/booking/CalendlyEmbed";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const copy = {
  fr: {
    payTitle: "Votre accompagnement",
    payText: "Vérifiez votre commande, puis réglez en toute sécurité sur la page de paiement Stripe.",
    total: "Total TTC",
    pay: "Payer en toute sécurité",
    secure: "Paiement sécurisé par Stripe. Facture envoyée par e-mail.",
    invalid: "Ce lien de paiement n'est plus valable. Contactez votre conseiller pour en recevoir un nouveau.",
    bookedTitle: "Rendez-vous confirmé",
    bookedText: "Votre rendez-vous est réservé le",
    bookedNote: "Votre reçu et votre facture vous sont envoyés par e-mail. Votre conseiller vous contacte avant le rendez-vous.",
    thanksTitle: "Merci, votre paiement est confirmé",
    thanksText: "Votre conseiller vous contacte sous 48 h ouvrées pour fixer votre rendez-vous. Votre reçu et votre facture vous sont envoyés par e-mail.",
    calendarTitle: "Paiement confirmé : choisissez votre créneau",
    calendarText: "Dernière étape : réservez dès maintenant votre rendez-vous avec votre conseiller.",
    calendarLabel: "Agenda de réservation de votre rendez-vous",
    amount: "Montant",
    email: "Reçu envoyé à",
    invoices: "Mes factures",
    unavailableTitle: "Paiement non finalisé",
    unavailableText: "Le paiement n'a pas abouti. Vous pouvez réserver à nouveau, ou commencer par un appel gratuit.",
    freeCall: "Réserver un rendez-vous",
    home: "Retour à l'accueil",
  },
  en: {
    payTitle: "Your support",
    payText: "Check your order, then pay securely on the Stripe payment page.",
    total: "Total incl. VAT",
    pay: "Pay securely",
    secure: "Secure payment by Stripe. Invoice sent by email.",
    invalid: "This payment link is no longer valid. Contact your advisor to receive a new one.",
    bookedTitle: "Appointment confirmed",
    bookedText: "Your appointment is booked for",
    bookedNote: "Your receipt and invoice are sent by email. Your advisor will contact you before the appointment.",
    thanksTitle: "Thank you, your payment is confirmed",
    thanksText: "Your advisor will contact you within 2 working days to schedule your appointment. Your receipt and invoice are sent by email.",
    calendarTitle: "Payment confirmed: choose your time slot",
    calendarText: "Last step: book your appointment with your advisor now.",
    calendarLabel: "Booking calendar for your appointment",
    amount: "Amount",
    email: "Receipt sent to",
    invoices: "My invoices",
    unavailableTitle: "Payment not completed",
    unavailableText: "The payment did not go through. You can book again, or start with a free call.",
    freeCall: "Book an appointment",
    home: "Back to home",
  },
};

export function paymentMetadata(locale: Locale): Metadata {
  return { title: locale === "en" ? "Payment" : "Paiement", robots: { index: false, follow: false } };
}

const card = "mx-auto max-w-lg rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_20px_50px_rgba(22,32,58,0.08)] sm:p-9";

/* ---------------------------------------------------------------- /payer (lien envoyé par l'admin) */

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
  const id = typeof sp.categorie === "string" ? sp.categorie : "";
  const category = paymentsEnabled() ? await getCategoryById(id, locale) : undefined;

  if (!category || !isPayable(category)) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-muted">{t.invalid}</p>
        <ButtonLink href={`${href("/rendez-vous", locale)}?mode=appel`} className="mt-6">
          {t.freeCall}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={startCheckout} className={card}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="categorie" value={category.id} />
      {typeof sp.ref === "string" && <input type="hidden" name="ref" value={sp.ref} />}
      {typeof sp.sig === "string" && <input type="hidden" name="sig" value={sp.sig} />}
      <h1 className="font-display text-3xl font-medium text-ink">{t.payTitle}</h1>
      <p className="mt-2 text-sm text-muted">{t.payText}</p>
      <p className="mt-6 font-semibold text-ink">{category.name}</p>
      <ul className="mt-2 space-y-1 text-sm text-muted">
        {category.includes.map((i) => (
          <li key={i}>✓ {i}</li>
        ))}
      </ul>
      <p className="mt-5 flex items-baseline justify-between border-t border-line pt-4 font-semibold text-ink">
        <span>{t.total}</span>
        <span className="text-2xl">{formatEuros(category.price, locale)}</span>
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
        <ButtonLink href={href("/rendez-vous", locale)} className="mt-6">
          {t.freeCall}
        </ButtonLink>
      </div>
    );
  }

  const portal = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;
  const amount = session.amount_total !== null ? formatEuros(session.amount_total / 100, locale) : null;
  const invoicesLink = portal && (
    <a href={portal} className="text-sm font-medium text-brand-700 underline">
      {t.invoices}
    </a>
  );

  // Réservation avec créneau : le paiement confirme le rendez-vous.
  const bookingRef = session.metadata?.booking;
  if (bookingRef) {
    await createPublicClient()
      ?.rpc("confirm_booking", { p_reference: bookingRef, p_session: session.id })
      .then(({ error }) => error && console.error("[réservation] confirmation impossible", error.code));
    const startsAt = session.metadata?.starts_at;
    return (
      <div className={`${card} text-center`}>
        <CalendarCheck className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">{t.bookedTitle}</h1>
        {startsAt && (
          <p className="mt-3 text-lg text-ink">
            {t.bookedText} <strong>{formatSlot(startsAt, locale)}</strong>.
          </p>
        )}
        <p className="mt-3 text-sm text-muted">{t.bookedNote}</p>
        <p className="mt-4 text-sm text-muted">
          {amount && `${t.amount} : ${amount}`} · Réf. {bookingRef}
        </p>
        <div className="mt-6 flex flex-col items-center gap-2">
          <ButtonLink href={href("/", locale)} variant="secondary">
            {t.home}
          </ButtonLink>
          {invoicesLink}
        </div>
      </div>
    );
  }

  // Paiement via un lien envoyé par l'admin : créneau à fixer (agenda Calendly si configuré).
  if (calendlyUrl()) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">{t.calendarTitle}</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t.calendarText}</p>
        </div>
        <div className="mt-8">
          <CalendlyEmbed
            title={t.calendarLabel}
            name={session.customer_details?.name}
            email={session.customer_details?.email}
            reference={session.client_reference_id ?? session.id.slice(-12)}
          />
        </div>
        {invoicesLink && <p className="mt-6 text-center">{invoicesLink}</p>}
      </div>
    );
  }

  return (
    <div className={`${card} text-center`}>
      <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-medium text-ink">{t.thanksTitle}</h1>
      <p className="mt-3 text-muted">{t.thanksText}</p>
      <dl className="mx-auto mt-6 max-w-xs space-y-1 text-sm">
        {amount && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.amount}</dt>
            <dd className="font-semibold text-ink">{amount}</dd>
          </div>
        )}
        {session.customer_details?.email && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.email}</dt>
            <dd className="break-all text-ink">{session.customer_details.email}</dd>
          </div>
        )}
      </dl>
      <div className="mt-7 flex flex-col items-center gap-2">
        {invoicesLink}
        <Link href={href("/", locale)} className="text-sm text-muted hover:text-ink">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
