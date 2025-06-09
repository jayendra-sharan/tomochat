import React, { useCallback, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useRequireUser } from "@/domains/auth/hocs/useRequireUser";
import Rooms from "@/domains/rooms/components/Rooms";
import { Room } from "@/domains/shared/types";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { useSocketContext } from "@/domains/socket/hooks/useSocketContext";
import { SocketEvents } from "@/domains/socket/events";
import { useFeatureFlag } from "@/redux/FeatureProvider";
import UserMenu from "@/domains/shared/components/UserMenu";
import { useRouter } from "expo-router/build/hooks";
import { Text } from "react-native-paper";

function DashboardPage() {
  const router = useRouter();
  const socket = useSocketContext();
  const [create, setCreate] = useState(false);

  const { userId } = useAuth();

  // @todo add invite link to room chat page to avoid url param.
  const enterChat = useCallback((room: Room) => {
    router.push(`/(main)/chat/${room.id}?invite_id=${room.inviteLink}`);

    setTimeout(() => {
      socket?.emit(SocketEvents.READ_MESSAGE, { roomId: room.id, userId });
    }, 500);
  }, []);

  const createRoom = () => {
    setCreate(true);
  };

  return (
    <View style={styles.page}>
      <Text
        variant="headlineSmall"
        style={{ fontWeight: "bold", paddingLeft: 16 }}
      >
        Chats
      </Text>
      <View style={styles.scrollable}>
        <Rooms enterChat={enterChat} createRoom={createRoom} />
      </View>
      <UserMenu create={create} />
    </View>
  );
}

// @otod fix page style, make it consistent for all pages
const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  scrollable: {
    flex: 1,
    ...(Platform.OS === "web" && { overflowY: "auto" }), // RNW-specific fix
  } as any,
});

export default useRequireUser(DashboardPage);
