import { PricingView, pricingMetadata } from "@/views/PricingView";

export const metadata = pricingMetadata("fr");

export default function Page() {
  return <PricingView locale="fr" />;
}
