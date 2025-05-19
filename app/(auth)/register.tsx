import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { useState } from "react";
import { useRegisterForm } from "@/domains/auth/hooks/useRegisterForm";
import { setUrlAsync } from "expo-clipboard";
import { useRegisterMutation } from "@/domains/auth/authApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";

export default function RegisterScreen() {
  const router = useRouter();
  const { invite_id: inviteId } = useLocalSearchParams<{ invite_id: string }>();
  const { user, errors, updateUser } = useRegisterForm();
  const [register, { isLoading }] = useRegisterMutation();

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
        error={errors.email}
      />

      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => updateUser("password", text)}
        error={errors.password}
      />

      <TextInput
        label="Re-enter password"
        secureTextEntry
        value={rePassword}
        onChangeText={(text) => updateUser("rePassword", text)}
        error={errors.rePassword}
      />

      <TextInput
        label="Display name"
        value={displayName}
        onChangeText={(text) => updateUser("displayName", text)}
        error={errors.displayName}
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
