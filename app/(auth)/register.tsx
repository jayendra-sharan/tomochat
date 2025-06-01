import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { TextInput as TextInputType, Image } from "react-native";
import { useRef } from "react";
import { useRegisterForm } from "@/domains/auth/hooks/useRegisterForm";
import { useRegisterMutation } from "@/domains/auth/authApi";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { HEADER_HEIGHT } from "@/domains/shared/constants";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Button } from "@/domains/shared/components/Button";
import { BRAND_TAGLINE } from "@/utils/constants";

export default function RegisterScreen() {
  const router = useRouter();
  const theme = useAppTheme();
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust as needed depending on header
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo_vertical.png")}
            />
            <Text style={{ marginTop: 20 }} variant="titleMedium">
              {BRAND_TAGLINE}
            </Text>
          </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    // backgroundColor: "#FAFAFA",
  },
  logoWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: -1 * HEADER_HEIGHT,
  },
  logo: {
    resizeMode: "contain",
    height: 64,
  },
});
