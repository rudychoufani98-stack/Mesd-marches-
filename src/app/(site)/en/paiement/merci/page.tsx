import { ThankYouView, paymentMetadata } from "@/views/PaymentViews";

export const metadata = paymentMetadata("en");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ThankYouView searchParams={searchParams} locale="en" />;
}
