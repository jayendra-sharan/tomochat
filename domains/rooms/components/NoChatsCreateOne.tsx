import { router } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export function NoChatsCreateOne() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 16, textAlign: "center" }}>
        No chats yet?
      </Text>
      <Button mode="contained" onPress={() => {router.push("/(main)/create-chat")}}>
        Let's get started
      </Button>
    </View>
  );
}