import { Button } from "@/domains/shared/components/Button";
import { router } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  errorText: string;
};
export default function Error({ errorText }: Props) {
  return (
    <View style={[styles.container]}>
      <Image
        source={require("@/assets/images/logo.png")}
        width={64}
        height={64}
        style={styles.logo}
      />
      <Text style={{ marginTop: 10 }} variant="bodyMedium">
        {errorText}
      </Text>
      <View style={styles.linkWrapper}>
        <Button type="textLink" onPress={() => router.back()}>
          Go back
        </Button>
        <Button
          type="textLink"
          onPress={() => router.push("/(main)/dashboard")}
        >
          Go home
        </Button>
      </View>
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
  linkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
