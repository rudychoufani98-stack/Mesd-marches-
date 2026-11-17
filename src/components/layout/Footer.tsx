"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getDictionary, href, localeFromPath } from "@/i18n";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink, Container } from "@/components/ui/primitives";

/** Pied de page bleu nuit : marque, accès rapide aux accompagnements (maillage interne), informations légales. */
export function Footer() {
  const locale = localeFromPath(usePathname());
  const t = getDictionary(locale);
  const reassurance =
    locale === "en"
      ? ["By video or phone, wherever you are.", "Secure payment, confidential data."]
      : ["En visio ou par téléphone, où que vous soyez.", "Paiement sécurisé, données confidentielles."];

  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-950 text-brand-100">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo href={href("/", locale)} tone="dark" />
            <p className="mt-5 max-w-xs leading-relaxed text-brand-100/80">{t.footer.tagline}</p>
            <ButtonLink href={`${href("/rendez-vous", locale)}?mode=appel`} variant="light" className="mt-7">
              {t.footer.cta}
            </ButtonLink>
            <ul className="mt-7 space-y-1.5 text-sm text-brand-100/65">
              {reassurance.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {t.footer.groups.map((group) => (
              <div key={group.title}>
                <h2 className="border-b border-white/10 pb-3 font-display text-base font-semibold text-white">{group.title}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={href(item.href, locale)}
                        className="inline-flex min-h-10 items-center text-sm text-brand-100/75 transition-colors hover:text-white sm:min-h-8"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="max-w-xl sm:text-right">{t.footer.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
