import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/Logo";
import { VerifyCodeForm } from "./VerifyCodeForm";

export const metadata: Metadata = {
  title: "Vérification en deux étapes",
  robots: { index: false, follow: false },
};

/** Deuxième étape de connexion : code de l'application d'authentification. */
export default function AdminVerificationPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm rounded-card border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <span className="font-semibold text-ink">Vérification en deux étapes</span>
        </div>
        <p className="mt-4 text-sm text-muted">Ouvrez votre application d&apos;authentification et saisissez le code à 6 chiffres affiché pour MesDémarches.</p>
        <VerifyCodeForm />
      </div>
    </main>
  );
}
