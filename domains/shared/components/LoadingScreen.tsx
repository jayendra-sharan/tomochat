import { Image, View, StyleSheet } from "react-native";
import TypingDots from "./TypingDots";
import { useTheme } from "react-native-paper";

export default function LoadingScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require("@/assets/images/logo.png")}
        width={64}
        height={64}
        style={styles.logo}
      />
      <TypingDots count={6} />
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