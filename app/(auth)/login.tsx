import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} from "@/domains/auth/authApi";
import { storage } from "@/services/storage";
import { AUTH_TOKEN } from "@/constants";
import TextInput from "@/domains/shared/components/forms/TextInput/";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLoginForm } from "@/domains/auth/hooks/useLoginForm";
import { HEADER_HEIGHT } from "@/domains/shared/constants";
import { getNextRoute } from "@/domains/shared/lib/getNextRoute";

export default function LoginScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { invite_id: inviteId, id } = useLocalSearchParams<{
    invite_id?: string;
    id?: string;
  }>();

  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const [triggerMe] = useLazyGetMeQuery();
  const { data: user } = useGetMeQuery();

  const [loading, setLoading] = useState(false);

  const {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    touched,
    setTouched,
    validate,
  } = useLoginForm();

  useEffect(() => {
    if (!inviteId && user?.email) {
      router.replace("/(main)/dashboard");
    }
  }, [user?.email, inviteId]);

  const handleLogin = async () => {
    setTouched({ username: true, password: true });
    setError("");
    validate();
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    try {
      const res = await login({
        email: username,
        password,
      });

      if (res.error) {
        const errorMessage = (res.error as { message?: string }).message;
        setError(errorMessage || "Login error, please try again.");
        return;
      }
      const { token, user } = res.data || {};
      if (user?.email && token) {
        await storage.setItem(AUTH_TOKEN, token);
        await triggerMe();
        router.replace(getNextRoute(inviteId) as any);
      }
    } catch (err) {
      // @todo update error message
      console.log("Error from gql--", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo_vertical.png")}
        />
        <Text style={{ marginTop: 20 }} variant="titleMedium">
          Learn while you talk!
        </Text>
      </View>

      {!!id && (
        <Text style={styles.registrationSuccess}>
          Registration successful. Login to continue.
        </Text>
      )}

      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setTouched((t) => ({ ...t, username: true }));
        }}
        error={errors.username}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setTouched((t) => ({ ...t, password: true }));
        }}
        secureTextEntry
        error={errors.password}
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
        labelStyle={[styles.buttonLabel, { color: theme.colors.surface }]}
        style={styles.button}
      >
        {loading ? "Please wait..." : "Login"}
      </Button>

      {!!inviteId && !id && (
        <View
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link href={`/(auth)/register?invite_id=${inviteId}`}>
            Don't have an account? Click here!
          </Link>
        </View>
      )}
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
    borderRadius: 8,
  },
  buttonLabel: {
    fontWeight: "600",
  },
});
