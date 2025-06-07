import { useState } from "react";
import { useLazyGetMeQuery } from "@/domains/auth/authApi";
import { storage } from "@/services/storage";
import { AUTH_TOKEN } from "@/constants";
import { useLoginForm } from "@/domains/auth/hooks/useLoginForm";
import { getNextRoute } from "@/domains/shared/lib/getNextRoute";
import Bottomsheet from "@/domains/shared/components/Bottomsheet";
import EmailVerificationSheet from "@/domains/auth/components/EmailVerificationBottomsheet";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { LoginForm } from "@/domains/auth/components/LoginForm";

import { LoginResponse } from "@/domains/auth/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import RequestPasswordReset from "@/domains/auth/components/RequestPasswordReset";
import { showToast } from "@/domains/notification/lib/showToast";

type LoginResult =
  | { data: LoginResponse }
  | { error: FetchBaseQueryError | SerializedError };

export default function LoginScreen() {
  const router = useRouter();
  const {
    invite_id: inviteId,
    id: userId,
    verified: isVerified,
  } = useLocalSearchParams<{
    invite_id?: string;
    id?: string;
    verified?: string;
  }>();

  const { login, isLoggedIn, user: userData } = useAuth();
  const [triggerMe] = useLazyGetMeQuery();

  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false);

  const { user, setUser, errors, touched, validate } = useLoginForm();

  const handleLogin = async () => {
    const { email, password } = user;
    setError("");
    validate();
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    try {
      const res = await login(email, password);

      if (res.success) {
        router.replace("/(main)/dashboard");
      } else {
        showToast("error", "Login failed", res.error || "Please try again");
      }
    } catch (err) {
      // @todo update error message
      console.log("Error from gql--", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordMode(true);
  };

  const handleReturnToLogin = () => {
    setForgotPasswordMode(false);
  };

  if (forgotPasswordMode) {
    return (
      <>
        <LoadingScreen loadingText="Password recovery..." />
        <Bottomsheet visible={forgotPasswordMode} onClose={() => {}}>
          <RequestPasswordReset returnToLogin={handleReturnToLogin} />
        </Bottomsheet>
      </>
    );
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
        triggerForgotPassword={handleForgotPassword}
      />
    </>
  );
}
