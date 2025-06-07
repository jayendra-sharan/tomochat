import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { TextInput as TextInputType, Image } from "react-native";
import { useRef, useState } from "react";
import { useRegisterForm } from "@/domains/auth/hooks/useRegisterForm";
import { Button } from "@/domains/shared/components/Button";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";

type Props = {
  onSuccess: () => void;
  onFailure: (message?: string) => void;
};

export default function RegistrationForm({ onSuccess, onFailure }: Props) {
  const router = useRouter();
  const { user, errors, updateUser } = useRegisterForm();
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const passwordRef = useRef<TextInputType>(null);
  const rePasswordRef = useRef<TextInputType>(null);
  const displayNameRef = useRef<TextInputType>(null);

  const { email, password, rePassword, displayName } = user;

  const handleRegisterClick = async () => {
    try {
      setIsLoading(true);
      const response = await register(email, password, displayName);
      if (response.success) {
        onSuccess();
      } else {
        onFailure(response?.error);
      }
    } catch (error) {
      logger.error(error, { source: "handleRegisterClick" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={isLoading ? styles.loading : {}}>
      <TextInput
        fieldType="email"
        label="Email"
        value={email}
        onChangeText={(text) => updateUser("email", text)}
        errorMessage={errors.email}
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
      />

      <TextInput
        ref={passwordRef}
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => updateUser("password", text)}
        errorMessage={errors.password}
        returnKeyType="next"
        onSubmitEditing={() => {
          rePasswordRef.current?.focus();
        }}
      />

      <TextInput
        ref={rePasswordRef}
        label="Re-enter password"
        secureTextEntry
        value={rePassword}
        onChangeText={(text) => updateUser("rePassword", text)}
        errorMessage={errors.rePassword}
        returnKeyType="next"
        onSubmitEditing={() => {
          displayNameRef.current?.focus();
        }}
      />

      <TextInput
        ref={displayNameRef}
        label="Display name"
        value={displayName}
        onChangeText={(text) => updateUser("displayName", text)}
        errorMessage={errors.displayName}
        returnKeyType="done"
        onSubmitEditing={handleRegisterClick}
      />

      <Button
        type="primary"
        onPress={handleRegisterClick}
        style={{ marginTop: 16 }}
      >
        Register
      </Button>
      <Button
        type="textLink"
        onPress={() => {
          router.replace("/(auth)/login");
        }}
        style={{ marginTop: 16 }}
      >
        Back to login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    opacity: 0.5,
  },
});
