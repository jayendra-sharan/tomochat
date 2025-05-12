import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="headlineMedium">Register Page</Text>
      <Button mode="contained" onPress={() => router.push('/(auth)/login')} style={{ marginTop: 16 }}>
        Back to Login
      </Button>
    </View>
  );
}
