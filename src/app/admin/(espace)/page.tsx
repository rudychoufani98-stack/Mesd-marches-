import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Inbox, LayoutList } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { ImportDefaultsForm } from "./ImportDefaultsForm";

async function count(query: PromiseLike<{ count: number | null }>) {
  return (await query).count ?? 0;
}

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const head = { count: "exact" as const, head: true };
  const nowIso = new Date().toISOString();
  const [newRequests, totalRequests, upcoming, categories, guides, published] = await Promise.all([
    count(supabase.from("requests").select("id", head).eq("status", "nouveau")),
    count(supabase.from("requests").select("id", head)),
    count(supabase.from("bookings").select("id", head).gte("starts_at", nowIso).eq("status", "confirme")),
    count(supabase.from("service_categories").select("id", head)),
    count(supabase.from("guides").select("slug", head)),
    count(supabase.from("guides").select("slug", head).eq("status", "published")),
  ]);

  const cards = [
    { href: "/admin/demandes?statut=nouveau", label: "Nouvelles demandes", value: newRequests, hint: `${totalRequests} au total`, icon: Inbox },
    { href: "/admin/reservations", label: "Rendez-vous à venir", value: upcoming, hint: "Confirmés", icon: CalendarDays },
    { href: "/admin/catalogue", label: "Catégories en base", value: categories, hint: categories ? "Modifiables" : "Catalogue par défaut affiché", icon: LayoutList },
    { href: "/admin/guides", label: "Guides publiés", value: published, hint: `${guides} en base`, icon: BookOpen },
  ];

  return (
    <>
      <AdminTitle title="Tableau de bord" description="Vue d'ensemble de votre site et des demandes reçues." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ href, label, value, hint, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-card border border-line bg-white p-5 hover:border-brand-200">
            <Icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
            <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
            <p className="text-sm font-medium text-ink">{label}</p>
            <p className="mt-1 text-xs text-muted">{hint}</p>
          </Link>
        ))}
      </div>

      {categories === 0 && (
        <Panel className="mt-6">
          <h2 className="font-semibold text-ink">Catalogue des services</h2>
          <p className="mt-1 text-sm text-muted">Le site affiche le catalogue par défaut. Importez-le pour modifier les services et les prix.</p>
          <Link href="/admin/catalogue" className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
            Ouvrir le catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Panel>
      )}

      {guides === 0 && (
        <Panel className="mt-6">
          <h2 className="font-semibold text-ink">Première utilisation</h2>
          <p className="mt-1 text-sm text-muted">
            Votre base ne contient pas encore les guides. Le site affiche pour l&apos;instant le contenu par défaut. Importez-le pour pouvoir le
            modifier ici.
          </p>
          <ImportDefaultsForm />
        </Panel>
      )}

      <Panel className="mt-6">
        <h2 className="font-semibold text-ink">Raccourcis</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { href: "/admin/guides/nouveau", label: "Écrire un nouveau guide" },
            { href: "/admin/catalogue", label: "Modifier les services et les prix" },
            { href: "/admin/disponibilites", label: "Gérer mes disponibilités" },
            { href: "/admin/donnees", label: "Traiter une demande RGPD" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
                {l.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
