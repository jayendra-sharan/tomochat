import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useGetRoomsQuery } from "../roomsApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { FlatList } from "react-native";
import { Room } from "@/domains/shared/types";
import { List } from "react-native-paper";
import RoomAvatar from "@/domains/shared/components/RoomAvatar";
import { UnreadIndicator } from "@/domains/shared/components/UnreadIndicator";
import { NoChatsCreateOne } from "./NoChatsCreateOne";
import { getTimeLabel } from "@/utils/formatters";

type RoomsProps = {
  enterChat: (room: Room) => void;
  createRoom: () => void;
};
export default function Rooms({ enterChat, createRoom }: RoomsProps) {
  const { data: rooms, isLoading } = useGetRoomsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!rooms?.length) {
    return <NoChatsCreateOne createRoom={createRoom} />;
  }

  const renderItem = ({ item }: { item: Room }) => {
    return (
      <List.Item
        style={[styles.listItem, { borderColor: "#ecdcdc", borderWidth: 1 }]}
        title={item.name}
        titleStyle={{ fontWeight: "bold" }}
        description={item.lastMessage || "no messages"}
        descriptionNumberOfLines={1}
        descriptionStyle={{ maxWidth: 150, marginTop: 5 }}
        onPress={() => enterChat(item)}
        left={() => <RoomAvatar roomId={item.id} roomName={item.name} />}
        right={() => (
          <View style={styles.metaData}>
            {item.isUnread && <UnreadIndicator />}
            <Text variant="labelSmall">{getTimeLabel(item.lastMessageAt)}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <>
      <FlatList
        data={rooms}
        keyExtractor={(room) => room.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  listItem: {
    paddingVertical: 2,
    textAlign: "left",
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 2,
    marginBottom: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  metaData: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  },
});
