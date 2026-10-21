import { CookiesView, cookiesMetadata } from "@/views/CookiesView";

export const metadata = cookiesMetadata("en");

export default function Page() {
  return <CookiesView locale="en" />;
}
