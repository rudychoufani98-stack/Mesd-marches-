import type { ChecklistItem, GlossaryEntry, GuideStep } from "@/content/guides";

/**
 * Format texte simple utilisé dans l'éditeur de guides de l'espace admin.
 *
 * Étapes :          Checklist :              Glossaire :
 *   ## Titre          Une ligne = une case     Terme : définition
 *   Texte…                                     (une ligne par terme)
 *
 *   ## Titre 2
 *   Texte…
 */

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function parseSteps(text: string): GuideStep[] {
  const steps: GuideStep[] = [];
  let current: { title: string; lines: string[] } | null = null;
  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trimEnd();
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (current) steps.push({ title: current.title, body: current.lines.join("\n").trim() });
      current = { title: heading[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) steps.push({ title: current.title, body: current.lines.join("\n").trim() });
  return steps.filter((s) => s.title && s.body);
}

export function formatSteps(steps: GuideStep[]): string {
  return steps.map((s) => `## ${s.title}\n${s.body}`).join("\n\n");
}

export function parseChecklist(text: string): ChecklistItem[] {
  const used = new Set<string>();
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean)
    .map((label) => {
      const base = slugify(label) || "element";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      return { id, label };
    });
}

export function formatChecklist(items: ChecklistItem[]): string {
  return items.map((i) => i.label).join("\n");
}

export function parseGlossary(text: string): GlossaryEntry[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      return i > 0 ? { term: l.slice(0, i).trim(), definition: l.slice(i + 1).trim() } : null;
    })
    .filter((e): e is GlossaryEntry => e !== null && e.term.length > 0 && e.definition.length > 0);
}

export function formatGlossary(entries: GlossaryEntry[] = []): string {
  return entries.map((e) => `${e.term} : ${e.definition}`).join("\n");
}

/** Lignes non vides d'une zone de texte (listes « inclus / non inclus » des offres). */
export function parseLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);
}
