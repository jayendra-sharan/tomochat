import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "@/domains/shared/components/Button";

type Props = {
  createRoom: () => void;
};
export function NoChatsCreateOne({ createRoom }: Props) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        No chats yet?
      </Text>
      <Button
        style={{ backgroundColor: theme.colors.onSurface, borderRadius: 2 }}
        type="primary"
        onPress={() => createRoom()}
      >
        Let's get started
      </Button>
    </View>
  );
}
