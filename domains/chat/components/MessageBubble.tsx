import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { IconButton, Text, Icon } from "react-native-paper";
import { format } from "date-fns";
import { Message } from "@/domains/chat/types";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useStore } from "react-redux";
import { useState } from "react";

type MessageBubbleProps = {
  message: Message;
  userId: string;
  renderName: boolean;
  handleMessageTap: (messageId: string) => void;
};

export default function MessageBubble({
  message,
  userId,
  handleMessageTap,
  renderName,
}: MessageBubbleProps) {
  const theme = useAppTheme();
  const time = format(new Date(message.createdAt), "HH:mm");

  const isSelf = userId === message.sender.id;
  const backgroundColor = isSelf
    ? theme.colors.chatBubbleSelf
    : theme.colors.chatBubbleOther;

  const textColor = isSelf
    ? theme.colors.surface || "#0D0D0D"
    : theme.colors.onSurface || "#212121";

  const content = renderName
    ? `${message.sender.displayName}: ${message.content}`
    : message.content;

  const renderMessage = () => {
    if (renderName) {
      return (
        <Text style={[styles.content, { color: textColor, fontSize: 14 }]}>
          <Text
            style={{ fontWeight: "bold", color: textColor, marginRight: 2 }}
          >
            {`${message.sender.displayName}: `}
          </Text>
          {message.content}
        </Text>
      );
    }
    return (
      <Text style={[styles.content, { color: textColor, fontSize: 14 }]}>
        {message.content}
      </Text>
    );
  };
  const hasSuggestion = message.suggestion;
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handleMessageTap(message.id)}>
          <View style={[isSelf ? [styles.selfBubble] : [styles.othersBubble]]}>
            <View
              style={[
                isSelf ? [styles.bubble] : [styles.bubble],
                {
                  backgroundColor,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              {renderMessage()}
              {hasSuggestion && (
                <Icon source="lightbulb" size={10} color="yellow" />
              )}
            </View>
            <Text
              style={{
                fontSize: 11,
                alignSelf: "flex-end",
                marginTop: 4,
                marginRight: 8,
              }}
            >
              {time}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  bubble: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    // maxWidth: "80%",
    minWidth: 50,
    minHeight: 36,
    borderRadius: 8,
    marginBottom: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    display: "flex",
    justifyContent: "center",
  },
  othersBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  selfBubble: {
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
  },
  content: {
    lineHeight: 16,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
  },
  sender: {
    fontWeight: "bold",
    marginRight: 4,
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
});
