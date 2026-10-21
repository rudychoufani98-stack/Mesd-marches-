import { ContactView, contactMetadata } from "@/views/ContactView";

export const metadata = contactMetadata("fr");

export default function Page() {
  return <ContactView locale="fr" />;
}
