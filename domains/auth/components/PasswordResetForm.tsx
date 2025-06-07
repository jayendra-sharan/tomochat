import { View } from "react-native";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { Button } from "@/domains/shared/components/Button";
import { usePasswordUpdate } from "../hooks/usePasswordUpdate";

type Props = {
  handlePasswordSubmit: (password: string) => void;
  isLoading: boolean;
};
export default function PasswordResetForm({
  handlePasswordSubmit,
  isLoading,
}: Props) {
  const { password, error, setPassword } = usePasswordUpdate();

  const onSubmit = () => {
    handlePasswordSubmit(password.newPwd);
  };

  return (
    <View>
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
        loading={isLoading}
        disabled={isLoading || password.newPwd !== password.repeatNewPwd}
      >
        Reset Password
      </Button>
    </View>
  );
}
