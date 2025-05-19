import socket from "@/services/socket/socket";
import { SocketEvents } from "@/services/socket/socketEvents";
import { useEffect } from "react";
import { Message } from "../types";
import { chatApi } from "../chatApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function useNewMessageEvent(roomId: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!roomId) return;

    const handleNewMessage = (message: Message) => {
      dispatch(
        chatApi.util.updateQueryData(
          "getGroupChats",
          { groupId: roomId },
          (draft) => {
            draft.messages.push(message);
          },
        ),
      );
    };
    socket.on(SocketEvents.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(SocketEvents.NEW_MESSAGE, handleNewMessage);
    };
  }, [roomId]);
}
