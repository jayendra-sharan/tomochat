import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button, Icon } from "react-native-paper";
import { useRouter } from "expo-router";
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
import UserMenu from "@/domains/shared/components/UserMenu";

function DashboardPage() {
  const router = useRouter();
  const socket = useSocketContext();

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
      <UserMenu />
    </View>
  );
}

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
});

export default useRequireUser(DashboardPage);
