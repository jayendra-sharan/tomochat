import { useEffect  } from "react";
import socket from "../socket";
import { SocketEvents } from "../socketEvents";

type ChatRoomInput = {
  userId?: string;
  roomId?: string;
}

export function useChatRoom({ userId, roomId }: ChatRoomInput) {
  useEffect(() => {
    if (!userId ||  !roomId) return;

    socket.emit(SocketEvents.JOIN_ROOM, { userId, roomId });

    return () => {
      socket.emit(SocketEvents.LEAVE_ROOM, { userId, roomId });
    }
  }, [userId, roomId])
};
