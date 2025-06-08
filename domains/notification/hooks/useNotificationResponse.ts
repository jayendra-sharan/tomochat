import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { logger } from "@/services/logger";

type ChatNotificationPayload = {
  type: "chat";
  roomId: string;
  message: string;
};

export const useNotificationResponse = () => {
  const router = useRouter();

  useEffect(() => {
    const handleResponse = (response: Notifications.NotificationResponse) => {
      try {
        const data = response.notification.request.content
          .data as ChatNotificationPayload;

        if (data?.type === "chat" && data.roomId) {
          router.push(`/chat/${data.roomId}`);
        }
      } catch (err) {
        logger.error(err, { method: "useNotificationResponse" });
      }
    };

    const subscription =
      Notifications.addNotificationResponseReceivedListener(handleResponse);

    return () => {
      subscription.remove();
    };
  }, []);
};
