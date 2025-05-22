import { useEffect } from "react";
import { SocketEvents } from "@/domains/socket/events";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";

type ChatRoomInput = {
  userId?: string;
  roomId?: string;
};

export function useChatRoom({ userId, roomId }: ChatRoomInput) {
  const socket = useSocketContext();
  useEffect(() => {
    if (!userId || !roomId) return;

    socket.emit(SocketEvents.JOIN_ROOM, { userId, roomId });

    return () => {
      socket.emit(SocketEvents.LEAVE_ROOM, { userId, roomId });
    };
  }, [userId, roomId]);
}
