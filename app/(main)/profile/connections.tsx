import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { UserAvatar } from "@/domains/user/components/UserAvatar";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Text, Searchbar, List, Divider } from "react-native-paper";
import { useGetUserConnectionsQuery } from "@/domains/user/userApi";
import { User } from "@/domains/shared/types";
import UserMenu from "@/domains/shared/components/UserMenu";

const ConnectionsScreen = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetUserConnectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || !data) {
    return <LoadingScreen loadingText="Fetching your connections..." />;
  }

  const connections = data.filter(
    (c) =>
      c.displayName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: { item: User }) => (
    <>
      <List.Item
        title={item.displayName}
        description={() => (
          <Text numberOfLines={1} ellipsizeMode="middle">
            {item.email}
          </Text>
        )}
        left={() => <UserAvatar id={item.id} />}
        onPress={() => {}}
      />
      <Divider />
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 24,
      }}
    >
      <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
        Connections
      </Text>
      <Searchbar
        placeholder="Search name or email"
        value={search}
        onChangeText={setSearch}
        style={{ marginBottom: 12 }}
      />
      <FlatList
        data={connections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <UserMenu />
    </View>
  );
};

export default ConnectionsScreen;
