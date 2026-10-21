"use client";

import { importDefaults } from "@/lib/admin/actions";
import { AdminForm, ResultMessage, SubmitButton } from "@/components/admin/forms";

export function ImportDefaultsForm() {
  return (
    <AdminForm action={importDefaults} className="mt-4 space-y-3">
      {(result) => (
        <>
          <ResultMessage result={result} />
          <SubmitButton pendingLabel="Import en cours…">Importer le contenu par défaut</SubmitButton>
        </>
      )}
    </AdminForm>
  );
}
