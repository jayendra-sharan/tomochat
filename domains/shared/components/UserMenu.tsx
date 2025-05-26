import { View, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-paper";
import { UserAvatar } from "@/domains/user/components/UserAvatar";
import UserPopover from "@/domains/user/components/UserPopover";
import { router } from "expo-router";
import Popover from "./Popover";
// import { useAppTheme } from "@/hooks/useAppTheme";
import { useState } from "react";
import { useAuth } from "@/domains/auth/hooks/useAuth";

const BOTTOM_BAR_HEIGHT = 60;

export default function UserMenu() {
  // const theme = useAppTheme();
  const { userId } = useAuth();
  const [showUserPopover, setShowUserPopover] = useState(false);

  if (!userId) {
    return null;
  }

  return (
    <>
      <View style={[styles.bottomBar]}>
        <Button onPress={() => router.push("/(main)/create-chat")}>
          <Icon size={40} source="plus" />
        </Button>

        <Button onPress={() => router.push("/(main)/dashboard")}>
          <Icon size={40} source="home" />
        </Button>

        <Button onPress={() => setShowUserPopover(true)}>
          <UserAvatar id={userId} />
        </Button>
      </View>
      <Popover
        visible={showUserPopover}
        onClose={() => setShowUserPopover(false)}
      >
        <UserPopover />
      </Popover>
    </>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
