import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconButton, Menu, Switch, useTheme } from "react-native-paper";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPrivateMode } from "../chatSlice";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCopyToClipboard } from "../hoc/useCopyToClipboard";
import { useFeatureFlag } from "@/redux/FeatureProvider";
import { Appbar, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GroupAvatar from "@/domains/shared/components/GroupAvatar";
import { current } from "@reduxjs/toolkit";

type ChatHeaderProps = {
  name?: string;
  privateMode?: boolean;
  inviteId: string;
  copyToClipboard?: (inviteId: string) => Promise<void>;
};

function ChatHeader({
  name,
  privateMode = false,
  copyToClipboard,
  inviteId,
}: ChatHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const { enablePrivateMessaging } = useFeatureFlag();

  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleAction = async (action: string) => {
    // @todos fix this condition - if props coming from hoc, how to fix type error. - useContext
    copyToClipboard && (await copyToClipboard(inviteId));
    closeMenu();
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.leftContainer}>
        <Appbar.BackAction
          onPress={() => {
            router.push("/(main)/dashboard");
          }}
        />

        <View
          style={[styles.groupWrapper, { borderColor: theme.colors.outline }]}
        >
          <View>
            <GroupAvatar groupName={name || ""} />
          </View>
          <View style={styles.groupDetails}>
            <Text
              variant="titleMedium"
              style={[styles.title, { color: theme.colors.onSurface }]}
            >
              {name}
            </Text>
            <Text
              variant="labelSmall"
              style={[
                styles.subtext,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              status
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightContainer}>
        {enablePrivateMessaging && (
          <View style={styles.privateMode}>
            <IconButton
              icon="incognito"
              size={16}
              style={{ backgroundColor: privateMode ? "darkgrey" : "" }}
              onPress={() => {
                dispatch(setPrivateMode(!privateMode));
              }}
            />
          </View>
        )}

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton icon="dots-vertical" size={20} onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => handleAction("copy")}
            title="Copy Room Link"
          />
          <Menu.Item onPress={() => handleAction("mute")} title="Mute" />
          <Menu.Item
            onPress={() => handleAction("delete")}
            title="Delete Chat"
          />
          <Menu.Item onPress={() => handleAction("leave")} title="Leave Chat" />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 20,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f5f6",
    backgroundColor: "#fafafa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  groupDetails: {
    marginLeft: 10,
  },
  title: {},
  subtext: {},
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  privateMode: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useCopyToClipboard(ChatHeader);
