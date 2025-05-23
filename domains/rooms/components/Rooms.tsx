import { StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useGetRoomsQuery } from "../roomsApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { FlatList } from "react-native";
import { Room } from "@/domains/shared/types";
import { List } from "react-native-paper";
import GroupAvatar from "@/domains/shared/components/GroupAvatar";

type RoomsProps = {
  enterChat: (room: Room) => void;
};
export default function Rooms({ enterChat }: RoomsProps) {
  const theme = useAppTheme();
  const { data: rooms, isLoading } = useGetRoomsQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderItem = ({ item }: { item: Room }) => {
    return (
      <List.Item
        style={[styles.listItem, { borderBottomColor: theme.colors.outline }]}
        title={item.name}
        description={item.lastMessage}
        descriptionNumberOfLines={1}
        descriptionStyle={{ maxWidth: 150, marginTop: 5 }}
        onPress={() => enterChat(item)}
        left={() => <GroupAvatar groupName={item.name} />}
      />
    );
  };

  return (
    <FlatList
      data={rooms}
      keyExtractor={(room) => room.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  listItem: {
    textAlign: "left",
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1, // Android
  },
});
