import Link from "next/link";
import { AlertTriangle, BadgeCheck, Plus } from "lucide-react";
import { getCategory } from "@/content/categories";
import { defaultGuides } from "@/content/guides";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, formatDateTime, Panel } from "@/components/admin/ui";
import { Badge, ButtonLink } from "@/components/ui/primitives";
import { ImportDefaultsForm } from "../ImportDefaultsForm";
import { guideLinksEnabled } from "@/lib/guideAccess";

export const metadata = { title: "Guides" };

type Row = { slug: string; title: string; category: string; status: "draft" | "published"; last_verified: string | null; updated_at: string };

export default async function AdminGuidesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("guides")
    .select("slug, title, category, status, last_verified, updated_at")
    .order("updated_at", { ascending: false });
  const guides = (data ?? []) as Row[];
  const missing = defaultGuides.filter((d) => !guides.some((g) => g.slug === d.slug));

  return (
    <>
      <AdminTitle
        title="Guides clients"
        description="Les guides ne sont plus publics : ouvrez un guide et copiez son « Lien client » pour l'envoyer à un client qui a payé. Un guide en brouillon n'est jamais accessible."
      >
        <ButtonLink href="/admin/guides/nouveau">
          <Plus className="h-4 w-4" aria-hidden="true" /> Nouveau guide
        </ButtonLink>
      </AdminTitle>

      {!guideLinksEnabled() && (
        <Panel className="mb-6 border-amber-200 bg-amber-50">
          <p className="text-sm text-amber-900">
            <strong>Liens clients désactivés.</strong> Ajoutez la variable <code>GUIDES_LINK_SECRET</code> dans Vercel (Settings → Environment
            Variables) avec une longue phrase secrète de votre choix, puis redéployez.
          </p>
        </Panel>
      )}

      {missing.length > 0 && guides.length > 0 && (
        <Panel className="mb-6 border-brand-200 bg-brand-50/40">
          <p className="text-sm text-ink">
            <span aria-hidden="true">🆕</span> {missing.length} nouveau(x) guide(s) disponible(s) dans le contenu par défaut :{" "}
            <strong>{missing.map((g) => g.title).join(", ")}</strong>. Importez-les pour qu&apos;ils apparaissent sur le site (vos
            guides existants ne seront pas modifiés).
          </p>
          <ImportDefaultsForm />
        </Panel>
      )}

      {guides.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">Aucun guide en base : le site affiche les guides par défaut. Importez-les pour pouvoir les modifier.</p>
          <ImportDefaultsForm />
        </Panel>
      ) : (
        <Panel className="p-0 sm:p-0">
          <ul className="divide-y divide-line">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/admin/guides/${g.slug}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-surface">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{g.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {getCategory(g.category)?.shortTitle ?? g.category} · modifié le {formatDateTime(g.updated_at)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {g.last_verified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-accent-700">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Vérifié
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-800">
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> À vérifier
                      </span>
                    )}
                    <Badge tone={g.status === "published" ? "accent" : "neutral"}>{g.status === "published" ? "Publié" : "Brouillon"}</Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );
}
