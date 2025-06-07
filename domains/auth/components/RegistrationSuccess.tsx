import { Button } from "@/domains/shared/components/Button";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function RegistrationSuccess() {
  return (
    <View>
      <Text variant="bodyMedium">
        Registration successful! You will receive an email shortly to confirm
        your registration.
      </Text>
      <Text variant="bodySmall" style={{ marginBlock: 20 }}>
        If you did not receive the email, you can resend it to your inbox.
      </Text>
      <Button type="textLink" onPress={() => {}}>
        Resend verification link
      </Button>
    </View>
  );
}
