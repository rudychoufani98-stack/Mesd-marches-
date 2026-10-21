import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { officialSources } from "@/content/sources";
import { deleteGuide } from "@/lib/admin/actions";
import { guideFromRow, type GuideRow } from "@/lib/data/mappers";
import { requireAdmin } from "@/lib/supabase/server";
import { ActionButton } from "@/components/admin/forms";
import { AdminTitle } from "@/components/admin/ui";
import { GuideEditor } from "../GuideEditor";

export const metadata = { title: "Modifier un guide" };

export default async function EditGuidePage({ params, searchParams }: PageProps<"/admin/guides/[slug]">) {
  const { supabase } = await requireAdmin();
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const { data } = await supabase.from("guides").select("*").eq("slug", slug).maybeSingle();
  const guide = data ? guideFromRow(data as GuideRow) : null;
  if (!guide) notFound();
  const sources = Object.values(officialSources).map(({ id, name, url }) => ({ id, name, url }));

  return (
    <>
      <Link href="/admin/guides" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
        ← Tous les guides
      </Link>
      <AdminTitle title={guide.title}>
        {guide.status === "published" && (
          <Link href={`/guides/${guide.slug}`} target="_blank" className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
            Voir sur le site <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </AdminTitle>
      {sp.cree === "1" && (
        <p role="status" className="mb-4 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Guide créé.
        </p>
      )}
      <GuideEditor guide={guide} sources={sources} />
      <div className="mt-10 border-t border-line pt-6">
        <ActionButton
          action={deleteGuide}
          fields={{ slug: guide.slug }}
          variant="ghost"
          className="text-red-700 hover:bg-red-50"
          confirmMessage={`Supprimer définitivement le guide « ${guide.title} » ? Cette action est irréversible.`}
        >
          Supprimer ce guide
        </ActionButton>
      </div>
    </>
  );
}
