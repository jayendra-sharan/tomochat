import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { Message } from '@/domains/chat/types';
import { useAppTheme } from '@/hooks/useAppTheme';

type MessageBubbleProps = {
  message: Message;
  userId: string;
  expandedBubbleId: string;
  setExpandedBubbleId: (id: string) => void;
};

export default function MessageBubble({ message, userId, expandedBubbleId, setExpandedBubbleId }: MessageBubbleProps) {
  const theme = useAppTheme();
  const time = format(new Date(message.createdAt), 'HH:mm');
  const isSelf = userId === message.sender.id;

  const backgroundColor = isSelf
    ? theme.colors.chatBubbleSelf
    : theme.colors.chatBubbleOther;

  const textColor = isSelf
    ? theme.colors.onPrimary || '#0D0D0D'
    : theme.colors.onSurface || '#212121';

  return (
    <View style={styles.container}>
      <View
        style={[
          isSelf ? styles.selfBubble : styles.bubble,
          { backgroundColor },
        ]}
      >
        <Text style={[styles.content, { color: textColor }]}>
          <Text style={[styles.sender, { color: textColor }]}>
            {`${message.sender.displayName}: `}
          </Text>
          {message.content}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.time, { color: textColor }]}>{time}</Text>
          <IconButton
            icon={!!expandedBubbleId ? 'chevron-up' : 'chevron-down'}
            size={16}
            style={{ height: 10 }}
            iconColor={textColor}
            onPress={() => setExpandedBubbleId(expandedBubbleId === message.id ? "" : message.id)}
          />
        </View>
      </View>

      {(message.suggestion && message.id === expandedBubbleId) && (
        <View style={[styles.suggestionBubble, { backgroundColor: theme.colors.accent }]}>
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
  bubble: {
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  selfBubble: {
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    maxWidth: '70%',
    alignSelf: 'flex-end',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  content: {
    fontSize: 16,
  },
  sender: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
  },
  suggestionBubble: {
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