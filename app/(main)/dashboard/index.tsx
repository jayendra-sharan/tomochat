import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Platform, Alert } from "react-native";
import { Text, List, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import GroupAvatar from "@/domains/shared/components/GroupAvatar";
import { storage } from "@/services/storage";
import { AUTH_TOKEN } from "@/constants";
import { useGetGroupsQuery } from "@/domains/chat/chatApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { Group } from "@/domains/chat/types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resetStore } from "@/redux/store";
import { useRequireUser } from "@/domains/auth/hocs/useRequireUser";
import Rooms from "@/domains/rooms/components/Rooms";
import { Room } from "@/domains/shared/types";
import { registerForPushNotificationsAsync } from "@/services/notifications";
import { useRegisterPushTokenMutation } from "@/domains/notification/notificationApi";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import ChatFilters from "@/domains/chat/components/ChatFilters";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { SocketEvents } from "@/domains/socket/events";

function DashboardPage() {
  const theme = useAppTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const socket = useSocketContext();

  const { userId, displayName } = useAuth();

  const handleLogout = () => {
    storage.removeItem(AUTH_TOKEN);
    dispatch(resetStore());
    setTimeout(() => {
      router.push("/(auth)/login");
    }, 500);
  };

  // @todo extract later
  const [registerPushToken, { isLoading }] = useRegisterPushTokenMutation();

  useEffect(() => {
    console.log("Asking for permission");
    registerForPushNotificationsAsync().then((token) => {
      console.log("Asking for permission, Next", token);
      if (token) {
        const platform = Platform.OS as string;
        const res = registerPushToken({ token, platform });
      }
    });
  }, []);

  // @todo add invite link to room chat page to avoid url param.
  const enterChat = useCallback((room: Room) => {
    router.push(`/(main)/chat/${room.id}?invite_id=${room.inviteLink}`);

    setTimeout(() => {
      socket?.emit(SocketEvents.READ_MESSAGE, { roomId: room.id, userId })
    }, 1000);
  }, []);

  return (
    <View style={styles.page}>
      <ChatFilters />
      <View style={styles.scrollable}>
        <Rooms enterChat={enterChat} />
      </View>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
          },
        ]}
      >
        <IconButton
          icon="account"
          size={24}
          onPress={() => {
            Alert.alert("User", displayName);
            console.log("user", displayName);
          }}
        />
        <IconButton
          icon="plus"
          size={24}
          onPress={() => router.push("/(main)/create-chat")}
        />
        <IconButton icon="logout" size={24} onPress={handleLogout} />
      </View>
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
    borderWidth: 1,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useRequireUser(DashboardPage);
