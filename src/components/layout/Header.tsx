"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { getDictionary } from "@/i18n";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/primitives";

const t = getDictionary();

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label={t.common.mainNavigation} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink aria-[current=page]:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/connexion" className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-ink">
            {t.common.login}
          </Link>
          <ButtonLink href="/plan-action">{t.common.primaryCta}</ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-surface xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t.common.closeMenu : t.common.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label={t.common.mainNavigation} className="border-t border-line bg-white xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block rounded-lg px-3 py-3 font-medium text-ink hover:bg-surface aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/connexion" className="block rounded-lg px-3 py-3 font-medium text-ink hover:bg-surface">
                {t.common.login}
              </Link>
            </li>
            <li className="pt-2">
              <ButtonLink href="/plan-action" size="lg" className="w-full">
                {t.common.primaryCta}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
