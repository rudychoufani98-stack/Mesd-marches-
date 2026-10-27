import { ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/server";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { EnrollTotp } from "./EnrollTotp";

export const metadata = { title: "Sécurité" };

export default async function AdminSecurityPage() {
  const { mfaEnabled } = await requireAdmin();
  return (
    <>
      <AdminTitle
        title="Sécurité du compte"
        description="La double authentification protège les données de vos clients : même avec votre mot de passe, personne ne peut entrer sans le code de votre téléphone."
      />
      {mfaEnabled ? (
        <Panel className="flex items-start gap-3 border-accent-200 bg-accent-50">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
          <div className="text-sm text-ink">
            <p className="font-semibold">Double authentification activée.</p>
            <p className="mt-1 text-muted">
              Un code vous est demandé à chaque connexion. Si vous perdez votre téléphone : Supabase → Authentication → Users → votre compte →
              supprimez le facteur « MFA », puis réactivez la double authentification ici.
            </p>
          </div>
        </Panel>
      ) : (
        <EnrollTotp />
      )}
    </>
  );
}
