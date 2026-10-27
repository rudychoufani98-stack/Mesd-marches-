"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CreditCard, Euro, Inbox, LayoutDashboard, Lock, ShieldCheck, ToggleRight } from "lucide-react";

const items = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/demandes", label: "Demandes", icon: Inbox },
  { href: "/admin/paiements", label: "Paiements", icon: CreditCard },
  { href: "/admin/tarifs", label: "Tarifs", icon: Euro },
  { href: "/admin/guides", label: "Guides", icon: BookOpen },
  { href: "/admin/services", label: "Services", icon: ToggleRight },
  { href: "/admin/donnees", label: "Données personnelles", icon: ShieldCheck },
  { href: "/admin/securite", label: "Sécurité", icon: Lock },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation de l'espace admin" className="overflow-x-auto">
      <ul className="flex gap-1 lg:flex-col">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-10 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium text-muted hover:bg-white hover:text-ink aria-[current=page]:bg-white aria-[current=page]:text-brand-700 aria-[current=page]:shadow-sm"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
