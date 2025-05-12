// components/chat/ChatHeader.tsx
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconButton, Switch } from 'react-native-paper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setPrivateMode } from '@/redux/slices/chat/chatSlice';

type ChatHeaderProps = {
  name?: string;
  privateMode?: boolean;
}

export default function ChatHeader({ name, privateMode = false }: ChatHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <IconButton
            icon="chevron-left"
            size={28}
            onPress={() => router.push("/(main)/dashboard")}
          />
        <View style={styles.groupDetails}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtext}>status</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.privateMode}>
          <Text style={{ marginRight: 12 }}>Private Mode</Text>
          <Switch value={privateMode} onValueChange={() => {dispatch(setPrivateMode(!privateMode))}}/>
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    paddingInlineEnd: 20
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightContainer: {

  },
  groupDetails: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  privateMode: {
    display: "flex",
    flexDirection: "row",
  }
});
