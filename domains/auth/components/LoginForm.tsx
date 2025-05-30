import { useRef } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { Text } from "react-native-paper";
import { HEADER_HEIGHT } from "@/domains/shared/constants";
import { TextInput as RNTextInput } from "react-native";
import { Button } from "@/domains/shared/components/Button";

type User = {
  email: string;
  password: string;
};

type LoginFormProps = {
  user: User;
  setUser: (field: keyof User, value: string) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  error: string;
  handleLogin: () => void;
  loading: boolean;
  inviteId?: string;
  userId?: string;
};

export function LoginForm({
  user,
  setUser,
  errors,
  error,
  handleLogin,
  loading,
  inviteId = "",
  userId,
}: LoginFormProps) {
  const theme = useAppTheme();
  const passwordRef = useRef<RNTextInput>(null);

  const { email, password } = user;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/logo_vertical.png")}
          />
          <Text
            style={{ marginTop: 20, color: theme.colors.onSurface }}
            variant="titleMedium"
          >
            Learn while you talk!
          </Text>
        </View>

        {!!userId && (
          <Text
            style={[
              styles.registrationSuccess,
              { color: theme.colors.onSurface },
            ]}
          >
            Registration successful. Login to continue.
          </Text>
        )}

        <TextInput
          fieldType="email"
          label="Email"
          value={email}
          onChangeText={(text) => {
            setUser("email", text);
          }}
          errorMessage={errors.email}
          returnKeyType="next"
          onSubmitEditing={() =>
            setTimeout(() => passwordRef.current?.focus(), 500)
          }
          autoCapitalize="none"
        />

        <TextInput
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => {
            setUser("password", text);
          }}
          secureTextEntry
          errorMessage={errors.password}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          autoCapitalize="none"
        />

        {!!error && (
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.error,
              fontSize: theme.fontSizes.body,
            }}
          >
            {error}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading || !!errors.username || !!errors.password}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>

        {!userId && (
          <Button
            mode="text"
            onPress={() => {
              router.replace(`/(auth)/register?invite_id=${inviteId}`);
            }}
          >
            Don't have an account? Click here!
          </Button>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
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
  registrationSuccess: {
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    borderRadius: 2,
  },
  buttonLabel: {
    fontWeight: "600",
    fontSize: 16,
  },
});
