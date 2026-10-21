import { getCategory } from "@/content/categories";
import { serviceDomains, serviceFormatLabels } from "@/content/services";
import { setVisibility } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";

export const metadata = { title: "Services" };

function Toggle({ id, active, label }: { id: string; active: boolean; label: string }) {
  return (
    <form action={setVisibility}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="active" value={active ? "false" : "true"} />
      <button
        type="submit"
        role="switch"
        aria-checked={active}
        aria-label={`${label} : ${active ? "visible, cliquer pour masquer" : "masqué, cliquer pour afficher"}`}
        className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold ${
          active ? "bg-accent-50 text-accent-700 hover:bg-accent-100" : "bg-surface text-muted hover:bg-line"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${active ? "bg-accent-500" : "bg-muted"}`} aria-hidden="true" />
        {active ? "Visible" : "Masqué"}
      </button>
    </form>
  );
}

export default async function AdminServicesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("service_visibility").select("id, active");
  const visibility = Object.fromEntries((data ?? []).map((r: { id: string; active: boolean }) => [r.id, r.active]));
  const isOn = (id: string, fallback: boolean) => (visibility[id] as boolean | undefined) ?? fallback;

  return (
    <>
      <AdminTitle
        title="Services"
        description="Masquez un domaine entier ou un service précis. Le contenu des services reste défini dans le code ; seule leur visibilité se règle ici."
      />
      <div className="space-y-4">
        {serviceDomains.map((d) => {
          const domainOn = isOn(`domain:${d.slug}`, d.active);
          const title = getCategory(d.category)?.title ?? d.slug;
          return (
            <Panel key={d.slug} className={domainOn ? "" : "opacity-75"}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-ink">{title}</h2>
                <Toggle id={`domain:${d.slug}`} active={domainOn} label={`Domaine ${title}`} />
              </div>
              {!domainOn && <p className="mt-1 text-xs text-muted">Domaine masqué : aucun de ses services n&apos;apparaît sur le site.</p>}
              <ul className="mt-3 divide-y divide-line">
                {d.items.map((i) => (
                  <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
                    <div className="min-w-0">
                      <p className="text-sm text-ink">{i.title}</p>
                      <p className="text-xs text-muted">{serviceFormatLabels[i.format]}</p>
                    </div>
                    <Toggle id={`item:${i.id}`} active={isOn(`item:${i.id}`, i.active)} label={i.title} />
                  </li>
                ))}
              </ul>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
