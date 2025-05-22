import { useEffect, useState } from "react";
import { SocketEvents } from "@/domains/socket/events";
import { TypingUserPayload } from "@/domains/shared/types/socketEvents";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";

export default function useTypingUsers({
  roomId,
  currentUserId,
}: {
  roomId?: string;
  currentUserId: string;
}) {
  const [typingUserIds, setTypingUserIds] = useState<TypingUserPayload[]>([]);
  const socket = useSocketContext();

  useEffect(() => {
    if (!roomId) return;
    const handleTypingStarted = ({
      userId,
      roomId: incomingRoomId,
      displayName,
    }: TypingUserPayload) => {
      if (userId === currentUserId || incomingRoomId !== roomId) return;
      setTypingUserIds((prev) => {
        const isDuplicate = prev.some((user) => user.userId == userId);
        if (isDuplicate) return prev;
        return [
          ...prev,
          {
            userId,
            roomId,
            displayName,
          },
        ];
      });
    };

    const handleTypingStopped = ({
      userId,
      roomId: incomingRoomId,
      displayName,
    }: TypingUserPayload) => {
      if (incomingRoomId !== roomId) return;

      setTypingUserIds((prev) => prev.filter((user) => user.userId !== userId));
    };
    socket.on(SocketEvents.TYPING_STARTED, handleTypingStarted);
    socket.on(SocketEvents.TYPING_STOPPED, handleTypingStopped);

    return () => {
      socket.off(SocketEvents.TYPING_STARTED, handleTypingStarted);
      socket.off(SocketEvents.TYPING_STOPPED, handleTypingStopped);
    };
  }, [roomId]);

  const showTypingIndicator = !!typingUserIds.length;
  const senderNames = typingUserIds.map((user) => user.displayName).join(", ");

  return {
    showTypingIndicator,
    senderNames,
  };
}
