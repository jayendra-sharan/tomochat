import { View, StyleSheet, Platform } from "react-native";
import { Icon, Button } from "react-native-paper";
import { UserAvatar } from "@/domains/user/components/UserAvatar";
import UserPopover from "@/domains/user/components/UserPopover";
import { router } from "expo-router";
import Popover from "./Popover";
// import { useAppTheme } from "@/hooks/useAppTheme";
import { useEffect, useState } from "react";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import CreateRoomPage from "@/domains/rooms/components/CreateRoomPage";

const BOTTOM_BAR_HEIGHT = 60;

type UserMenuProps = {
  showBack?: boolean;
  create?: boolean;
};
export default function UserMenu({ showBack, create }: UserMenuProps) {
  const { userId } = useAuth();
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showCreateFlow, setShowCreateFlow] = useState(false);

  useEffect(() => {
    setShowCreateFlow(!!create);
  }, [create]);

  if (!userId) {
    return null;
  }

  return (
    <>
      <View style={[styles.bottomBar]}>
        {showBack ? (
          <Button onPress={() => router.back()}>
            <Icon size={36} source="chat" />
          </Button>
        ) : (
          <Button onPress={() => setShowCreateFlow(true)}>
            <Icon size={36} source="chat-plus" />
          </Button>
        )}

        <Button onPress={() => router.push("/(main)/dashboard")}>
          <Icon size={36} source="home" />
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
      <Popover visible={showCreateFlow} onClose={() => {}}>
        <CreateRoomPage onDismiss={() => setShowCreateFlow(false)} />
      </Popover>
    </>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    // marginBottom: Platform.OS === "ios" ? 0 : 20,
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
