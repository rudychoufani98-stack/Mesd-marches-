import { ServicesView, servicesMetadata } from "@/views/ServicesView";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesView locale="en" />;
}
