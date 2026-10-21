import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LogoMark } from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm rounded-card border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <span className="font-semibold text-ink">Espace administrateur</span>
        </div>
        {!isSupabaseConfigured() && (
          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase n&apos;est pas encore configuré. Suivez la section « Espace admin » du README.
          </p>
        )}
        <Suspense>
          <LoginForm />
        </Suspense>
        <Link href="/" className="mt-6 inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          ← Retour au site
        </Link>
      </div>
    </main>
  );
}
