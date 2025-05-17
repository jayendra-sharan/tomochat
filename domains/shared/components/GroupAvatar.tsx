import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function GroupAvatar({ groupName }: { groupName: string }) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 64,
        backgroundColor: theme.colors.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: theme.colors.onSurface,
          fontSize: 48,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {groupName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}