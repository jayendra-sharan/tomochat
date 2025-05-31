import { View } from "react-native";
import Password from "@/domains/auth/components/Password";

export default function ResetPassword() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Password mode="recovery" title="Recover your password" />
    </View>
  );
}
