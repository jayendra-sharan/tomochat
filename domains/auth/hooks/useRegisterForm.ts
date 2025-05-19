import { useState, useCallback, useEffect } from "react";
import { RegisterUser } from "../types";

export function useRegisterForm() {
  const [user, setUser] = useState<RegisterUser>({
    email: "",
    password: "",
    rePassword: "",
    displayName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    rePassword: "",
    displayName: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    rePassword: false,
    displayName: false,
  });

  const { email, password, rePassword, displayName } = user;

  const updateUser = (field: keyof RegisterUser, value: string) => {
    updateTouched(field);
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTouched = (field: keyof RegisterUser) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validate = useCallback(() => {
    const newErrors = {
      email: "",
      password: "",
      rePassword: "",
      displayName: "",
    };
    // @todo add email testing
    if (touched.email && email.trim().length < 6) {
      newErrors.email = "Username must be at least 3 characters";
    }
    // @todo add password policy
    if (touched.password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (touched.rePassword && rePassword !== password) {
      newErrors.rePassword = "Must match with password";
    }
    if (touched.displayName && displayName.length < 3) {
      newErrors.displayName = "Display name must be at least 3 characters";
    }
    setErrors(newErrors);
  }, [email, password, rePassword, displayName, touched]);

  useEffect(() => {
    const timer = setTimeout(validate, 300);
    return () => clearTimeout(timer);
  }, [email, password, rePassword, displayName, validate]);

  return {
    user,
    updateUser,
    updateTouched,
    errors,
    validate,
  };
}
