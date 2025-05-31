import { InAppNotificationPayload } from "@/domains/shared/types/socketEvents";
import { SocketEvents } from "@/domains/socket/events";
import { useEffect } from "react";
import { showToast } from "../lib/showToast";
import { SocketType } from "@/domains/socket/SocketProvider";
import { updateLastMessage } from "@/domains/rooms/lib/updateLastMessage";

export function useInAppNotification(socket: SocketType) {
  // const socket = useSocketContext();
  useEffect(() => {
    if (!socket) return;
    const inAppNotificationHandler = (data: InAppNotificationPayload) => {
      const { roomId, roomName, message } = data;
      showToast("info", `${roomName}`, message);
      updateLastMessage({ roomId, lastMessage: message });
    };
    socket.on(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);

    return () => {
      socket.off(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);
    };
  }, [socket]);
}
