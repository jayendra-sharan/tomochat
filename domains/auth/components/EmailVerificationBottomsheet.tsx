import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useSendVerificationCodeMutation } from "../authApi";
import { Button } from "@/domains/shared/components/Button";

type Props = {
  email: string;
  verifyEmail: (code: string) => void;
  isVerifying: boolean;
  error?: string;
  resetError: () => void;
};

export default function EmailVerificationSheet({
  email,
  verifyEmail,
  isVerifying,
  error,
  resetError,
}: Props) {
  const [code, setCode] = useState("");
  const [sendVerificationCode, { isLoading }] =
    useSendVerificationCodeMutation();

  const handleVerify = async () => {
    if (code.trim().length < 4) {
      return;
    }
    verifyEmail(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.caption}>
        A verification code has been sent to{" "}
        <Text style={styles.email}>{email}</Text>
      </Text>

      <TextInput
        label="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.input}
        error={!!error}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Button
        onPress={() => {
          sendVerificationCode({ email });
          resetError();
          setCode("");
        }}
      >
        Didn't receive the code? Click to resend.
      </Button>

      <Button
        mode="contained"
        onPress={handleVerify}
        loading={isVerifying || isLoading}
        disabled={isVerifying || isLoading}
        style={styles.button}
      >
        Verify
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  caption: {
    fontSize: 14,
    marginBottom: 16,
  },
  email: {
    fontWeight: "500",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  error: {
    color: "#D32F2F",
    marginBottom: 8,
  },
});
