import { getAvatarUrl } from "@/services/avatar";
import { View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

export default function RoomAvatar({
  roomName,
  roomId,
  showInitials,
}: {
  roomName: string;
  roomId: string;
  showInitials?: boolean;
}) {
  const theme = useTheme();
  if (showInitials) {
    return (
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 48,
          backgroundColor: theme.colors.surfaceVariant,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.colors.onSurface,
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {roomName.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  }
  return (
    <Avatar.Image size={48} source={{ uri: getAvatarUrl({ id: roomId }) }} />
  );
}
