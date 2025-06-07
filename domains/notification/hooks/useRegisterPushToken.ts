import Constants from "expo-constants";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRegisterPushTokenMutation } from "../notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";

export const useRegisterPushToken = () => {
  const [registerToken] = useRegisterPushTokenMutation();
  const { isLoggedIn, displayName } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Not logged in - no notification, return.");
      return;
    }
    const setup = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("Status", status);
        if (status !== "granted") return;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        console.log("SENDING - ", projectId);
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId: "502be1d7-6a97-45f8-9238-e0b7deda5968",
        });
        console.log("TEST Push token:", token);
        if (!token) return;

        await registerToken({ token, platform: "expo" });
      } catch (error) {
        logger.error(error, { method: "useRegisterPushToken" });
      }
    };

    setup();
  }, [isLoggedIn, displayName]);
};
