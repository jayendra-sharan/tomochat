import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function RoomAvatar({ roomName }: { roomName: string }) {
  const theme = useTheme();

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
