import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, Icon } from "react-native-paper";
import { format } from "date-fns";
import { Message } from "@/domains/chat/types";
import { useAppTheme } from "@/hooks/useAppTheme";

type MessageBubbleProps = {
  message: Message;
  userId: string;
  renderName: boolean;
  handleMessageTap: (messageId: string) => void;
  expandedBubbleId?: string;
};

export default function MessageBubble({
  message,
  userId,
  handleMessageTap,
  renderName,
  expandedBubbleId,
}: MessageBubbleProps) {
  const theme = useAppTheme();
  const time = format(new Date(message.createdAt), "HH:mm");

  const isSystemMessage = message.sender.id === "SYSTEM";
  const isSelf = userId === message.sender.id;
  const backgroundColor = isSelf ? "#ecdcdc" : "#e0f2fe";
  // : theme.colors.chatBubbleOther;

  const bubblePosition = () => {
    if (isSystemMessage) {
      return "center";
    }
    if (isSelf) {
      return "flex-end";
    }
    return "flex-start";
  };

  const textColor = theme.colors.onSurface;

  const renderMessage = () => {
    if (!renderName || isSystemMessage || isSelf) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 1,
            // maxWidth: isSystemMessage ? undefined : "80%",
          }}
        >
          <Text
            style={[
              styles.content,
              { color: textColor },
              isSystemMessage && styles.systeMessage,
            ]}
          >
            {message.content}
          </Text>
        </View>
      );
    }
    return (
      <View style={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
        <Text style={styles.sender}>{message.sender.displayName}</Text>
        <Text style={[styles.content, { color: textColor }]}>
          {message.content}
        </Text>
      </View>
    );
  };

  const hasSuggestion = message.suggestion;
  return (
    <>
      <View style={[styles.container, { alignSelf: bubblePosition() }]}>
        <TouchableWithoutFeedback onPress={() => handleMessageTap(message.id)}>
          <View
            style={[
              styles.bubble,
              {
                borderColor: backgroundColor,
                borderWidth: 1,
              },
              expandedBubbleId === message.id && styles.selected,
            ]}
          >
            {renderMessage()}
            <View style={styles.messageFooter}>
              <Text style={[styles.time, { color: textColor }]}>{time}</Text>
              {hasSuggestion && (
                <Icon source="lightbulb" size={12} color="#c9c906" />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    maxWidth: "80%",
  },
  bubble: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    paddingTop: 4,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginBottom: 0,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 1,
    justifyContent: "center",
  },
  selected: {
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 2,
    // shadowColor: "#fbed17",
    backgroundColor: "#fff559",
  },
  othersBubble: {
    alignSelf: "flex-start",
  },
  selfBubble: {
    alignSelf: "flex-end",
  },
  content: {
    fontSize: 16,
    lineHeight: 20,
    display: "flex",
    flexDirection: "row",
  },
  systeMessage: {
    fontSize: 12,
    color: "#333",
    // maxWidth: "100%",
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
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
  messageFooter: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    gap: 6,
    paddingLeft: 6,
  },
  time: {
    fontSize: 10,
  },
});
