import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconButton, Switch, useTheme } from 'react-native-paper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setPrivateMode } from '../chatSlice';

type ChatHeaderProps = {
  name?: string;
  privateMode?: boolean;
};

export default function ChatHeader({ name, privateMode = false }: ChatHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.leftContainer}>
        <IconButton
          icon="chevron-left"
          size={28}
          onPress={() => router.push("/(main)/dashboard")}
        />
        <View style={[styles.groupDetails, { borderColor: theme.colors.outline }]}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            {name}
          </Text>
          <Text style={[styles.subtext, { color: theme.colors.onSurfaceVariant }]}>
            status
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.privateMode}>
          <Text style={[{ marginRight: 12, color: theme.colors.onSurface }]}>Private Mode</Text>
          <Switch
            value={privateMode}
            onValueChange={() => {
              dispatch(setPrivateMode(!privateMode));
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingEnd: 20,
    paddingVertical: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupDetails: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 14,
    marginTop: 4,
  },
  rightContainer: {
    justifyContent: 'center',
  },
  privateMode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});