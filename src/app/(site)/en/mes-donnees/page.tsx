import { MyDataView, myDataMetadata } from "@/views/MyDataView";

export const metadata = myDataMetadata("en");

export default function Page() {
  return <MyDataView locale="en" />;
}
