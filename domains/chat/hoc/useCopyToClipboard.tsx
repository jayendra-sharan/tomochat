import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Portal, Snackbar } from "react-native-paper";
import { Platform, View } from "react-native";

type Props = {
  copyToClipboard: (inviteId: string) => Promise<void>;
};

// @todos can be extended for copy message action
export function useCopyToClipboard<T extends Props>(
  Component: React.ComponentType<T>
) {
  type HocProps = Omit<T, keyof Props>;

  return (props: HocProps) => {
    const [copiedVisible, setCopiedVisible] = useState(false);

    const copyToClipboard: Props = {
      copyToClipboard: async (inviteId: string) => {
        const inviteLink = `${window.location.origin}/invite?invite_id=${inviteId}`;
        await Clipboard.setStringAsync(inviteLink);
        setCopiedVisible(true);
      },
    };
    return (
      <>
        <Component {...(props as T)} {...copyToClipboard} />
        <Portal>
          <Snackbar
            style={{ bottom: 40 }}
            visible={copiedVisible}
            onDismiss={() => setCopiedVisible(false)}
            duration={2000}
          >
            Copied to clipboard
          </Snackbar>
        </Portal>
      </>
    );
  };
}
