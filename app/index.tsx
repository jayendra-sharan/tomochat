import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { initSentry } from "@/services/logger/sentry";
import { configureNotificationHandler } from "@/domains/notification/lib/setNotificationHandler";

initSentry();

configureNotificationHandler({
  alertEnabled: true,
  soundEnabled: true,
  badgeEnabled: true,
});

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isEmailVerified } = user || {};
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      if (isLoggedIn && isEmailVerified) {
        router.push("/(main)/dashboard");
      } else {
        router.push("/(auth)/login");
      }
    }
  }, [isEmailVerified, isLoggedIn, mounted]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>t</Text>
      <Image source={require("@/assets/images/logo.png")} />
    </View>
  );
}
