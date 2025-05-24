import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

type Props = {
  email?: string;
  onVerified?: () => void;
};

export default function EmailVerificationSheet({ email, onVerified }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (code.trim().length < 4) {
      setError("Please enter the code");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // @todo: call verifyEmailCode mutation here
      // await fakeVerify(code); // replace with mutation
      onVerified?.();
    } catch (err) {
      setError("Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.caption}>
        A verification code has been sent to <Text style={styles.email}>{email}</Text>
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
        mode="contained"
        onPress={handleVerify}
        loading={loading}
        disabled={loading}
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