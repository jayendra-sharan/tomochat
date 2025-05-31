import { View } from "react-native";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { Button } from "@/domains/shared/components/Button";
import { router } from "expo-router";
import { showToast } from "@/domains/notification/lib/showToast";
import { APIError } from "@/services/gqlBaseQuery";
import { usePasswordUpdate } from "../hooks/usePasswordUpdate";
import { useState } from "react";
import { Text } from "react-native-paper";

type Props = {
  mode: "recovery" | "default";
  title: string;
  subtitle?: string;
};
export default function Password({ mode = "default", title }: Props) {
  const { password, error, setPassword, updatePassword } = usePasswordUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await updatePassword(mode);
      if (result.error) {
        if (result.error.name === "GraphQLError")
          throw new Error("Could not reset password, try again");
      }
      if (mode === "recovery") {
        showToast("success", "Success", "Redirecting to login");
        setTimeout(() => {
          router.push("/(auth)/login");
        }, 3000);
      }
      if (mode === "default") {
        setPasswordChanged(true);
      }
    } catch (err) {
      const message = (err as APIError).message;
      console.error(`Error occured ${err}`);
      showToast(
        "error",
        "Error",
        message || "Password change error, try again."
      );
      setPassword({ reset: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === "default" && passwordChanged) {
    return (
      <View>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>
          {title}
        </Text>
        <Text style={{ marginBottom: 40 }} variant="bodySmall">
          Password successfully changed.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push("/(main)/dashboard")}
        >
          Go to all chats
        </Button>
      </View>
    );
  }

  return (
    <View>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        {title}
      </Text>
      {mode === "default" && (
        <TextInput
          label="Current password"
          secureTextEntry
          value={password.currentPwd}
          onChangeText={(value) => setPassword({ key: "currentPwd", value })}
          style={{ marginBottom: 8 }}
        />
      )}
      <TextInput
        label="New password"
        secureTextEntry
        value={password.newPwd}
        onChangeText={(value) => setPassword({ key: "newPwd", value })}
        errorMessage={error.newPwd}
      />
      <TextInput
        label="Repeat new password"
        secureTextEntry
        value={password.repeatNewPwd}
        onChangeText={(value) => setPassword({ key: "repeatNewPwd", value })}
        errorMessage={error.repeatNewPwd}
      />
      <Button
        mode="contained"
        onPress={handlePasswordSubmit}
        disabled={password.newPwd !== password.repeatNewPwd}
        loading={isLoading}
      >
        Save Password
      </Button>
      {mode === "default" && (
        <Button
          style={{ marginTop: 20 }}
          mode="text"
          onPress={() => router.navigate("/(main)/dashboard")}
        >
          Back
        </Button>
      )}
      {mode === "recovery" && (
        <Button
          style={{ marginTop: 20 }}
          mode="text"
          onPress={() => router.navigate("/(auth)/login")}
        >
          Login
        </Button>
      )}
    </View>
  );
}
