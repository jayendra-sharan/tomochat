import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import { useRegisterPushTokenMutation } from "../notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";

export const usePushNotifications = () => {
  const [registerToken] = useRegisterPushTokenMutation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const setup = async () => {
      try {
        if (!Device.isDevice) return;

        const permission = await Notifications.getPermissionsAsync();
        let finalStatus = permission.status;

        if (finalStatus !== "granted") {
          const askUser = await new Promise<boolean>((resolve) => {
            Alert.alert(
              "Stay Updated",
              "Allow notifications to receive important updates.",
              [
                {
                  text: "No thanks",
                  onPress: () => resolve(false),
                  style: "cancel",
                },
                { text: "Allow", onPress: () => resolve(true) },
              ]
            );
          });

          if (!askUser) return;

          const request = await Notifications.requestPermissionsAsync();
          finalStatus = request.status;
        }

        if (finalStatus !== "granted") return;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId,
        });

        if (token) {
          await registerToken({ token, platform: Platform.OS });
        }

        Notifications.addPushTokenListener(async (newToken) => {
          try {
            await registerToken({
              token: newToken.data,
              platform: Platform.OS,
            });
          } catch (err) {
            logger.error(err, { method: "PushTokenListener" });
          }
        });
      } catch (err) {
        logger.error(err, { method: "usePushNotifications" });
      }
    };

    setup();
  }, [isLoggedIn]);
};
