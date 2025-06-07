import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { HEADER_HEIGHT } from "../constants";
import { BRAND_TAGLINE } from "@/utils/constants";

export function PageWithLogo({
  children,
  withTagline = false,
}: {
  children: React.ReactNode;
  withTagline?: boolean;
}) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust as needed depending on header
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo_vertical.png")}
            />
            {withTagline && (
              <Text style={{ marginTop: 20 }} variant="titleMedium">
                {BRAND_TAGLINE}
              </Text>
            )}
          </View>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    // backgroundColor: "#FAFAFA",
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
});
