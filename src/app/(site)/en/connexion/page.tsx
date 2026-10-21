import { LoginView, loginMetadata } from "@/views/LoginView";

export const metadata = loginMetadata("en");

export default function Page() {
  return <LoginView locale="en" />;
}
