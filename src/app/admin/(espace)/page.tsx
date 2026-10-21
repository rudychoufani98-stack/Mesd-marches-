import Link from "next/link";
import { ArrowRight, BookOpen, Euro, Inbox, ShieldCheck } from "lucide-react";
import { REQUEST_RETENTION_MONTHS, retentionCutoff } from "@/config/privacy";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { ImportDefaultsForm } from "./ImportDefaultsForm";

async function count(query: PromiseLike<{ count: number | null }>) {
  return (await query).count ?? 0;
}

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const head = { count: "exact" as const, head: true };
  const [newRequests, totalRequests, expired, offers, guides, published] = await Promise.all([
    count(supabase.from("requests").select("id", head).eq("status", "nouveau")),
    count(supabase.from("requests").select("id", head)),
    count(supabase.from("requests").select("id", head).lt("created_at", retentionCutoff().toISOString())),
    count(supabase.from("offers").select("id", head)),
    count(supabase.from("guides").select("slug", head)),
    count(supabase.from("guides").select("slug", head).eq("status", "published")),
  ]);

  const cards = [
    { href: "/admin/demandes?statut=nouveau", label: "Nouvelles demandes", value: newRequests, hint: `${totalRequests} au total`, icon: Inbox },
    { href: "/admin/tarifs", label: "Offres en base", value: offers, hint: offers ? "Modifiables" : "Contenu par défaut affiché", icon: Euro },
    { href: "/admin/guides", label: "Guides publiés", value: published, hint: `${guides} en base`, icon: BookOpen },
    {
      href: "/admin/donnees",
      label: `Demandes > ${REQUEST_RETENTION_MONTHS} mois`,
      value: expired,
      hint: expired ? "À purger" : "Rien à purger",
      icon: ShieldCheck,
    },
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

      {(offers === 0 || guides === 0) && (
        <Panel className="mt-6">
          <h2 className="font-semibold text-ink">Première utilisation</h2>
          <p className="mt-1 text-sm text-muted">
            Votre base ne contient pas encore {offers === 0 && guides === 0 ? "les offres ni les guides" : offers === 0 ? "les offres" : "les guides"}. Le
            site affiche pour l&apos;instant le contenu par défaut. Importez-le pour pouvoir le modifier ici.
          </p>
          <ImportDefaultsForm />
        </Panel>
      )}

      <Panel className="mt-6">
        <h2 className="font-semibold text-ink">Raccourcis</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { href: "/admin/guides/nouveau", label: "Écrire un nouveau guide" },
            { href: "/admin/tarifs", label: "Modifier les prix" },
            { href: "/admin/services", label: "Masquer ou afficher un service" },
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
