import { Image, View, StyleSheet } from "react-native";
import TypingDots from "./TypingDots";
import { Text } from "react-native-paper";

type LoadingScreenText = {
  loadingText?: string;
};
export default function LoadingScreen({ loadingText }: LoadingScreenText) {
  return (
    <View style={[styles.container]}>
      <Image
        source={require("@/assets/images/logo.png")}
        width={64}
        height={64}
        style={styles.logo}
      />
      <TypingDots count={6} />
      {loadingText && (
        <Text style={{ marginTop: 10 }} variant="bodyMedium">
          {loadingText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  },
});
