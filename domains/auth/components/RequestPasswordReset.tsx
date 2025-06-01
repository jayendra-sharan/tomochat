import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "@/domains/shared/components/Button";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { useRequestPasswordResetMutation } from "../authApi";
import { showToast } from "@/domains/notification/lib/showToast";
import { APIError } from "@/services/gqlBaseQuery";

type Props = {
  returnToLogin: () => void;
};

export default function RequestPasswordReset({ returnToLogin }: Props) {
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const sendRecoverEmail = async () => {
    try {
      await requestPasswordReset({ email });
      setEmailSent(true);
    } catch (error) {
      const message = (error as APIError).message;
      console.error(`Error occured ${error}`);
      showToast(
        "error",
        "Error",
        message || "Password change error, try again."
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        Password recovery
      </Text>
      {emailSent ? (
        <Text variant="bodyLarge">
          If an account exist with this email, you will receive an email
          shortly. Please follow the instruction.
        </Text>
      ) : (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
            errorMessage={""}
          />
          <Button
            type="primary"
            onPress={sendRecoverEmail}
            loading={isLoading}
            disabled={false}
            style={styles.button}
          >
            Send recovery email
          </Button>
        </>
      )}
      <Button type="textLink" onPress={returnToLogin}>
        Back to login
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
  },
  error: {
    color: "#D32F2F",
    marginBottom: 8,
  },
});
