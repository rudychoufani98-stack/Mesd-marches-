import { ChevronDown } from "lucide-react";
import { formatCategoryPrice } from "@/config/catalog";
import { categoryFromRow, serviceFromRow, type CategoryRow, type ServiceRow } from "@/lib/data/catalog-rows";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { CategoryForm, DeleteCategoryButton, ImportCatalogForm, ServiceForm, ServiceRow as ServiceItem } from "./CatalogForms";

export const metadata = { title: "Catalogue" };

export default async function AdminCatalogPage() {
  const { supabase } = await requireAdmin();
  const [c, s] = await Promise.all([
    supabase.from("service_categories").select("*").order("sort"),
    supabase.from("services").select("*").order("sort"),
  ]);
  const categories = ((c.data ?? []) as CategoryRow[]).map(categoryFromRow);
  const services = ((s.data ?? []) as ServiceRow[]).map(serviceFromRow);
  const missingTables = Boolean(c.error);

  return (
    <>
      <AdminTitle
        title="Catalogue des services"
        description="Catégories (avec leur prix fixe) et services. Toute modification est visible immédiatement sur le site : pages Services, Tarifs, réservation et paiement."
      />

      {(missingTables || categories.length === 0) && (
        <Panel className="mb-6 border-brand-200 bg-brand-50/40">
          <p className="text-sm text-ink">
            {missingTables ? (
              <>
                <strong>Étape 1 :</strong> exécutez la migration SQL « catalogue et réservations » dans Supabase.{" "}
                <strong>Étape 2 :</strong> revenez ici et importez le catalogue.
              </>
            ) : (
              <>Le site affiche pour l&apos;instant le catalogue par défaut. Importez-le pour pouvoir le modifier ici.</>
            )}
          </p>
          <ImportCatalogForm />
        </Panel>
      )}

      <div className="space-y-4">
        {categories.map((cat) => {
          const list = services.filter((sv) => sv.categoryId === cat.id);
          return (
            <details key={cat.id} className="group rounded-card border border-line bg-white open:shadow-sm">
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-brand-700">
                    <CategoryIcon icon={cat.icon} className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-ink">{cat.name}</span>
                  <span className="text-xs text-muted">{list.length} service(s)</span>
                  {!cat.active && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">Masquée</span>}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-semibold text-ink">{formatCategoryPrice(cat, "fr")}</span>
                  <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                </span>
              </summary>
              <div className="space-y-6 border-t border-line px-5 pb-5 pt-4">
                <CategoryForm category={cat} nextSort={cat.sort} />
                <div>
                  <h3 className="text-sm font-semibold text-ink">Services de la catégorie</h3>
                  <div className="mt-3 space-y-2">
                    {list.map((sv) => (
                      <ServiceItem key={sv.id} service={sv} categoryId={cat.id} />
                    ))}
                  </div>
                  <details className="mt-3 rounded-xl border border-dashed border-line p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-brand-700">+ Ajouter un service</summary>
                    <div className="mt-3">
                      <ServiceForm categoryId={cat.id} nextSort={list.length} />
                    </div>
                  </details>
                </div>
                <div className="border-t border-line pt-4">
                  <DeleteCategoryButton id={cat.id} name={cat.name} />
                </div>
              </div>
            </details>
          );
        })}
      </div>

      {!missingTables && (
        <details className="mt-6 rounded-card border border-dashed border-line bg-white p-5">
          <summary className="cursor-pointer font-semibold text-brand-700">+ Ajouter une catégorie</summary>
          <div className="mt-4">
            <CategoryForm nextSort={categories.length} />
          </div>
        </details>
      )}
    </>
  );
}
