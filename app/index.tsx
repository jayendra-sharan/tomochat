import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { initSentry } from "@/services/logger/sentry";
import * as Notifications from "expo-notifications";

initSentry();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      if (isLoggedIn) {
        router.push("/(main)/dashboard");
      } else {
        router.push("/(auth)/login");
      }
    }
  }, [isLoggedIn, mounted]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>t</Text>
      <Image source={require("@/assets/images/logo.png")} />
    </View>
  );
}
