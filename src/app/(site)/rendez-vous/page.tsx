import { AppointmentView, appointmentMetadata } from "@/views/AppointmentView";

export const metadata = appointmentMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <AppointmentView locale="fr" searchParams={searchParams} />;
}
