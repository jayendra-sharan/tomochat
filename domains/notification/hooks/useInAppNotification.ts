import { InAppNotificationPayload } from "@/domains/shared/types/socketEvents";
import { SocketEvents } from "@/domains/socket/events";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { useEffect } from "react";
import { showToast } from "../lib/showToast";
import { SocketType } from "@/domains/socket/SocketProvider";

export function useInAppNotification(socket: SocketType) {
  // const socket = useSocketContext();
  useEffect(() => {
    if (!socket) return;
    const inAppNotificationHandler = (data: InAppNotificationPayload) => {
      const { roomName, displayName, message } = data;
      showToast("info", `${roomName}`, `${displayName}: ${message}`);
    };
    socket.on(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);

    return () => {
      socket.off(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);
    };
  }, [socket]);
}
