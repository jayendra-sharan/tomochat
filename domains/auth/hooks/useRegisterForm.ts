import formValidator from "@/domains/shared/lib/formValidator";
import { useState, useCallback, useEffect } from "react";

type RegisterUserState = {
  email: string;
  password: string;
  rePassword: string;
  displayName: string;
};
export function useRegisterForm() {
  const [user, setUser] = useState<RegisterUserState>({
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

  const updateUser = (field: keyof RegisterUserState, value: string) => {
    updateTouched(field);
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
    validate();
  };

  const updateTouched = (field: keyof RegisterUserState) => {
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
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    // @todo add password policy

    if (touched.password) {
      const { message } = formValidator.password(password.trim());
      newErrors.password = message;
    }
    if (touched.rePassword && rePassword !== password) {
      newErrors.rePassword = "Must match with password";
    }
    if (touched.displayName && displayName.length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters";
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
