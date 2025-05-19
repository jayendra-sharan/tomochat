import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Snackbar } from "react-native-paper";
import { Platform, View } from "react-native";

// @todos can be extended for copy message action
export function useCopyToClipboard<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T) {
    const [copiedVisible, setCopiedVisible] = useState(false);

    const copyToClipboard = async (inviteId: string) => {
      const inviteLink = `${window.location.origin}/invite?invite_id=${inviteId}`;
      await Clipboard.setStringAsync(inviteLink);
      setCopiedVisible(true);
    };
    return (
      <>
        <Component copyToClipboard={copyToClipboard} {...props} />
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            zIndex: 999,
            alignItems: "center",
            ...(Platform.OS === "web" && { pointerEvents: "none" }),
          }}
        >
          <Snackbar
            visible={copiedVisible}
            onDismiss={() => setCopiedVisible(false)}
            duration={2000}
          >
            Copied to clipboard
          </Snackbar>
        </View>
      </>
    );
  };
}
