"use client";

import type { BookingSettings } from "@/lib/booking/slots";
import { saveBookingSettings } from "@/lib/admin/catalog-actions";
import { adminInput, adminLabel, AdminForm, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

const DAYS = [
  ["1", "Lundi"],
  ["2", "Mardi"],
  ["3", "Mercredi"],
  ["4", "Jeudi"],
  ["5", "Vendredi"],
  ["6", "Samedi"],
  ["0", "Dimanche"],
] as const;

export function SettingsForm({ settings }: { settings: BookingSettings }) {
  return (
    <AdminForm action={saveBookingSettings} className="space-y-6">
      {(r) => (
        <>
          <section>
            <h2 className="font-semibold text-ink">Horaires de la semaine</h2>
            <p className="text-sm text-muted">Cochez les jours travaillés et indiquez vos plages (heure de Paris), par exemple : 09:00-12:00, 14:00-18:00</p>
            <div className="mt-3 space-y-2">
              {DAYS.map(([d, label]) => {
                const ranges = settings.week[d] ?? [];
                return (
                  <div key={d} className="grid items-center gap-2 sm:grid-cols-[150px_1fr]">
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                      <input type="checkbox" name={`open-${d}`} defaultChecked={ranges.length > 0} className="h-4 w-4 accent-brand-700" /> {label}
                    </label>
                    <div>
                      <input
                        name={`day-${d}`}
                        aria-label={`Plages du ${label.toLowerCase()}`}
                        defaultValue={ranges.map((x) => `${x.start}-${x.end}`).join(", ") || "09:00-12:00, 14:00-18:00"}
                        className={adminInput}
                      />
                      <FieldError result={r} name={`day-${d}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="slotMinutes" className={adminLabel}>
                Durée d&apos;un créneau (minutes)
              </label>
              <input id="slotMinutes" name="slotMinutes" type="number" min={15} max={240} step={5} defaultValue={settings.slotMinutes} className={adminInput} />
            </div>
            <div>
              <label htmlFor="minNoticeHours" className={adminLabel}>
                Délai minimum avant un rendez-vous (heures)
              </label>
              <input id="minNoticeHours" name="minNoticeHours" type="number" min={0} max={336} defaultValue={settings.minNoticeHours} className={adminInput} />
            </div>
            <div>
              <label htmlFor="horizonDays" className={adminLabel}>
                Réservation possible jusqu&apos;à (jours)
              </label>
              <input id="horizonDays" name="horizonDays" type="number" min={1} max={120} defaultValue={settings.horizonDays} className={adminInput} />
            </div>
          </section>

          <section>
            <label htmlFor="closedDates" className={adminLabel}>
              Jours fermés (congés, jours fériés) <span className="font-normal text-muted">(une date par ligne, format AAAA-MM-JJ)</span>
            </label>
            <textarea id="closedDates" name="closedDates" rows={4} defaultValue={settings.closedDates.join("\n")} placeholder={"2026-12-24\n2026-12-25"} className={adminInput} />
            <FieldError result={r} name="closedDates" />
          </section>

          <ResultMessage result={r} />
          <SubmitButton>Enregistrer les disponibilités</SubmitButton>
        </>
      )}
    </AdminForm>
  );
}
