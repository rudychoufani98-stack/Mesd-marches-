import { PayView, paymentMetadata } from "@/views/PaymentViews";

export const metadata = paymentMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <PayView searchParams={searchParams} locale="fr" />;
}
