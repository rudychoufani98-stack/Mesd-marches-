import { BookingConfirmationView, bookingConfirmationMetadata } from "@/views/AppointmentView";

export const metadata = bookingConfirmationMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <BookingConfirmationView locale="fr" searchParams={searchParams} />;
}
