import { connection } from "next/server";
import { availableSlots, formatSlot, normalizeSettings } from "@/lib/booking/slots";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Disponibilités" };

export default async function AdminAvailabilityPage() {
  const { supabase } = await requireAdmin();
  await connection();
  const { data, error } = await supabase.from("booking_settings").select("settings").eq("id", 1).maybeSingle();
  const settings = normalizeSettings((data as { settings?: unknown } | null)?.settings);
  const next = availableSlots(settings, new Date()).flatMap((d) => d.slots).slice(0, 5);

  return (
    <>
      <AdminTitle
        title="Disponibilités"
        description="Vos horaires d'ouverture à la réservation. Les clients ne voient que les créneaux libres, à partir de ces réglages."
      />
      {error && (
        <Panel className="mb-6 border-amber-200 bg-amber-50 text-sm text-amber-900">
          Exécutez d&apos;abord la migration SQL « catalogue et réservations » dans Supabase. En attendant, le site utilise les horaires par défaut
          (lundi au vendredi, 9 h – 12 h et 14 h – 18 h).
        </Panel>
      )}
      <Panel className="mb-6 text-sm text-ink">
        <strong>Prochains créneaux proposés :</strong> {next.length ? next.map((s) => formatSlot(s, "fr")).join(" · ") : "aucun"}
      </Panel>
      <Panel>
        <SettingsForm settings={settings} />
      </Panel>
    </>
  );
}
