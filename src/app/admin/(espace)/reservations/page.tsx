import Link from "next/link";
import { connection } from "next/server";
import { Mail, Phone, Video } from "lucide-react";
import { updateBookingStatus } from "@/lib/admin/catalog-actions";
import { formatSlot } from "@/lib/booking/slots";
import { paidByReference, recentPaidSessions } from "@/lib/payments/admin";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, formatDateTime, Panel } from "@/components/admin/ui";
import { Badge } from "@/components/ui/primitives";

export const metadata = { title: "Réservations" };

type BookingRow = {
  id: string;
  reference: string;
  kind: "appel" | "accompagnement";
  category_name: string;
  service_name: string;
  price: number | string;
  starts_at: string;
  status: "en_attente_paiement" | "confirme" | "annule" | "termine";
  name: string;
  email: string;
  phone: string;
  country: string;
  situation: string;
  need: string;
  goal: string;
  extra: string;
  mode: "visio" | "telephone";
  language: "fr" | "en";
  created_at: string;
};

const STATUSES = [
  { value: "confirme", label: "Confirmé" },
  { value: "en_attente_paiement", label: "Paiement en attente" },
  { value: "termine", label: "Terminé" },
  { value: "annule", label: "Annulé" },
] as const;

const tone = { confirme: "accent", en_attente_paiement: "warning", termine: "neutral", annule: "neutral" } as const;

/** E-mail prérempli (confirmation ou rappel) à envoyer depuis votre messagerie. */
function mailto(b: BookingRow, type: "confirmation" | "rappel") {
  const when = formatSlot(b.starts_at, b.language, true);
  const en = b.language === "en";
  const subject = en
    ? `${type === "confirmation" ? "Your appointment is confirmed" : "Reminder: your appointment"} — MesDémarches (${b.reference})`
    : `${type === "confirmation" ? "Votre rendez-vous est confirmé" : "Rappel : votre rendez-vous"} — MesDémarches (${b.reference})`;
  const how = b.mode === "visio" ? (en ? "by video (link below)" : "en visio (lien ci-dessous)") : en ? "by phone" : "par téléphone";
  const body = en
    ? `Hello ${b.name},\n\n${type === "confirmation" ? "Your appointment is confirmed" : "This is a reminder of your appointment"} on ${when} (Paris time), ${how}.\n\nTopic: ${b.category_name}${b.service_name ? ` — ${b.service_name}` : ""}\n\n[video link]\n\nSee you soon,\nMesDémarches`
    : `Bonjour ${b.name},\n\n${type === "confirmation" ? "Votre rendez-vous est confirmé" : "Petit rappel : votre rendez-vous a lieu"} le ${when} (heure de Paris), ${how}.\n\nSujet : ${b.category_name}${b.service_name ? ` — ${b.service_name}` : ""}\n\n[lien de visio]\n\nÀ très bientôt,\nMesDémarches`;
  return `mailto:${b.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default async function AdminBookingsPage({ searchParams }: PageProps<"/admin/reservations">) {
  const { supabase } = await requireAdmin();
  await connection();
  const sp = await searchParams;
  const past = sp.vue === "passees";
  const nowIso = new Date().toISOString();
  let query = supabase.from("bookings").select("*").limit(200);
  query = past ? query.lt("starts_at", nowIso).order("starts_at", { ascending: false }) : query.gte("starts_at", nowIso).order("starts_at");
  const [{ data, error }, sessions] = await Promise.all([query, recentPaidSessions()]);
  const bookings = (data ?? []) as BookingRow[];
  const paid = paidByReference(sessions);
  const chip =
    "inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3 text-sm font-medium text-ink aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white";

  return (
    <>
      <AdminTitle
        title="Réservations"
        description="Rendez-vous réservés sur le site (appels gratuits et accompagnements payés). Envoyez confirmations et rappels en un clic depuis votre messagerie."
      />
      <div className="mb-5 flex gap-2">
        <Link href="/admin/reservations" aria-current={!past} className={chip}>
          À venir
        </Link>
        <Link href="/admin/reservations?vue=passees" aria-current={past} className={chip}>
          Passées
        </Link>
      </div>

      {error && <Panel className="text-sm text-red-800">Impossible de charger les réservations. Exécutez la migration SQL « catalogue et réservations ».</Panel>}
      {!error && bookings.length === 0 && <Panel className="text-center text-sm text-muted">Aucune réservation {past ? "passée" : "à venir"}.</Panel>}

      <ul className="space-y-3">
        {bookings.map((b) => (
          <li key={b.id}>
            <Panel>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={tone[b.status]}>{STATUSES.find((s) => s.value === b.status)?.label}</Badge>
                    <Badge tone={b.kind === "appel" ? "brand" : "accent"}>{b.kind === "appel" ? "Appel gratuit" : `${Number(b.price)} €`}</Badge>
                    {paid.has(b.reference) && <Badge tone="accent">Payé ✓ (Stripe)</Badge>}
                    <span className="text-xs text-muted">{b.reference}</span>
                  </div>
                  <p className="mt-2 font-display text-xl font-medium capitalize text-ink">{formatSlot(b.starts_at, "fr")}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    {b.mode === "visio" ? <Video className="h-4 w-4" aria-hidden="true" /> : <Phone className="h-4 w-4" aria-hidden="true" />}
                    {b.mode === "visio" ? "Visio" : "Téléphone"} · {b.language === "en" ? "anglais" : "français"}
                  </p>
                  <p className="mt-2 font-semibold text-ink">{b.name}</p>
                  <p className="text-sm text-ink">
                    {b.category_name}
                    {b.service_name ? ` — ${b.service_name}` : ""}
                  </p>
                  <p className="mt-1 text-sm">
                    <a href={`mailto:${b.email}`} className="break-all text-brand-700 hover:underline">
                      {b.email}
                    </a>
                    {b.phone ? ` · ${b.phone}` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <form action={updateBookingStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={b.id} />
                    <label htmlFor={`st-${b.id}`} className="sr-only">
                      Statut
                    </label>
                    <select id={`st-${b.id}`} name="status" defaultValue={b.status} className="min-h-10 rounded-lg border border-line bg-white px-2 text-sm">
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="min-h-10 rounded-lg border border-line px-3 text-sm font-medium text-ink hover:bg-surface">
                      OK
                    </button>
                  </form>
                  <div className="flex flex-wrap justify-end gap-2">
                    <a href={mailto(b, "confirmation")} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm text-ink hover:bg-surface">
                      <Mail className="h-4 w-4" aria-hidden="true" /> Confirmation
                    </a>
                    <a href={mailto(b, "rappel")} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm text-ink hover:bg-surface">
                      <Mail className="h-4 w-4" aria-hidden="true" /> Rappel
                    </a>
                  </div>
                </div>
              </div>
              <dl className="mt-4 grid gap-x-4 gap-y-1 border-t border-line pt-3 text-sm sm:grid-cols-[150px_1fr]">
                {(
                  [
                    ["Pays", b.country],
                    ["Situation", b.situation],
                    ["Besoin", b.need],
                    ["Objectif", b.goal],
                    ["Compléments", b.extra],
                    ["Réservé le", formatDateTime(b.created_at)],
                  ] as [string, string][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="font-medium text-muted">{k}</dt>
                      <dd className="whitespace-pre-wrap break-words text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
            </Panel>
          </li>
        ))}
      </ul>
    </>
  );
}
