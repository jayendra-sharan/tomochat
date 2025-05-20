import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
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

function DashboardPage() {
  const theme = useAppTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    storage.removeItem(AUTH_TOKEN);
    dispatch(resetStore());
    setTimeout(() => {
      router.push("/(auth)/login");
    }, 500);
  };

  // @todo extract later
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // save to backend
      }
    });
  }, []);

  // @todo add invite link to room chat page to avoid url param.
  const enterChat = useCallback((room: Room) => {
    router.push(`/(main)/chat/${room.id}?invite_id=${room.inviteLink}`);
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.scrollable}>
        <Rooms enterChat={enterChat} />
      </View>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
          },
        ]}
      >
        <IconButton icon="account" size={24} onPress={() => {}} />
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

const BOTTOM_BAR_HEIGHT = 70;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  scrollable: {
    flex: 1,
    ...(Platform.OS === "web" && { overflowY: "auto" }), // RNW-specific fix
  } as any,
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    borderTopWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useRequireUser(DashboardPage);
