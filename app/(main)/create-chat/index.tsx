import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  TextInput,
  HelperText,
  RadioButton,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { useGetMeQuery } from "@/domains/auth/authApi";
import { useCreateRoomMutation } from "@/domains/rooms/roomsApi";

const LANGUAGES = [
  { label: "English", value: "EN" },
  { label: "Dutch", value: "NL" },
];

export default function CreateChatPage() {
  // const theme = useAppTheme();
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("EN");

  const router = useRouter();
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const { data: user } = useGetMeQuery();

  const isRoomNameValid = /^[a-zA-Z0-9\s,&-]+$/.test(roomName);

  const onSubmit = async () => {
    if (!isRoomNameValid || !roomName.trim()) return;
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
    <View style={{ padding: 16 }}>
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

      <Text variant="titleMedium" style={{ marginTop: 16 }}>
        Language
      </Text>
      <RadioButton.Group onValueChange={setLanguage} value={language}>
        {LANGUAGES.map((lang) => (
          <RadioButton.Item
            key={lang.value}
            label={lang.label}
            value={lang.value}
          />
        ))}
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={!isRoomNameValid || isLoading}
        style={{ marginTop: 24 }}
      >
        Create
      </Button>
    </View>
  );
}
