import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Button,
  Text,
  IconButton,
  Snackbar,
  useTheme,
} from "react-native-paper";
import * as Clipboard from "expo-clipboard";

export default function CreateChatSuccessPage() {
  const theme = useTheme();
  const router = useRouter();
  const [copiedVisible, setCopiedVisible] = useState(false);

  const { invite_id } = useLocalSearchParams<{ invite_id: string }>();

  const inviteLink = `${window.location.origin}/invite?invite_id=${invite_id}`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(inviteLink);
    setCopiedVisible(true);
  };

  const [roomId] = invite_id.split("--");

  // @todo add email address input for inviting people
  return (
    <>
      <View style={{ padding: 24 }}>
        <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
          🎉 Group Created Successfully!
        </Text>

        <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
          Invite Link:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.surfaceVariant,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ flex: 1, maxWidth: "80%" }}>{inviteLink}</Text>
          <IconButton icon="content-copy" onPress={handleCopy} />
        </View>
        <View>
          <Button
            mode="outlined"
            onPress={() => router.replace(`/chat/${roomId}`)}
            style={{ marginTop: 32 }}
          >
            Go to chat
          </Button>

          <Button
            mode="contained"
            onPress={() => router.replace("/dashboard")}
            style={{ marginTop: 32 }}
          >
            Return to Dashboard
          </Button>
        </View>
      </View>
      <Snackbar
        visible={copiedVisible}
        onDismiss={() => setCopiedVisible(false)}
        duration={2000}
      >
        Copied to clipboard
      </Snackbar>
    </>
  );
}
