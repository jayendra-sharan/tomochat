import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useLazyGetMeQuery,
  useVerfiyEmailCodeMutation,
} from "@/domains/auth/authApi";
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

type LoginResult =
  | { data: LoginResponse }
  | { error: FetchBaseQueryError | SerializedError };

export default function LoginScreen() {
  const router = useRouter();
  const { invite_id: inviteId, id: userId } = useLocalSearchParams<{
    invite_id?: string;
    id?: string;
  }>();

  const [login] = useLoginMutation();
  const { isLoggedIn, user: userData } = useAuth();
  const [triggerMe] = useLazyGetMeQuery();

  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false);

  const { isEmailVerified, email: userEmail } = userData || {};

  const [verifyEmail, { isLoading: isVerifying }] =
    useVerfiyEmailCodeMutation();

  const redirectToDashboard = () => {
    const nextRoute = getNextRoute(inviteId) as any;
    router.replace(nextRoute);
  };

  const { user, setUser, errors, touched, validate } = useLoginForm();

  const handleAuthResponse = async (res: LoginResult) => {
    if ("error" in res) {
      const errorMessage =
        (res.error as any)?.message || "Login error, please try again.";
      setError(errorMessage);
      return;
    }

    const { token, user } = res.data;

    if (!token || !user?.email) {
      setError("Invalid login response. Please try again.");
      return;
    }

    await storage.setItem(AUTH_TOKEN, token);
    await triggerMe();

    user.isEmailVerified ? redirectToDashboard() : setVisible(true);
  };
  const verifyEmailAndLogin = async (code: string) => {
    if (!userData?.email) {
      return;
    }
    try {
      // on registrationSuccess
      const res = await verifyEmail({ email: userData?.email, code });
      await handleAuthResponse(res as LoginResult);
    } catch (err) {
      console.log("error in verifying code");
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isEmailVerified) {
      setVisible(true);
      return;
    }
    if (isEmailVerified && userEmail) {
      redirectToDashboard();
    }
  }, [inviteId, isEmailVerified, userEmail]);

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

      await handleAuthResponse(res as LoginResult);
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
  if (visible) {
    return (
      <>
        <LoadingScreen loadingText="Verifying email..." />
        <Bottomsheet visible={visible} onClose={() => {}}>
          <EmailVerificationSheet
            error={error}
            email={userEmail ?? ""}
            verifyEmail={verifyEmailAndLogin}
            isVerifying={isVerifying}
            resetError={() => setError("")}
          />
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
