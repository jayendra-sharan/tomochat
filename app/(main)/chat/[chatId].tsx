import { View, StyleSheet } from 'react-native';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';
import { useGetGroupChatsQuery } from '@/domains/chat/chatApi';
import { useSingleQueryParam } from '@/services/router/useSingleQueryParam';
import { useRequireUser } from '@/domains/auth/hocs/useRequireUser';
import { User } from '@/domains/auth/types';
import { useChatRoom } from '@/services/socket/hooks/useChatRoom';

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

  const privateMode = false;
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
