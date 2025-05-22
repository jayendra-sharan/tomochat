import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/domains/chat/types";
import { TypingIndicatorBubble } from "@/domains/chat/components/TypingIndicatorBubble";
import useTypingUsers from "@/domains/chat/hooks/useTypingUsers";

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
  const [expandedBubbleId, setExpandedBubbleId] = useState<string>("");

  const { showTypingIndicator, senderNames } = useTypingUsers({
    roomId,
    currentUserId: userId,
  });

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages.length, showTypingIndicator]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        privateMode && styles.privateMode,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {messages.map((message: Message) => (
        <MessageBubble
          key={message.id}
          message={message}
          userId={userId}
          expandedBubbleId={expandedBubbleId}
          setExpandedBubbleId={setExpandedBubbleId}
        />
      ))}
      {!!showTypingIndicator && (
        <TypingIndicatorBubble key="typing" senderName={senderNames} />
      )}
    </ScrollView>
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
