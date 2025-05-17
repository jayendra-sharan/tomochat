import { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useGetMeQuery, useLoginMutation } from '@/domains/auth/authApi';
import { storage } from '@/services/storage';
import { AUTH_TOKEN } from '@/constants';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [login] = useLoginMutation();
  const { data: user } = useGetMeQuery();
  
  const theme = useTheme();

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
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo.png")} />
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
        style={styles.input}
      />
      <View style={styles.errorWrapper}>
        {errors.username ? (
          <Text
            style={[styles.errorText, { color: theme.colors.error }]}
          >
            {errors.username}
          </Text>
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
        style={styles.input}
      />
      <View style={styles.errorWrapper}>
        {errors.password ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.password}
          </Text>
        ) : null}
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading || !!errors.username || !!errors.password}
        labelStyle={styles.buttonLabel}
      >
        {loading ? 'Please wait...' : 'Login'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA', // theme.colors.background (manually pulled for RNW SSR)
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    resizeMode: 'contain',
    height: 48,
    width: 160,
  },
  input: {
    marginBottom: 8,
  },
  errorWrapper: {
    minHeight: 20,
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  errorText: {
    fontSize: 13,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonLabel: {
    fontWeight: '600',
  },
});
