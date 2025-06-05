import Constants from "expo-constants";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRegisterPushTokenMutation } from "../notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";

export const useRegisterPushToken = () => {
  const [registerToken] = useRegisterPushTokenMutation();
  const { isLoggedIn, displayName } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Not logged in - no notification, return.");
      return;
    }
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Status", status);
      if (status !== "granted") return;

      const { data: token } = await Notifications.getExpoPushTokenAsync();
      console.log("TEST Push token:", token);
      if (!token) return;

      await registerToken({ token, platform: "expo" });
    };

    setup();
  }, [isLoggedIn, displayName]);
};
