"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Locale } from "@/i18n";
import { clearAllLocal } from "@/lib/storage";
import { Button } from "@/components/ui/primitives";

const copy = {
  fr: {
    confirm: "Effacer votre plan d'action, vos checklists et votre budget enregistrés sur cet appareil ?",
    cleared: "Les données enregistrées sur cet appareil ont été effacées.",
    empty: "Aucune donnée n'était enregistrée sur cet appareil.",
    button: "Effacer les données de cet appareil",
  },
  en: {
    confirm: "Delete your action plan, checklists and budget saved on this device?",
    cleared: "The data saved on this device has been deleted.",
    empty: "No data was saved on this device.",
    button: "Delete the data on this device",
  },
} as const;

/** Efface le plan d'action, les checklists, le budget et les préférences stockés sur cet appareil. */
export function ClearLocalDataButton({ locale = "fr" }: { locale?: Locale }) {
  const [message, setMessage] = useState<string | null>(null);
  const t = copy[locale];
  return (
    <div>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (!window.confirm(t.confirm)) return;
          const n = clearAllLocal();
          setMessage(n ? t.cleared : t.empty);
        }}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" /> {t.button}
      </Button>
      {message && (
        <p role="status" className="mt-2 text-sm text-accent-700">
          {message}
        </p>
      )}
    </div>
  );
}
