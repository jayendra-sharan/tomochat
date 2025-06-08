import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export type NotificationPreferences = {
  soundEnabled: boolean;
  badgeEnabled: boolean;
  alertEnabled: boolean;
};

export const configureNotificationHandler = (
  userPrefs: NotificationPreferences
) => {
  const isIOS = Platform.OS === "ios";

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: userPrefs.alertEnabled,
      shouldPlaySound: userPrefs.soundEnabled,
      shouldSetBadge: userPrefs.badgeEnabled,
      shouldShowBanner: isIOS && userPrefs.alertEnabled,
      shouldShowList: isIOS && userPrefs.alertEnabled,
    }),
  });
};
