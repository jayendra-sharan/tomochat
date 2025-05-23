import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { TextInput as TextInputType } from "react-native";
import { useRef, useState } from "react";
import { useRegisterForm } from "@/domains/auth/hooks/useRegisterForm";
import { setUrlAsync } from "expo-clipboard";
import { useRegisterMutation } from "@/domains/auth/authApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";

export default function RegisterScreen() {
  const router = useRouter();
  const { invite_id: inviteId } = useLocalSearchParams<{ invite_id: string }>();
  const { user, errors, updateUser } = useRegisterForm();
  const [register, { isLoading }] = useRegisterMutation();

  const passwordRef = useRef<TextInputType>(null);
  const rePasswordRef = useRef<TextInputType>(null);
  const displayNameRef = useRef<TextInputType>(null);

  const { email, password, rePassword, displayName } = user;

  const handleRegisterClick = async () => {
    try {
      const { id } = await register({
        email,
        password,
        displayName,
      }).unwrap();
      if (id) {
        router.replace(`/(auth)/login?invite_id=${inviteId}&id=${id}`);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
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
        mode="contained"
        onPress={handleRegisterClick}
        style={{ marginTop: 16 }}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
});
