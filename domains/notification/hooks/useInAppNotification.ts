import { InAppNotificationPayload } from "@/domains/shared/types/socketEvents";
import { SocketEvents } from "@/domains/socket/events";
import { useEffect } from "react";
import { showToast } from "../lib/showToast";
import { SocketType } from "@/domains/socket/SocketProvider";
import { updateLastMessage } from "@/domains/rooms/lib/updateLastMessage";
import { store } from "@/redux/store";

export function useInAppNotification(socket: SocketType) {
  useEffect(() => {
    if (!socket) return;
    const inAppNotificationHandler = (data: InAppNotificationPayload) => {
      const currentRoomId = store.getState()?.room?.currentRoomId;
      const { roomId, roomName, message } = data;
      if (currentRoomId === roomId) return;
      showToast("info", `${roomName}`, message);
      updateLastMessage({ roomId, lastMessage: message });
    };
    socket.on(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);

    return () => {
      socket.off(SocketEvents.IN_APP_NOTIFICATION, inAppNotificationHandler);
    };
  }, [socket]);
}
