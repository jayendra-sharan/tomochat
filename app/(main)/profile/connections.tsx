import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { UserAvatar } from "@/domains/user/components/UserAvatar";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Text, Searchbar, List, Divider } from "react-native-paper";
import { useGetUserConnectionsQuery } from "@/domains/user/userApi";
import { User } from "@/domains/shared/types";
import UserMenu from "@/domains/shared/components/UserMenu";
import Error from "./error";
import { getConnectionDuration } from "@/utils/formatters";
import { Connection } from "@/domains/user/types";

const ConnectionsScreen = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetUserConnectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (error) {
    return <Error errorText="Uh oh! Could not fetch connections." />;
  }
  if (isLoading || !data) {
    return <LoadingScreen loadingText="Fetching your connections..." />;
  }

  const connections = data.filter((c) =>
    c.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Connection }) => (
    <>
      <List.Item
        title={item.displayName}
        description={() => (
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={{ paddingVertical: 4 }}
          >
            {getConnectionDuration(item.createdAt)}
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
        paddingTop: 24,
        paddingBottom: 0,
        paddingInline: 16,
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
