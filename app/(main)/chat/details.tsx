import { useGetRoomDetailsQuery } from "@/domains/rooms/roomsApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import RoomAvatar from "@/domains/shared/components/RoomAvatar";
import UserMenu from "@/domains/shared/components/UserMenu";
import { Member } from "@/domains/shared/types";
import { UserAvatar } from "@/domains/user/components/UserAvatar";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Text, IconButton, Divider, Menu, List } from "react-native-paper";
import { Button } from "@/domains/shared/components/Button";

const DetailsScreen = () => {
  const theme = useAppTheme();
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const { room: roomId } = useLocalSearchParams<{ room: string }>();

  if (!roomId) {
    // @todo - add error plus go back
    return <Text>Room detail not found</Text>;
  }

  const { data, isLoading } = useGetRoomDetailsQuery(
    { roomId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) {
    return <LoadingScreen loadingText="Fetching group details..." />;
  }

  if (!data || !data.members.length) {
    // @todo - add error plus go back
    return <Text>Room detail not found</Text>;
  }
  const renderMembers = ({ item }: { item: Member }) => (
    <>
      <List.Item
        title={item.user.displayName}
        titleStyle={{
          color: theme.colors.onSurface,
          fontWeight: "bold",
          fontSize: 16,
        }}
        left={() => (
          <View style={{ justifyContent: "center" }}>
            <UserAvatar id={item.user.id} />
          </View>
        )}
        // right={() => (
        //   <Menu
        //     visible={menuVisible === item.user.id}
        //     onDismiss={() => setMenuVisible(null)}
        //     anchor={
        //       <IconButton
        //         icon="dots-vertical"
        //         onPress={() => setMenuVisible(item.user.id)}
        //       />
        //     }
        //   >
        //     <Menu.Item onPress={() => {}} title="Make Admin" />
        //     <Menu.Item onPress={() => {}} title="Remove" />
        //   </Menu>
        // )}
      />
      <Divider />
    </>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingBottom: 0 }}>
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <RoomAvatar roomId={roomId} showInitials={false} />
        <Text variant="headlineSmall" style={{ marginTop: 8 }}>
          {data.name}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ marginTop: 4, textAlign: "center" }}
        >
          {data.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text variant="titleMedium">Participants</Text>
        {/* <Button type="menuLink" onPress={() => {}}>
          Add
        </Button> */}
      </View>
      {data.members.length ? (
        <FlatList
          data={data.members}
          keyExtractor={(item) => item.user.id}
          renderItem={renderMembers}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        />
      ) : null}

      <UserMenu showBack />
    </View>
  );
};

export default DetailsScreen;
