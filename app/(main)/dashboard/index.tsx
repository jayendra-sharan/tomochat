import {
  View,
  Image,
  FlatList,
} from 'react-native';
import { Text, List, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import GroupAvatar from '@/components/common/GroupAvatar';
import { storage } from '@/services/storage';
import { AUTH_TOKEN } from '@/constants';
import { useGetGroupsQuery } from '@/domains/chat/chatApi';

export default function DashboardScreen() {
  const router = useRouter();
  const { data: groups, isLoading } = useGetGroupsQuery();

  const handleLogout = () => {
    storage.removeItem(AUTH_TOKEN);
    setTimeout(() => {
      router.push("/(auth)/login");
    }, 500);
  }

  const BOTTOM_BAR_HEIGHT = 70;

  const renderItem = ({ item }: any) => {
    const members =  item.members.map((item: any) => item.user.displayName).join(", ");
    return (
      <List.Item
        style={{ paddingInline: 12, borderRadius: 10 }}
        title={item.name}
        description={members}
        onPress={() => router.push(`/(main)/chat/${item.id}`)}
        left={() => (
          <GroupAvatar groupName={item.name} />
        )}
      />
    )
  };

  if (isLoading || !groups?.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require("@/assets/images/logo.png")} />
      </View>
    )
  }

  return (
    <View
      style={{
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
      } as any}>
      <Text
        variant="headlineMedium"
        style={{ marginTop: 16, marginBottom: 8, paddingHorizontal: 16 }}
      >
        Dashboard
      </Text>
  
      <View style={{ flex: 1, overflow: 'auto' } as any}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
  
      <View
        style={{
          height: BOTTOM_BAR_HEIGHT,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
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
