// components/chat/MessageBubble.tsx
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { AuthState, Message } from '@/types';
import { useSelector } from 'react-redux';

type MessageBubbleProps = {
  message: Message;
  userId: string;
  expandedBubbleId: string;
  setExpandedBubbleId: (id: string) => void;
};

export default function MessageBubble({ message, userId, expandedBubbleId, setExpandedBubbleId }: MessageBubbleProps) {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const time = format(new Date(message.createdAt), 'HH:mm');

  return (
    <View style={styles.container}>
      <View style={userId === message.sender.id ? styles.selfBubble : styles.bubble}>
        <Text style={styles.content}>
          <Text style={styles.sender}>{`${message.sender.displayName}: `}</Text>
            {message.content}
          </Text>
        <View style={styles.footer}>
          <Text style={styles.time}>{time}</Text>
          <IconButton
            icon={showSuggestion ? 'chevron-up' : 'chevron-down'}
            size={16}
            style={{ height: 10 }}
            iconColor='#ffffff'
            onPress={() => setExpandedBubbleId(expandedBubbleId === message.id ? "" : message.id)}
          />
        </View>
      </View>

      {message.id === expandedBubbleId && (
        <View style={styles.suggestionBubble}>
          <Text style={styles.suggestionText}>Improved: {message.suggestion.improved}</Text>
          <Text style={styles.suggestionText}>English: {message.suggestion.english}</Text>
          <Text style={styles.suggestionText}>
            Issues: {message.suggestion.issues.join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  selfContainer: {
    alignSelf: "flex-end",
  },
  bubble: {
    backgroundColor: '#797a7e',
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    maxWidth: '70%',
    alignSelf: "flex-start",
  },
  selfBubble: {
    backgroundColor: '#3e62ef',
    padding: 16,
    borderRadius: 16,
    borderTopRightRadius: 0,
    maxWidth: '70%',
    alignSelf: "flex-end",
  },
  content: {
    fontSize: 16,
    color: "#ffffff"
  },
  sender: {
    fontWeight: "bold",
    color: "#ffffff"
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#ffffff",
  },
  suggestionBubble: {
    backgroundColor: '#beaabe',
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 4,
  },
  suggestionText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
