import { useGetMeQuery } from '@/domains/auth/authApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

export default function Home() {
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user?.email) {
      router.push("/(main)/dashboard");
    }
  }, [user?.email, mounted]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require("@/assets/images/logo.png")} />
    </View>
  );
}