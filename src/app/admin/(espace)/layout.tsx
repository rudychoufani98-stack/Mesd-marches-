import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: { default: "Espace admin", template: "%s | Admin MesDémarches" },
  robots: { index: false, follow: false },
};

async function AdminGate({ children }: { children: React.ReactNode }) {
  const { email, mfaEnabled } = await requireAdmin();
  return (
    <>
      <p className="mb-6 text-xs text-muted">Connecté·e : {email}</p>
      {!mfaEnabled && (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Protégez les données de vos clients :</strong> activez la double authentification.{" "}
          <Link href="/admin/securite" className="font-semibold underline">
            Activer maintenant
          </Link>
        </p>
      )}
      {children}
    </>
  );
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/admin" className="inline-flex items-center gap-2 font-semibold text-ink">
            <LogoMark className="h-7 w-7" /> Admin
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" target="_blank" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface hover:text-ink">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Voir le site</span>
            </Link>
            <form action={signOut}>
              <button type="submit" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface hover:text-ink">
                <LogOut className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:py-10">
        <aside>
          <Suspense fallback={<div className="h-10" />}>
            <AdminNav />
          </Suspense>
        </aside>
        <main className="min-w-0">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-card bg-white" aria-busy="true" />}>
            <AdminGate>{children}</AdminGate>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
