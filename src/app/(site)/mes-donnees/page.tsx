import { MyDataView, myDataMetadata } from "@/views/MyDataView";

export const metadata = myDataMetadata("fr");

export default function Page() {
  return <MyDataView locale="fr" />;
}
