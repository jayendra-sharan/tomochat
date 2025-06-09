import { SocketEvents } from "@/domains/socket/events";
import { useEffect } from "react";
import { Message } from "../types";
import { chatApi } from "../chatApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";

export default function useNewMessageEvent(roomId: string) {
  const dispatch = useAppDispatch();
  const socket = useSocketContext();
  const { userId } = useAuth();

  useEffect(() => {
    if (!roomId || !socket) return;

    const handleNewMessage = (message: Message) => {
      logger.debug("New message received", message);
      if (message.sender.id === userId) {
        logger.debug("Self message, skipping update");
        return;
      }
      dispatch(
        chatApi.util.updateQueryData("getRoomChats", { roomId }, (draft) => {
          draft.messages.push(message);
        })
      );
    };
    socket.on(SocketEvents.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(SocketEvents.NEW_MESSAGE, handleNewMessage);
    };
  }, [roomId, socket]);
}
