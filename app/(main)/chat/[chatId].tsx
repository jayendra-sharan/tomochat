import { View, StyleSheet } from 'react-native';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBody from '@/components/chat/ChatBody';
import ChatInput from '@/components/chat/ChatInput';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import socket from '@/services/socket';
import { SocketEvents } from '@/services/constants';
import { useGetGroupChatsQuery } from '@/domains/chat/chatApi';
import { useGetMeQuery } from '@/domains/auth/authApi';

export default function ChatScreen() {
  const { chatId }  = useLocalSearchParams();
  const { data } = useGetGroupChatsQuery({groupId: chatId as string });
  const { data: user } = useGetMeQuery();

  const { id } = user || {};
  const { messages, name } = data || {};

  useEffect(() => {
    socket.emit(SocketEvents.JOIN_ROOM, {
      groupId: chatId,
      userId: id
    });

    return () => {
      socket.emit(SocketEvents.LEAVE_ROOM, {
        userId: id,
        groupId: chatId,
      });
    }
  }, []);

  const privateMode = false;
  return (
    <View style={styles.container}>
      <ChatHeader name={name} privateMode={privateMode} />
      <View style={styles.bodyContainer}>
        { (messages && messages.length) && (
            <ChatBody
              userId={id ?? ""}
              messages={messages}
              privateMode={privateMode}
            />
          )}
        
      </View>
      <ChatInput groupId={chatId as string} />
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
