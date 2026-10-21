import { Briefcase, Calculator, HeartPulse, Home, Landmark, MapPin, MonitorSmartphone, Users, type LucideIcon } from "lucide-react";
import type { CategoryIconName } from "@/content/categories";

const icons: Record<CategoryIconName, LucideIcon> = {
  MapPin,
  Home,
  Landmark,
  Briefcase,
  HeartPulse,
  Calculator,
  Users,
  MonitorSmartphone,
};

export function CategoryIcon({ name, className = "h-5 w-5" }: { name: CategoryIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
