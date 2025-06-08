import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import {
  Alert,
  Platform,
  AppState,
  AppStateStatus,
  Linking,
} from "react-native";
import { useRegisterPushTokenMutation } from "../notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";

export const usePushNotifications = () => {
  const [registerToken] = useRegisterPushTokenMutation();
  const { isLoggedIn } = useAuth();
  const appState = useRef(AppState.currentState);
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) {
      logger.debug("Push: Skipping setup — not logged in");
      return;
    }

    if (!Device.isDevice) {
      logger.debug("Push: Skipping setup — not a physical device");
      return;
    }

    const setup = async () => {
      logger.debug("Push: Starting notification setup");

      try {
        const permission = await Notifications.getPermissionsAsync();
        logger.debug("Push: Current permission", permission);
        let finalStatus = permission.status;

        if (finalStatus !== "granted") {
          logger.debug("Push: Not granted yet — prompting user");

          if (!permission.canAskAgain) {
            logger.debug("Push: can't ask again — showing settings alert");

            Alert.alert(
              "Notifications Disabled",
              "Please enable notifications manually in your device settings.",
              [
                {
                  text: "Open Settings",
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
                { text: "Cancel", style: "cancel" },
              ]
            );

            return;
          }

          const askUser = await new Promise<boolean>((resolve) => {
            Alert.alert(
              "Stay Updated",
              "Allow notifications to receive important updates.",
              [
                {
                  text: "No thanks",
                  onPress: () => {
                    logger.debug("Push: User declined in custom alert");
                    resolve(false);
                  },
                  style: "cancel",
                },
                {
                  text: "Allow",
                  onPress: () => {
                    logger.debug("Push: User accepted in custom alert");
                    resolve(true);
                  },
                },
              ]
            );
          });

          if (!askUser) {
            logger.debug("Push: Exiting — user declined permission prompt");
            return;
          }

          const request = await Notifications.requestPermissionsAsync();
          logger.debug("Push: Requested permissions result", request);
          finalStatus = request.status;
        }

        if (finalStatus !== "granted") {
          logger.debug("Push: Still not granted — exiting");
          return;
        }

        logger.debug("Push: Permission granted ✅");

        if (Platform.OS === "android") {
          logger.debug("Push: Setting Android notification channel");
          await Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.DEFAULT,
            sound: "default",
          });
        }

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId,
        });

        logger.debug("Push: Expo token", { token });

        if (token) {
          logger.debug("Push: Registering push token to server");
          await registerToken({ token, platform: Platform.OS });
        }

        Notifications.addPushTokenListener(async (newToken) => {
          try {
            logger.debug("Push: Token changed — re-registering", newToken);
            await registerToken({
              token: newToken.data,
              platform: Platform.OS,
            });
          } catch (err) {
            logger.error(err, { method: "PushTokenListener" });
          }
        });

        hasRunOnce.current = true;
        logger.debug("Push: Notification setup complete ✅");
      } catch (err) {
        logger.error(err, { method: "usePushNotifications.setup" });
      }
    };

    setup();

    const handleAppStateChange = async (nextState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        logger.debug("Push: App returned to foreground");

        if (!hasRunOnce.current) {
          logger.debug("Push: Retrying notification setup");
          await setup();
        } else {
          logger.debug("Push: Skipping retry — already ran setup once");
        }
      }

      appState.current = nextState;
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);

    return () => sub.remove();
  }, [isLoggedIn]);
};
