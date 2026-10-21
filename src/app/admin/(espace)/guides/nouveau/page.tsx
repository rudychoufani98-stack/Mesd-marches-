import Link from "next/link";
import { officialSources } from "@/content/sources";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle } from "@/components/admin/ui";
import { GuideEditor } from "../GuideEditor";

export const metadata = { title: "Nouveau guide" };

export default async function NewGuidePage() {
  await requireAdmin();
  const sources = Object.values(officialSources).map(({ id, name, url }) => ({ id, name, url }));
  return (
    <>
      <Link href="/admin/guides" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
        ← Tous les guides
      </Link>
      <AdminTitle title="Nouveau guide" description="Le guide est créé en brouillon par défaut : il ne sera visible qu'une fois publié." />
      <GuideEditor sources={sources} />
    </>
  );
}
