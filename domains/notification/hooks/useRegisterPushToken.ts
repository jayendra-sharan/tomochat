import Constants from "expo-constants";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRegisterPushTokenMutation } from "../notificationApi";

export const useRegisterPushToken = () => {
  const [registerToken] = useRegisterPushTokenMutation();

  useEffect(() => {
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      const { data: token } = await Notifications.getExpoPushTokenAsync();
      console.log("TEST Push token:", token);
      if (!token) return;

      await registerToken({ token, platform: "expo" });
    };

    setup();
  }, []);
};
