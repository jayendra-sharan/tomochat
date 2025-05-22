import { useGetMeQuery } from "@/domains/auth/authApi";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import * as Notifications from "expo-notifications";

export default function Home() {
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (user?.email) router.push("/(main)/dashboard");
      else router.push("/(auth)/login");
    }
  }, [user?.email, mounted]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("@/assets/images/logo.png")} />
    </View>
  );
}
