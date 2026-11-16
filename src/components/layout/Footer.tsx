"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Lock, Video } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary, href, localeFromPath } from "@/i18n";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink, Container } from "@/components/ui/primitives";

/** Pied de page sombre : marque, accès rapide aux accompagnements (maillage interne), informations légales. */
export function Footer() {
  const locale = localeFromPath(usePathname());
  const t = getDictionary(locale);
  const reassurance =
    locale === "en"
      ? [
          { icon: Video, text: "By video or phone, wherever you are" },
          { icon: Lock, text: "Secure payment, confidential data" },
        ]
      : [
          { icon: Video, text: "En visio ou par téléphone, où que vous soyez" },
          { icon: Lock, text: "Paiement sécurisé, données confidentielles" },
        ];

  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo href={href("/", locale)} tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-100/80">{t.footer.tagline}</p>
            <ButtonLink href={`${href("/rendez-vous", locale)}?mode=appel`} variant="gold" className="mt-6">
              {t.footer.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ul className="mt-6 space-y-2 text-sm text-brand-100/70">
              {reassurance.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold-300" aria-hidden="true" /> {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {t.footer.groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{group.title}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={href(item.href, locale)}
                        className="inline-flex min-h-10 items-center text-sm text-brand-100/80 transition-colors hover:text-white sm:min-h-8"
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

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="max-w-xl sm:text-right">{t.footer.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
