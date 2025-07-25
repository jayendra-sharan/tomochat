import { ScrollView, StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message, Suggestion } from "@/domains/chat/types";
import { TypingIndicatorBubble } from "@/domains/chat/components/TypingIndicatorBubble";
import useTypingUsers from "@/domains/chat/hooks/useTypingUsers";
import ChatInfoBottomSheet from "./ChatInfoBottomSheet";
import { ImprovementSuggestion } from "./ImprovementSuggestion";
import { KeyboardAwareScrollView } from "@/domains/shared/components/KeyboardAwareScrollView";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { SocketEvents } from "@/domains/socket/events";

type ChatBodyProps = {
  messages: Message[];
  userId: string;
  roomId: string;
  privateMode?: boolean;
};

export default function ChatBody({
  messages,
  userId,
  privateMode = false,
  roomId,
}: ChatBodyProps) {
  const scrollRef = useRef<ScrollView>(null);
  const socket = useSocketContext();
  const [hasScrolled, setHasScrolled] = useState(false);
  const nextMessageSenderId = useRef<string>("");
  const currentMessageSenderId = useRef<string>("");
  const [expandedBubbleId, setExpandedBubbleId] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Suggestion | undefined | null>();
  const [content, setContent] = useState<string | undefined>();

  const handleMessageTap = useCallback(
    (messageId: string) => {
      console.log("Message tapped:", messageId);
      const message = messages.find((message) => message.id === messageId);
      setContent(message?.content);
      if (message?.suggestion) {
        setSuggestion(message?.suggestion);
        setExpandedBubbleId(messageId);
      }
    },
    [messages, setContent, setSuggestion, setExpandedBubbleId]
  );
  const { showTypingIndicator, senderNames } = useTypingUsers({
    roomId,
    currentUserId: userId,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: hasScrolled });
    }

    setTimeout(() => {
      socket?.emit(SocketEvents.READ_MESSAGE, { roomId, userId });
    }, 500);

    if (!hasScrolled) setHasScrolled(true);
  }, [messages.length, showTypingIndicator]);

  return (
    <>
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.contentContainer,
          privateMode && styles.privateMode,
        ]}
      >
        {messages.map((message: Message, index: number) => {
          currentMessageSenderId.current = message.sender.id;
          nextMessageSenderId.current = messages[index - 1]?.sender.id;
          return (
            <MessageBubble
              key={message.id}
              message={message}
              userId={userId}
              handleMessageTap={handleMessageTap}
              expandedBubbleId={expandedBubbleId}
              renderName={
                currentMessageSenderId.current !== nextMessageSenderId.current
              }
            />
          );
        })}
        {!!showTypingIndicator && (
          <TypingIndicatorBubble key="typing" senderName={senderNames} />
        )}
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      <ChatInfoBottomSheet
        visible={!!expandedBubbleId}
        onClose={() => setExpandedBubbleId("")}
      >
        <ImprovementSuggestion content={content} suggestion={suggestion} />
      </ChatInfoBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", // force bottom alignment
    paddingTop: 16,
  },
  privateMode: {
    backgroundColor: "#f4f0e8",
  },
  messageBubble: {
    backgroundColor: "#e1f5fe",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
});
