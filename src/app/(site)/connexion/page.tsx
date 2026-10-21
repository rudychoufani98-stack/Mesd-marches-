import { LoginView, loginMetadata } from "@/views/LoginView";

export const metadata = loginMetadata("fr");

export default function Page() {
  return <LoginView locale="fr" />;
}
