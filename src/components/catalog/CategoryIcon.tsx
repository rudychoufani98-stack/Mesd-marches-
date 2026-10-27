import { Briefcase, Building2, FileCheck2, HeartPulse, Home, Landmark, type LucideIcon, Receipt, Sofa } from "lucide-react";
import type { CategoryIcon as IconKey } from "@/config/catalog";

/** Icône de chaque catégorie (cohérente sur tout le site et dans l'admin). */
export const CATEGORY_ICONS: Record<IconKey, LucideIcon> = {
  logement: Home,
  fiscalite: Receipt,
  sante: HeartPulse,
  banque: Landmark,
  emploi: Briefcase,
  immigration: FileCheck2,
  quotidien: Sofa,
  business: Building2,
};

export function CategoryIcon({ icon, className = "h-5 w-5" }: { icon: IconKey; className?: string }) {
  const Icon = CATEGORY_ICONS[icon] ?? Sofa;
  return <Icon className={className} aria-hidden="true" />;
}
