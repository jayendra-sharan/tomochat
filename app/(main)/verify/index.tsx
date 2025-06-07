import VerifyEmail from "@/domains/auth/components/VerifyEmail";
import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { View } from "react-native";

export default function VerifyScreen() {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VerifyEmail />
    </View>
  );
}
