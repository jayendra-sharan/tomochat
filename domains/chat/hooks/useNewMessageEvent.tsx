import { SocketEvents } from "@/domains/socket/events";
import { useEffect } from "react";
import { Message } from "../types";
import { chatApi } from "../chatApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { showToast } from "@/domains/notification/lib/showToast";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";

export default function useNewMessageEvent(roomId: string) {
  const dispatch = useAppDispatch();
  const socket = useSocketContext();

  useEffect(() => {
    if (!roomId || !socket) return;

    const handleNewMessage = (message: Message) => {
      // if current group === message group
      // update chat history
      //
      // go to dashboard
      // refresh dashboard
      // - last message is updated
      // - order is updated
      // - show unread and unread count
      dispatch(
        chatApi.util.updateQueryData(
          "getGroupChats",
          { groupId: roomId },
          (draft) => {
            draft.messages.push(message);
          },
        ),
      );
      showToast("info", "new message", message.content);
    };
    socket.on(SocketEvents.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(SocketEvents.NEW_MESSAGE, handleNewMessage);
    };
  }, [roomId, socket]);
}
