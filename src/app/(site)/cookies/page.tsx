import { CookiesView, cookiesMetadata } from "@/views/CookiesView";

export const metadata = cookiesMetadata("fr");

export default function Page() {
  return <CookiesView locale="fr" />;
}
