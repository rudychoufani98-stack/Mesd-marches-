import { ServicesView, servicesMetadata } from "@/views/ServicesView";

export const metadata = servicesMetadata("fr");

export default function Page() {
  return <ServicesView locale="fr" />;
}
