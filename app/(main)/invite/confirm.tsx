import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, Button, ActivityIndicator, useTheme } from "react-native-paper";
import { useJoinRoomMutation } from "@/domains/rooms/roomsApi";
import { storage } from "@/services/storage";
import { PENDING_INVITE } from "@/constants";

type InviteConfirmPageProps = {};

export default function InviteConfirmPage() {
  const theme = useTheme();
  const router = useRouter();
  const { room } = useLocalSearchParams<{ room: string }>();

  useEffect(() => {
    storage.removeItem(PENDING_INVITE);
  }, []);

  if (!room) {
    return (
      <View style={styles.container}>
        <Text style={{ paddingVertical: 10 }}>Something went wrong</Text>
        <View style={styles.actions}>
          <Button mode="contained" onPress={() => router.replace("/dashboard")}>
            Return to Home
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.success}>
        ✅ You've successfully joined the group!
      </Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={() => router.replace("/dashboard")}>
          Go to Dashboard
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push(`/(main)/chat/${room}`)}
        >
          Open Group Chat
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  joiningText: {
    marginTop: 12,
  },
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    marginBottom: 24,
    textAlign: "center",
  },
  actions: {
    gap: 12,
    width: "100%",
  },
});
