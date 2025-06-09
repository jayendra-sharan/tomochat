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
import { BRAND_TAGLINE } from "@/utils/constants";

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
  triggerForgotPassword: () => void;
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
  triggerForgotPassword,
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
            {BRAND_TAGLINE}
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
              marginBottom: 12,
            }}
          >
            {error}
          </Text>
        )}

        <Button
          type="primary"
          onPress={handleLogin}
          loading={loading}
          disabled={
            loading ||
            !!errors.username ||
            !!errors.password ||
            !email ||
            !password.trim()
          }
        >
          {loading ? "Please wait..." : "Login"}
        </Button>

        {!userId && (
          <Button
            style={{ marginTop: 12 }}
            type="textLink"
            onPress={() => {
              router.replace(`/(auth)/register?invite_id=${inviteId}`);
            }}
          >
            <Text style={{ fontSize: 14 }}>
              Don't have an account? Click here!
            </Text>
          </Button>
        )}
        <Button type="textLink" onPress={triggerForgotPassword}>
          <Text style={{ fontSize: 14 }}>Forgot Password?</Text>
        </Button>
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
