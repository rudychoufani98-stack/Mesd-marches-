import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CookieNotice } from "@/components/privacy/CookieNotice";

/** Habillage du site public, français et anglais (l'espace admin a le sien). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
