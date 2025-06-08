import { useRouter } from "expo-router";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useEffect } from "react";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";

export const AuthGate = () => {
  const { isLoggedIn, isEmailVerified, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn && isEmailVerified) {
        router.replace("/(main)/dashboard");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [isLoading, isLoggedIn, isEmailVerified]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
};
