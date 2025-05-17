import { View, StyleSheet } from 'react-native';
import ChatHeader from '@/domains/chat/components/ChatHeader';
import ChatBody from '@/domains/chat/components/ChatBody';
import ChatInput from '@/domains/chat/components/ChatInput';
import { useGetGroupChatsQuery } from '@/domains/chat/chatApi';
import { useSingleQueryParam } from '@/services/router/useSingleQueryParam';
import { useRequireUser } from '@/domains/auth/hocs/useRequireUser';
import { User } from '@/domains/auth/types';
import { useChatRoom } from '@/services/socket/hooks/useChatRoom';
import useNewMessageEvent from '@/domains/chat/hooks/useNewMessageEvent';
import { useSelector } from 'react-redux';
import { ChatState } from '@/domains/chat/chatSlice';

type ChatScreenProps = {
  user: User
}

function ChatScreen({ user }: ChatScreenProps) {
  const chatId   = useSingleQueryParam("chatId");
  const { data } = useGetGroupChatsQuery({groupId: chatId as string });
  const { id, displayName } = user;

  if (!chatId) {
    throw Error("Something went wrong, chat id not found");
  }

  const { messages, name } = data || {};
  useChatRoom({ userId: id, roomId: chatId });
  useNewMessageEvent(chatId);

  const privateMode = useSelector(({ chat }: { chat: ChatState}) => chat.isPrivate);

  return (
    <View style={styles.container}>
      <ChatHeader name={name} privateMode={privateMode} />
      <View style={styles.bodyContainer}>
        { (messages && messages.length) && (
            <ChatBody
              userId={id ?? ""}
              roomId={chatId}
              messages={messages}
              privateMode={privateMode}
            />
          )}
        
      </View>
      <ChatInput displayName={displayName} userId={id ?? ""} groupId={chatId as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  } as any,
  bodyContainer: {
    flex: 1,
    overflow: 'auto',
  } as any,
});

export default useRequireUser(ChatScreen);
