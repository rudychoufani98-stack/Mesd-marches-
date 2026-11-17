"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { getDictionary, href, localeFromPath, stripLocale, switchLocalePath } from "@/i18n";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/primitives";

function isActive(pathname: string, path: string) {
  const current = stripLocale(pathname);
  return path === "/" ? current === "/" : current.startsWith(path);
}

/** Bouton de langue : code de l'autre langue, vers la même page dans cette langue. */
function LanguageSwitch({ pathname, className = "" }: { pathname: string; className?: string }) {
  const locale = localeFromPath(pathname);
  const target = locale === "fr" ? "en" : "fr";
  const t = getDictionary(locale);
  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={t.common.switchTo}
      title={t.common.switchTo}
      className={`inline-flex min-h-10 items-center rounded-[3px] border border-line px-3 text-sm font-semibold tracking-wide text-ink/80 transition-colors hover:border-ink/40 hover:text-ink ${className}`}
    >
      {t.common.switchLabel}
    </Link>
  );
}

/** En-tête clair et sobre : marque, navigation, accès à l'appel offert. Un filet apparaît au défilement. */
export function Header() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ferme le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const callHref = `${href("/rendez-vous", locale)}?mode=appel`;

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${
        scrolled || open ? "border-line shadow-[0_1px_0_rgba(22,32,58,0.04)]" : "border-line/70"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo href={href("/", locale)} />

        <nav aria-label={t.common.mainNavigation} className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={href(item.href, locale)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="whitespace-nowrap py-2 text-[15px] text-ink/70 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:shadow-[inset_0_-1px_0_var(--color-brand-700)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-5 xl:flex">
            <Link href={href("/connexion", locale)} className="text-[15px] text-ink/70 transition-colors hover:text-ink">
              {t.common.login}
            </Link>
            <ButtonLink href={callHref} className="whitespace-nowrap">
              <Phone className="h-4 w-4" aria-hidden="true" /> {t.common.primaryCta}
            </ButtonLink>
          </div>
          <LanguageSwitch pathname={pathname} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] text-ink hover:bg-surface xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label={t.common.mainNavigation} className="border-t border-line bg-paper xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {t.nav.map((item) => (
              <li key={item.href} className="border-b border-line/70">
                <Link
                  href={href(item.href, locale)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-3.5 font-display text-lg text-ink/80 aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-line/70">
              <Link href={href("/connexion", locale)} className="block py-3.5 font-display text-lg text-ink/80">
                {t.common.login}
              </Link>
            </li>
            <li className="pt-4 pb-2">
              <ButtonLink href={callHref} size="lg" className="w-full">
                <Phone className="h-4 w-4" aria-hidden="true" /> {t.common.primaryCta}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
