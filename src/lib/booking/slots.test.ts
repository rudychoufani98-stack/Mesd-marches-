import { describe, expect, it } from "vitest";
import { availableSlots, defaultBookingSettings, isOfferedSlot, normalizeSettings, parisDateKey, parisTime } from "./slots";

describe("créneaux de réservation", () => {
  it("convertit l'heure de Paris, été comme hiver", () => {
    expect(parisTime("2026-07-15", "14:00").toISOString()).toBe("2026-07-15T12:00:00.000Z");
    expect(parisTime("2026-12-15", "14:00").toISOString()).toBe("2026-12-15T13:00:00.000Z");
    expect(parisDateKey(new Date("2026-12-31T23:30:00Z"))).toBe("2027-01-01");
  });

  it("propose les plages de la semaine en respectant le délai minimum", () => {
    // Lundi 2 novembre 2026, 8 h à Paris.
    const now = parisTime("2026-11-02", "08:00");
    const days = availableSlots({ ...defaultBookingSettings, minNoticeHours: 24, horizonDays: 6 }, now);
    expect(days[0].date).toBe("2026-11-03");
    expect(days[0].slots[0]).toBe(parisTime("2026-11-03", "09:00").toISOString());
    expect(days[0].slots).toHaveLength(7); // 9-12 (3) + 14-18 (4)
    expect(days.some((d) => d.date === "2026-11-07" || d.date === "2026-11-08")).toBe(false); // week-end
  });

  it("retire les créneaux pris et les jours fermés", () => {
    const now = parisTime("2026-11-02", "08:00");
    const taken = [parisTime("2026-11-03", "09:00")];
    const settings = { ...defaultBookingSettings, closedDates: ["2026-11-04"], horizonDays: 3 };
    const days = availableSlots(settings, now, taken);
    expect(days.find((d) => d.date === "2026-11-03")!.slots).not.toContain(taken[0].toISOString());
    expect(days.find((d) => d.date === "2026-11-04")).toBeUndefined();
    expect(isOfferedSlot(settings, now, taken[0].toISOString(), taken)).toBe(false);
  });

  it("ignore les réglages invalides", () => {
    const s = normalizeSettings({ slotMinutes: 5, week: { "1": [{ start: "25:00", end: "10:00" }, { start: "10:00", end: "11:00" }] } });
    expect(s.slotMinutes).toBe(15);
    expect(s.week["1"]).toEqual([{ start: "10:00", end: "11:00" }]);
  });
});
