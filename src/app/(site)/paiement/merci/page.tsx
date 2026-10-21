import { ThankYouView, paymentMetadata } from "@/views/PaymentViews";

export const metadata = paymentMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ThankYouView searchParams={searchParams} locale="fr" />;
}
