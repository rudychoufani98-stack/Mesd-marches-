import Link from "next/link";
import { Info } from "lucide-react";
import { footerNav, siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/primitives";

const t = getDictionary();

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-brand-700 sm:min-h-8">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <p>{siteConfig.disclaimer}</p>
        </div>

        <p className="mt-6 text-xs text-muted">
          © {siteConfig.name}. {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
