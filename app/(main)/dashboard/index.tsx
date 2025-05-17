import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Text, List, IconButton, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import GroupAvatar from '@/domains/shared/components/GroupAvatar';
import { storage } from '@/services/storage';
import { AUTH_TOKEN } from '@/constants';
import { useGetGroupsQuery } from '@/domains/chat/chatApi';

export default function DashboardScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { data: groups, isLoading } = useGetGroupsQuery();

  const handleLogout = () => {
    storage.removeItem(AUTH_TOKEN);
    setTimeout(() => {
      router.push("/(auth)/login");
    }, 500);
  };

  const renderItem = ({ item }: any) => {
    const members = item.members.map((m: any) => m.user.displayName).join(", ");
    return (
      <List.Item
        style={styles.listItem}
        title={item.name}
        description={members}
        onPress={() => router.push(`/(main)/chat/${item.id}`)}
        left={() => <GroupAvatar groupName={item.name} />}
      />
    );
  };

  if (isLoading || !groups?.length) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require("@/assets/images/logo.png")} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text
        variant="headlineMedium"
        style={[styles.header, { color: theme.colors.onSurface }]}
      >
        Dashboard
      </Text>

      <View style={styles.listWrapper}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={[styles.bottomBar, { borderTopColor: theme.colors.outline, backgroundColor: theme.colors.surface }]}>
        <IconButton
          icon="account"
          size={24}
          containerColor="transparent"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="plus"
          size={24}
          containerColor="transparent"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="logout"
          size={24}
          containerColor="transparent"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const BOTTOM_BAR_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  listWrapper: {
    flex: 1,
    overflow: 'auto', // RNW specific
  } as any,
  listItem: {
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
