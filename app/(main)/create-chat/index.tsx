import React, { useState } from "react";
import { Button, TextInput, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";
import { useGetMeQuery } from "@/domains/auth/authApi";
import { useCreateRoomMutation } from "@/domains/rooms/roomsApi";
import { PageWithLogo } from "@/domains/shared/components/PageWithLogo";
import LanguagePicker from "@/domains/rooms/components/LanguagePicker";

export default function CreateChatPage() {
  // const theme = useAppTheme();
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState<string>("nl-NL");

  const router = useRouter();
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const { data: user } = useGetMeQuery();

  const isRoomNameValid = /^[a-zA-Z0-9\s,&-]+$/.test(roomName);

  const onSubmit = async () => {
    if (!isRoomNameValid || !roomName.trim() || !language) return;
    try {
      const { inviteLink } = await createRoom({
        name: roomName.trim(),
        language,
        userDisplayName: user?.displayName ?? "",
      }).unwrap();
      router.push(`/(main)/create-chat/success?invite_id=${inviteLink}`);
    } catch (error) {
      console.log("Error in creating chat room");
    }
  };

  return (
    <PageWithLogo>
      <TextInput
        label="Chat name"
        value={roomName}
        onChangeText={setRoomName}
        mode="outlined"
        error={!isRoomNameValid && roomName.length > 0}
      />
      <HelperText
        type="error"
        visible={!isRoomNameValid && roomName.length > 0}
      >
        Only letters, numbers, spaces, &, - are allowed.
      </HelperText>

      <LanguagePicker language={language} setLanguage={setLanguage} />

      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={!isRoomNameValid || isLoading}
        style={{ marginTop: 24 }}
      >
        Create
      </Button>
      <Button
        mode="text"
        onPress={() => {
          router.replace("/(main)/dashboard");
        }}
        style={{ marginTop: 16 }}
      >
        Back to all chats
      </Button>
    </PageWithLogo>
  );
}
