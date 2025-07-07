import { View, StyleSheet } from "react-native";
import { useCallback, useRef, useState } from "react";
import {
  TextInput,
  IconButton,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { chatApi, useSendMessageMutation } from "@/domains/chat/chatApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypingIndicator } from "@/domains/chat/hooks/useTypingIndicator";
import { SocketEvents } from "@/domains/socket/events";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { Platform } from "react-native";
import { logger } from "@/services/logger";
import { showToast } from "@/domains/notification/lib/showToast";
import { getTempMessage } from "../lib/getTempMessage";

type ChatInputProps = {
  roomId: string;
  userId: string;
  displayName: string;
  isPrivate: boolean;
};

export default function ChatInput({
  roomId,
  userId,
  displayName,
  isPrivate,
}: ChatInputProps) {
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socket = useSocketContext();

  const dispatch = useAppDispatch();
  const [sendMessage] = useSendMessageMutation();

  const messageBackup = useRef<string>("");

  const handleTypingStart = useCallback(() => {
    socket?.emit(SocketEvents.START_TYPING, {
      roomId,
      userId,
      displayName,
    });
  }, [roomId, userId]);

  const handleTypingStop = useCallback(() => {
    socket?.emit(SocketEvents.STOP_TYPING, {
      roomId,
      userId,
      displayName,
    });
  }, [roomId, userId]);

  const triggerTyping = useTypingIndicator({
    onTypingStart: handleTypingStart,
    onTypingStop: handleTypingStop,
  });

  const handleChangeText = (text: string) => {
    setMessage(text);
    triggerTyping(text);
  };

  const handleSend = async () => {
    try {
      if (!message.trim()) return;
      messageBackup.current = message.trim();
      setIsLoading(true);
      setMessage("");
      const tempMessage = getTempMessage(message.trim(), userId, displayName);
      const clientId = tempMessage.id;
      dispatch(
        chatApi.util.updateQueryData("getRoomChats", { roomId }, (draft) => {
          draft.messages.push(tempMessage);
        })
      );
      const response = await sendMessage({
        roomId,
        content: message,
        isPrivate: false,
        displayName,
      }).unwrap();
      if (response) {
        dispatch(
          chatApi.util.updateQueryData("getRoomChats", { roomId }, (draft) => {
            const index = draft.messages.findIndex((m) => m.id === clientId);
            draft.messages = draft.messages.map((msg) =>
              msg.id === clientId ? { ...response } : msg
            );
          })
        );
      }
      messageBackup.current = message;
      setMessage("");
    } catch (err) {
      // @todo handle all logging like this
      setMessage(messageBackup.current);
      showToast("error", "Failed to send message", "Please try again.");
      logger.error(err, {
        message: "FE: error in sending message",
        roomId,
        userId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.outline,
        },
      ]}
    >
      <TextInput
        mode="outlined"
        value={message}
        onChangeText={handleChangeText}
        placeholder="Type a message"
        style={{
          flex: 1,
          borderCurve: "circular",
          margin: Platform.OS === "web" ? 10 : 0,
          height: Platform.OS === "web" ? 36 : "auto",
        }}
        multiline
        numberOfLines={1}
        returnKeyType="default"
        contentStyle={{
          padding: 5,
          paddingLeft: 10,
          verticalAlign: "middle",
        }}
      />
      <View style={{ width: 40, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator animating size={24} />
        ) : (
          <IconButton
            icon="send"
            size={24}
            onPress={handleSend}
            style={styles.button}
            disabled={!message.trim()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingLeft: 10,
    paddingBlock: Platform.OS === "web" ? 0 : 10,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    alignSelf: "center",
  },
});
