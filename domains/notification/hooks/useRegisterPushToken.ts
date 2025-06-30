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
      return;
    }
    const setup = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") return;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        if (!token) return;

        await registerToken({ token, platform: "expo" });
      } catch (error) {
        logger.error(error, { method: "useRegisterPushToken" });
      }
    };

    setup();
  }, [isLoggedIn, displayName]);
};
