import { useCallback, useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import type { TextInput as RNTextInputType } from "react-native";
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
import Bottomsheet from "@/domains/shared/components/Bottomsheet";
import EmailVerificationSheet from "@/domains/auth/components/EmailVerificationBottomsheet";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { LoginForm } from "@/domains/auth/components/LoginForm";

export default function LoginScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { invite_id: inviteId, id: userId } = useLocalSearchParams<{
    invite_id?: string;
    id?: string;
  }>();

  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const { isLoggedIn } = useAuth();
  const [triggerMe] = useLazyGetMeQuery();
  const { data: userData } = useGetMeQuery();
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const redirectToDashboard = () => {
    const nextRoute = getNextRoute(inviteId) as any;
    router.replace(nextRoute)
  }

  const {
    user,
    setUser,
    errors,
    touched,
    validate,
  } = useLoginForm();

  useEffect(() => {
    if (isLoggedIn && !userData?.isEmailVerified) {
      console.log("User", userData);
      setVisible(true);
      return;

    }
    if (!inviteId && userData?.email) {
      redirectToDashboard();
    }
  }, [userData?.email, inviteId]);

  const onVerified = () => {
    setVisible(false);
    redirectToDashboard();
  };

  const handleLogin = async () => {
    const { email, password } = user;
    setError("");
    validate();
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    try {
      const res = await login({
        email,
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
        if (user?.isEmailVerified) {
          redirectToDashboard();
        } else {
          setVisible(true);
        }
      }
    } catch (err) {
      // @todo update error message
      console.log("Error from gql--", err);
    } finally {
      setLoading(false);
    }
  };

  if (visible) {
    return (
      <>
        <LoadingScreen loadingText="Verifying email..." />
        <Bottomsheet
          visible={visible}
          onClose={() => {}}
        >
          <EmailVerificationSheet email={user?.email} onVerified={onVerified} />
        </Bottomsheet>
      </>
    )
  }

  return (
    <>
      <LoginForm
        user={user}
        setUser={setUser}
        errors={errors}
        touched={touched}
        error={error}
        handleLogin={handleLogin}
        loading={loading}
        inviteId={inviteId}
        userId={userId}
      />
    </>
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
