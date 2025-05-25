import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button, Icon } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRequireUser } from "@/domains/auth/hocs/useRequireUser";
import Rooms from "@/domains/rooms/components/Rooms";
import { Room } from "@/domains/shared/types";
import { registerForPushNotificationsAsync } from "@/services/notifications";
import { useRegisterPushTokenMutation } from "@/domains/notification/notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import ChatFilters from "@/domains/chat/components/ChatFilters";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { SocketEvents } from "@/domains/socket/events";
import { useFeatureFlag } from "@/redux/FeatureProvider";
import UserPopover from "@/domains/user/components/UserPopover";
import Popover from "@/domains/shared/components/Popover";
import { UserAvatar } from "@/domains/user/components/UserAvatar";

function DashboardPage() {
  const router = useRouter();
  const socket = useSocketContext();
  const [showUserPopover, setShowUserPopover] = useState(false);

  const { showChatFilters } = useFeatureFlag();

  const { userId } = useAuth();

  // @todo extract later
  const [registerPushToken] = useRegisterPushTokenMutation();

  useEffect(() => {
    console.log("Asking for permission");
    registerForPushNotificationsAsync().then((token) => {
      console.log("Asking for permission, Next", token);
      if (token) {
        const platform = Platform.OS as string;
        registerPushToken({ token, platform });
      }
    });
  }, []);

  // @todo add invite link to room chat page to avoid url param.
  const enterChat = useCallback((room: Room) => {
    router.push(`/(main)/chat/${room.id}?invite_id=${room.inviteLink}`);

    setTimeout(() => {
      socket?.emit(SocketEvents.READ_MESSAGE, { roomId: room.id, userId });
    }, 1000);
  }, []);

  return (
    <View style={styles.page}>
      {showChatFilters && <ChatFilters />}
      <View style={styles.scrollable}>
        <Rooms enterChat={enterChat} />
      </View>

      <View
        style={[
          styles.bottomBar,
          {
            // backgroundColor: theme.colors.surface,
            // borderColor: theme.colors.outline,
          },
        ]}
      >
        <Button onPress={() => router.push("/(main)/create-chat")}>
          <Icon size={40} source="plus" />
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
    </View>
  );
}

const BOTTOM_BAR_HEIGHT = 60;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  scrollable: {
    flex: 1,
    ...(Platform.OS === "web" && { overflowY: "auto" }), // RNW-specific fix
  } as any,
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    // borderWidth: 1,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderRadius: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useRequireUser(DashboardPage);
