import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ChatState, Message } from '@/redux/slices/chat/types';
import MessageBubble from './MessageBubble';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types';


type ChatBodyProps = {
  messages: Message[];
  userId: string;
  privateMode?: boolean;
}

export default function ChatBody({ messages, userId, privateMode = false }: ChatBodyProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [expandedBubbleId, setExpandedBubbleId] = useState<string>("");

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [messages.length]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        privateMode && styles.privateMode
      ]}
    >
      {messages.map((message: Message) => (
        <MessageBubble
          key={message.id}
          message={message}
          userId={userId}
          expandedBubbleId={expandedBubbleId}
          setExpandedBubbleId={setExpandedBubbleId}
        />))}
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end', // force bottom alignment
  },
  privateMode: {
    backgroundColor: "#010101"
  },
  messageBubble: {
    backgroundColor: '#e1f5fe',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});
