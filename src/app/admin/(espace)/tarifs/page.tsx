import { defaultOffers } from "@/config/pricing";
import { offerFromRow, type OfferRow } from "@/lib/data/mappers";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { ImportDefaultsForm } from "../ImportDefaultsForm";
import { OfferForm } from "./OfferForm";

export const metadata = { title: "Tarifs" };

export default async function AdminPricingPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("offers").select("*").order("sort");
  const rows = (data ?? []) as OfferRow[];

  return (
    <>
      <AdminTitle
        title="Offres et tarifs"
        description="Les modifications sont visibles immédiatement sur les pages Tarifs, Rendez-vous, FAQ et CGV."
      />
      {rows.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">
            Aucune offre en base : le site affiche les {defaultOffers.length} offres par défaut. Importez-les pour pouvoir les modifier.
          </p>
          <ImportDefaultsForm />
        </Panel>
      ) : (
        <div className="space-y-6">
          {rows.map((row) => (
            <OfferForm key={row.id} offer={offerFromRow(row)} sort={row.sort} active={row.active} />
          ))}
        </div>
      )}
    </>
  );
}
