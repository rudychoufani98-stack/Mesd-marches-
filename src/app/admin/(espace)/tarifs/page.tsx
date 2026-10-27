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
  const visible = rows.filter((r) => r.active);
  const hidden = rows.filter((r) => !r.active);
  // Services du catalogue pas encore en base : tant qu'ils n'y sont pas, ils ne sont pas modifiables.
  const missing = defaultOffers.filter((o) => !rows.some((r) => r.id === o.id));

  return (
    <>
      <AdminTitle
        title="Services et tarifs"
        description="Cliquez sur un service pour modifier son nom, son prix et ses textes (français et anglais). Les changements sont visibles immédiatement sur tout le site."
      />

      {missing.length > 0 && (
        <Panel className="mb-6 border-brand-200 bg-brand-50/40">
          <p className="text-sm text-ink">
            <strong>{missing.length} service(s) du site ne sont pas encore modifiables</strong> : {missing.map((o) => o.name).join(", ")}.
            {visible.length === 0 && " Le site les affiche avec leurs textes et prix par défaut."} Cliquez sur le bouton pour les ajouter ici. Les
            services déjà présents ne sont pas modifiés.
          </p>
          <ImportDefaultsForm />
        </Panel>
      )}

      {visible.length > 0 && (
        <div className="space-y-3">
          {visible.map((row) => (
            <OfferForm key={row.id} offer={offerFromRow(row)} sort={row.sort} active={row.active} />
          ))}
        </div>
      )}

      {hidden.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-semibold text-muted">Services masqués ({hidden.length})</summary>
          <p className="mt-2 text-sm text-muted">Ils ne sont pas affichés sur le site. Cochez « Visible sur le site » pour en réafficher un.</p>
          <div className="mt-3 space-y-3">
            {hidden.map((row) => (
              <OfferForm key={row.id} offer={offerFromRow(row)} sort={row.sort} active={row.active} />
            ))}
          </div>
        </details>
      )}
    </>
  );
}
