"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { clearAllLocal } from "@/lib/storage";
import { Button } from "@/components/ui/primitives";

/** Efface le plan d'action, les checklists, le budget et les préférences stockés sur cet appareil. */
export function ClearLocalDataButton() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (!window.confirm("Effacer votre plan d'action, vos checklists et votre budget enregistrés sur cet appareil ?")) return;
          const n = clearAllLocal();
          setMessage(n ? "Les données enregistrées sur cet appareil ont été effacées." : "Aucune donnée n'était enregistrée sur cet appareil.");
        }}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" /> Effacer les données de cet appareil
      </Button>
      {message && (
        <p role="status" className="mt-2 text-sm text-accent-700">
          {message}
        </p>
      )}
    </div>
  );
}
