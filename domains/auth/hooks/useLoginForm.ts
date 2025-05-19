import { useState, useCallback, useEffect } from 'react';

export function useLoginForm() {
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

  useEffect(() => {
    const timer = setTimeout(validate, 300);
    return () => clearTimeout(timer);
  }, [username, password, validate]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    touched,
    setTouched,
    validate,
  };
}
