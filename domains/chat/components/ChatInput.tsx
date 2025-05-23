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

type ChatInputProps = {
  groupId: string;
  userId: string;
  displayName: string;
  isPrivate: boolean;
};

export default function ChatInput({
  groupId,
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
    socket.emit(SocketEvents.START_TYPING, {
      roomId: groupId,
      userId,
      displayName,
    });
  }, [groupId, userId]);

  const handleTypingStop = useCallback(() => {
    socket.emit(SocketEvents.STOP_TYPING, {
      roomId: groupId,
      userId,
      displayName,
    });
  }, [groupId, userId]);

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
      setIsLoading(true);
      await sendMessage({
        groupId,
        content: message,
        isPrivate: false,
        displayName,
      }).unwrap();
      messageBackup.current = message;
      setMessage("");
    } catch (err) {
      setMessage(messageBackup.current);
      throw new Error("error in sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fafafa",
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
