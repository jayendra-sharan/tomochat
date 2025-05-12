import { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useGetMeQuery, useLoginMutation } from '@/domains/auth/authApi';
import { storage } from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [login] = useLoginMutation();
  const { data: user } = useGetMeQuery();
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });

  const validate = useCallback(() => {
    const newErrors = { username: '', password: '' };

    if (touched.username && username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (touched.password && password.length < 2) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
  }, [username, password, touched]);

  // Debounce validation
  useEffect(() => {
    const handler = setTimeout(() => {
      validate();
    }, 300);
    return () => clearTimeout(handler);
  }, [username, password, validate]);

  useEffect(() => {
    if (user?.email) {
      router.push("/(main)/dashboard");
    }
  }, [user?.email])

  const handleLogin = async () => {
    setTouched({ username: true, password: true });
    validate();

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);

    try {
      const res = await login({ email: username, password }).unwrap();
      storage.setItem(AUTH_TOKEN, res.token);
      router.replace('/(main)/dashboard'); // redirect after login
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <View style={{ display: 'flex', justifyContent: "center", flexDirection: "row", marginBottom: 40 }}>
        <Image source={require("@/assets/images/logo.png")} />
      </View>

      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setTouched((t) => ({ ...t, username: true }));
        }}
        error={!!errors.username}
        autoCapitalize="none"
      />
      <View style={{ minHeight: 20, justifyContent: 'flex-start', marginBottom: 12 }}>
        {errors.username ? (
          <Text style={{ color: 'red' }}>{errors.username}</Text>
        ) : null}
      </View>

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setTouched((t) => ({ ...t, password: true }));
        }}
        error={!!errors.password}
        secureTextEntry
      />
      <View style={{ minHeight: 20, justifyContent: 'flex-start', marginBottom: 12 }}>
        {errors.password ? (
          <Text style={{ color: 'red' }}>{errors.password}</Text>
        ) : null}
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading || !!errors.username || !!errors.password}
      >
        {loading ? 'Please wait...' : 'Login'}
      </Button>
    </View>
  );
}
