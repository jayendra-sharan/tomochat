import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconButton, Menu, Switch, useTheme } from "react-native-paper";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPrivateMode } from "../chatSlice";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCopyToClipboard } from "../hoc/useCopyToClipboard";
import { useFeatureFlag } from "@/redux/FeatureProvider";

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
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.leftContainer}>
        <IconButton
          icon="chevron-left"
          size={24}
          style={{ width: 30, height: 30 }}
          onPress={() => router.push("/(main)/dashboard")}
        />
        <View
          style={[styles.groupDetails, { borderColor: theme.colors.outline }]}
        >
          <Text
            style={[
              styles.title,
              { color: theme.colors.onSurface, fontSize: theme.fontSizes.body },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              styles.subtext,
              {
                color: theme.colors.onSurfaceVariant,
                fontSize: theme.fontSizes.secondary,
              },
            ]}
          >
            status
          </Text>
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
            onPress={() => handleAction("mute")}
            title="@todos Lock Group"
          />
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
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupDetails: {
    paddingVertical: 2,
  },
  title: {
    fontWeight: "600",
  },
  subtext: {
    fontSize: 14,
    marginTop: 4,
  },
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
