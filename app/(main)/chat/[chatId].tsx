import { View, StyleSheet } from "react-native";
import ChatHeader from "@/domains/chat/components/ChatHeader";
import ChatBody from "@/domains/chat/components/ChatBody";
import ChatInput from "@/domains/chat/components/ChatInput";
import { useGetRoomChatsQuery } from "@/domains/chat/chatApi";
import { useSingleQueryParam } from "@/services/router/useSingleQueryParam";
import { useRequireUser } from "@/domains/auth/hocs/useRequireUser";
import { User } from "@/domains/auth/types";
import { useChatRoom } from "@/domains/socket/hooks/useChatRoom";
import useNewMessageEvent from "@/domains/chat/hooks/useNewMessageEvent";
import { useSelector } from "react-redux";
import { ChatState } from "@/domains/chat/chatSlice";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useCurrentRoom } from "@/domains/rooms/hooks/useCurrentRoom";

type ChatScreenProps = {
  user: User;
};

function ChatScreen({ user }: ChatScreenProps) {
  const chatId = useSingleQueryParam("chatId");
  // @todo invite_id move to constants
  const { invite_id } = useLocalSearchParams<{ invite_id: string }>();
  const { data } = useGetRoomChatsQuery({ roomId: chatId as string });
  const { id, displayName } = user;

  if (!chatId) {
    throw Error("Something went wrong, chat id not found");
  }

  const { messages, name } = data || {};
  useChatRoom({ userId: id, roomId: chatId });
  useCurrentRoom(chatId);
  useNewMessageEvent(chatId);

  const privateMode = useSelector(
    ({ chat }: { chat: ChatState }) => chat.isPrivate
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={44} // Adjust depending on header height
    >
      <View style={styles.container}>
        <ChatHeader
          name={name}
          roomId={chatId}
          privateMode={privateMode}
          inviteId={`${chatId}--${invite_id}`}
        />
        <View style={styles.bodyContainer}>
          {messages && messages.length ? (
            <ChatBody
              userId={id ?? ""}
              roomId={chatId}
              messages={messages}
              privateMode={privateMode}
            />
          ) : null}
        </View>
        <ChatInput
          displayName={displayName}
          userId={id ?? ""}
          roomId={chatId as string}
          isPrivate={privateMode}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    overflow: "auto",
  } as any,
});

export default useRequireUser(ChatScreen);
