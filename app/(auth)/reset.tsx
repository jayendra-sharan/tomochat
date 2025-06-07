// src/screens/ResetPasswordScreen.tsx

import React, { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth, confirmPasswordReset } from "firebase/auth";

import { Text } from "react-native-paper";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { PageWithLogo } from "@/domains/shared/components/PageWithLogo";
import PasswordResetForm from "@/domains/auth/components/PasswordResetForm";
import { showToast } from "@/domains/notification/lib/showToast";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { oobCode } = useLocalSearchParams<{ oobCode: string }>();

  const [submitting, setSubmitting] = useState(false);

  if (!oobCode) {
    return <LoadingScreen loadingText="Password reset token not found" />;
  }

  const resetPassword = async (password: string) => {
    setSubmitting(true);
    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, password);

      showToast("success", "Password reset successful", "Redirecting to login");
      setTimeout(() => {
        router.push("/(auth)/login");
      }, 1500);
    } catch (err: any) {
      // @todo enrich error message
      const message =
        err?.code === "auth/invalid-action-code"
          ? "This link has expired"
          : "Something went wrong";
      showToast("error", "Error", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWithLogo withTagline={false}>
      <View>
        <Text
          style={{ textAlign: "center", marginBottom: 20 }}
          variant="titleLarge"
        >
          Reset your password
        </Text>
        <PasswordResetForm
          isLoading={submitting}
          handlePasswordSubmit={resetPassword}
        />
      </View>
    </PageWithLogo>
  );
}
