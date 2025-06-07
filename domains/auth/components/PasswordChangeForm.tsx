import { View } from "react-native";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { Button } from "@/domains/shared/components/Button";
import { router } from "expo-router";
import { usePasswordUpdate } from "../hooks/usePasswordUpdate";

type Props = {
  handlePasswordChangeSubmit: (
    currentPassword: string,
    newPassword: string
  ) => void;
  loading: boolean;
};

export default function PasswordChangeForm({
  handlePasswordChangeSubmit,
  loading,
}: Props) {
  const { password, error, setPassword } = usePasswordUpdate();

  const onSubmit = async () => {
    handlePasswordChangeSubmit(password.currentPwd, password.newPwd);
  };

  return (
    <View>
      <TextInput
        label="Current password"
        secureTextEntry
        value={password.currentPwd}
        onChangeText={(value) => setPassword({ key: "currentPwd", value })}
      />
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
        type="primary"
        onPress={onSubmit}
        disabled={password.newPwd !== password.repeatNewPwd}
        loading={loading}
      >
        Save Password
      </Button>
      <Button
        style={{ marginTop: 20 }}
        type="menuLink"
        onPress={() => router.navigate("/(main)/dashboard")}
      >
        Back
      </Button>
    </View>
  );
}
