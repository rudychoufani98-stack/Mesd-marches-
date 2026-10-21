import { PricingView, pricingMetadata } from "@/views/PricingView";

export const metadata = pricingMetadata("en");

export default function Page() {
  return <PricingView locale="en" />;
}
