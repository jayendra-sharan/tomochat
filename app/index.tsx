import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import * as Notifications from "expo-notifications";
import { useRegisterPushToken } from "@/domains/notification/hooks/useRegisterPushToken";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isEmailVerified } = user || {};
  useRegisterPushToken();
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
