import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import TextInput from "@/domains/shared/components/forms/TextInput";
import { TextInput as TextInputType, Image } from "react-native";
import { useRef, useState } from "react";
import { useRegisterForm } from "@/domains/auth/hooks/useRegisterForm";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { Button } from "@/domains/shared/components/Button";
import { BRAND_TAGLINE } from "@/utils/constants";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { logger } from "@/services/logger";
import { showToast } from "@/domains/notification/lib/showToast";
import RegistrationForm from "@/domains/auth/components/RegistrationForm";
import RegistrationSuccess from "@/domains/auth/components/RegistrationSuccess";

export default function RegisterScreen() {
  const router = useRouter();
  const { invite_id: inviteId } = useLocalSearchParams<{ invite_id: string }>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onRegisterFailure = (message?: string) => {
    showToast("error", "Registration Failed", message || "Please try again");
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10} // adjust as needed depending on header
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo_vertical.png")}
            />
          </View>
          {success ? (
            <RegistrationSuccess />
          ) : (
            <RegistrationForm
              onSuccess={() => {
                setSuccess(true);
              }}
              onFailure={onRegisterFailure}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
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
});
