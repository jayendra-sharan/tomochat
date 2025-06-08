import { AuthGate } from "@/domains/auth/components/AuthGate";

export default function Home() {
  return <AuthGate />;
}
