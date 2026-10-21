"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copie un lien complet (domaine du site + chemin) dans le presse-papiers. */
export function CopyLinkButton({ path, label }: { path: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(new URL(path, window.location.origin).toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez ce lien :", new URL(path, window.location.origin).toString());
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-sm font-medium text-ink hover:border-brand-300"
    >
      {copied ? <Check className="h-4 w-4 text-accent-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {copied ? "Lien copié" : label}
    </button>
  );
}
