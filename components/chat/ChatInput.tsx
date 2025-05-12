import { View, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import { TextInput, IconButton, ActivityIndicator } from 'react-native-paper';
import { chatApi, useSendMessageMutation } from '@/domains/chat/chatApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';

type ChatInputProps = {
  groupId: string;
}

export default function ChatInput({ groupId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  
  const [sendMessage] = useSendMessageMutation();

  const messageBackup = useRef<string>("");

  const handleChangeText = (text: string) => {
    setMessage(text);
  }

  const handleSend = async () => {
    try {
      if (!message.trim()) return;
      setIsLoading(true);
      const res = await sendMessage({ groupId, content: message }).unwrap();
      console.log("Send message response", res);
      dispatch(
        chatApi.util.updateQueryData('getGroupChats', { groupId }, (draft) => {
          draft.messages.push(res);
        })
      )
      messageBackup.current = message;
      setMessage("");
    } catch (err) {
      setMessage(messageBackup.current);
      throw new Error("error in sending message"); // handle this
    } finally {
      setIsLoading(false);
    }
  };

return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={message}
        onChangeText={handleChangeText}
        placeholder="Type a message"
        style={styles.input}
        multiline
        numberOfLines={1}
        returnKeyType="default"
      />
      <View style={{ width: 40, justifyContent: 'center' }}>
        {
          isLoading
          ? <ActivityIndicator animating size={24} />
          : <IconButton
              icon="send"
              size={24}
              onPress={handleSend}
              style={styles.button}
              disabled={!message.trim()}
            />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    alignSelf: 'center',
  },
});