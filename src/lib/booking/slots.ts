/**
 * Calcul des créneaux disponibles (heure de Paris), à partir des réglages de l'admin.
 * Module pur, sans accès réseau : testé dans slots.test.ts.
 */

export const TIME_ZONE = "Europe/Paris";

/** Plage horaire d'une journée, au format « HH:MM ». */
export type TimeRange = { start: string; end: string };

export type BookingSettings = {
  /** Durée d'un créneau en minutes (un rendez-vous = un créneau). */
  slotMinutes: number;
  /** Délai minimum avant un rendez-vous, en heures. */
  minNoticeHours: number;
  /** Nombre de jours ouverts à la réservation. */
  horizonDays: number;
  /** Plages par jour de la semaine : 0 = dimanche … 6 = samedi. */
  week: Record<string, TimeRange[]>;
  /** Jours fermés (congés), au format AAAA-MM-JJ. */
  closedDates: string[];
};

export const defaultBookingSettings: BookingSettings = {
  slotMinutes: 60,
  minNoticeHours: 24,
  horizonDays: 21,
  week: {
    "1": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    "2": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    "3": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    "4": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    "5": [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
  },
  closedDates: [],
};

const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Nettoie des réglages venant de la base (valeurs manquantes ou invalides remplacées). */
export function normalizeSettings(raw: unknown): BookingSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<BookingSettings>;
  const clamp = (v: unknown, min: number, max: number, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;
  const week: Record<string, TimeRange[]> = {};
  const src = r.week && typeof r.week === "object" ? r.week : defaultBookingSettings.week;
  for (const day of ["0", "1", "2", "3", "4", "5", "6"]) {
    const ranges = Array.isArray(src[day]) ? src[day] : [];
    week[day] = ranges.filter((x) => x && TIME.test(x.start) && TIME.test(x.end) && x.start < x.end).slice(0, 4);
  }
  return {
    slotMinutes: clamp(r.slotMinutes, 15, 240, defaultBookingSettings.slotMinutes),
    minNoticeHours: clamp(r.minNoticeHours, 0, 24 * 14, defaultBookingSettings.minNoticeHours),
    horizonDays: clamp(r.horizonDays, 1, 120, defaultBookingSettings.horizonDays),
    week,
    closedDates: Array.isArray(r.closedDates) ? r.closedDates.filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).slice(0, 200) : [],
  };
}

/** Décalage (en minutes) de Paris par rapport à UTC à un instant donné. */
function parisOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** Instant UTC correspondant à une date et une heure « murales » à Paris. */
export function parisTime(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, h, min));
  const first = new Date(guess.getTime() - parisOffsetMinutes(guess) * 60000);
  // Seconde passe pour les jours de changement d'heure.
  return new Date(guess.getTime() - parisOffsetMinutes(first) * 60000);
}

/** Date du jour à Paris, au format AAAA-MM-JJ. */
export function parisDateKey(at: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
}

function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function timeOf(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export type DaySlots = { date: string; slots: string[] };

/**
 * Créneaux libres (instants ISO) groupés par jour, de maintenant + délai minimum jusqu'à l'horizon.
 * `taken` : instants déjà réservés.
 */
export function availableSlots(settings: BookingSettings, now: Date, taken: Iterable<string | Date> = []): DaySlots[] {
  const takenSet = new Set([...taken].map((t) => new Date(t).getTime()));
  const earliest = now.getTime() + settings.minNoticeHours * 3600_000;
  const today = parisDateKey(now);
  const result: DaySlots[] = [];
  for (let i = 0; i <= settings.horizonDays; i++) {
    const date = addDays(today, i);
    if (settings.closedDates.includes(date)) continue;
    const weekday = String(new Date(`${date}T12:00:00Z`).getUTCDay());
    const slots: string[] = [];
    for (const range of settings.week[weekday] ?? []) {
      for (let m = minutesOf(range.start); m + settings.slotMinutes <= minutesOf(range.end); m += settings.slotMinutes) {
        const at = parisTime(date, timeOf(m));
        if (at.getTime() < earliest || takenSet.has(at.getTime())) continue;
        slots.push(at.toISOString());
      }
    }
    if (slots.length) result.push({ date, slots });
  }
  return result;
}

/** Vérifie qu'un instant fait bien partie des créneaux proposés. */
export function isOfferedSlot(settings: BookingSettings, now: Date, iso: string, taken: Iterable<string | Date> = []): boolean {
  return availableSlots(settings, now, taken).some((d) => d.slots.includes(new Date(iso).toISOString()));
}

/** « mardi 4 novembre à 14:00 » (heure de Paris). */
export function formatSlot(iso: string, locale: "fr" | "en", withYear = false): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
  }).format(d);
  const time = new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit" }).format(d);
  return locale === "en" ? `${date} at ${time}` : `${date} à ${time}`;
}
