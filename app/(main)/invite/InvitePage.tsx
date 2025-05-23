import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { User } from "@/domains/auth/types";
import { useJoinRoomMutation } from "@/domains/rooms/roomsApi";

type InvitePageProps = {
  user: User;
};

export default function InvitePage({ user }: InvitePageProps) {
  const theme = useTheme();
  const router = useRouter();
  const { invite_id: inviteId } = useLocalSearchParams<{ invite_id: string }>();
  const { me } = useLocalSearchParams<{ me: string }>();
  const [password, setPassword] = useState("");

  const [joinRoom, { isLoading }] = useJoinRoomMutation();

  const [roomId] = inviteId.split("--");
  const handleJoin = async () => {
    if (!inviteId) return;
    // @todos send password and add validation
    const { result } = await joinRoom({ inviteLink: inviteId }).unwrap();
    if (result) {
      router.replace(`/(main)/invite/confirm?room=${roomId}`);
    } else {
      router.replace(`/(main)/invite/confirm?room=`);
    }
  };

  console.log(
    "State",
    !me,
    !(!!me && !password.trim()),
    !me || !(!!me && !password.trim()),
  );
  let disableButton = true;
  if (!!me) {
    disableButton = false;
  } else if (!me) {
    disableButton = !password.trim();
  }
  return (
    <View style={{ padding: 24, flex: 1 }}>
      <Text variant="titleMedium" style={{ marginBottom: 12 }}>
        You've been invited to join a chat on TomoChat.
      </Text>

      {!me && (
        <>
          <Text style={{ marginBottom: 24 }}>
            Please confirm your password to accept the invitation.
          </Text>
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 16 }}
          />
        </>
      )}

      <Button
        mode="contained"
        onPress={handleJoin}
        loading={isLoading}
        disabled={disableButton}
      >
        Join chat
      </Button>
    </View>
  );
}
