import { View } from "react-native";
import { Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { applyActionCode, getAuth } from "firebase/auth";
import { router } from "expo-router";
import { Button } from "@/domains/shared/components/Button";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const auth = getAuth();
    const params = new URLSearchParams(window.location.search);
    const oobCode = params.get("oobCode");

    if (!oobCode) {
      setStatus("error");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, []);

  const message = {
    verifying: "Verifying your email...",
    success: "Email verified.",
    error: "Email verification failed",
  };
  return (
    <View style={{ padding: 20 }}>
      <LoadingScreen loadingText={message[status]} />
      <View style={{ marginTop: 20 }}>
        {status !== "verifying" && (
          <Button
            type="textLink"
            onPress={() => router.replace("/(auth)/login")}
          >
            Login
          </Button>
        )}
        {status === "error" && (
          <Button type="textLink" onPress={() => {}}>
            Resend verification link
          </Button>
        )}
      </View>
    </View>
  );
}
