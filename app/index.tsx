import { useGetMeQuery } from "@/domains/auth/authApi";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";

export default function Home() {
  const { data: user, error } = useGetMeQuery();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { email } = user || {};
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      if (error || !email) {
        router.push("/(auth)/login");
      } else {
        router.push("/(main)/dashboard");
      }
    }
  }, [email, error]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>TomoChat</Text>
      <Image source={require("@/assets/images/logo.png")} />
    </View>
  );
}
