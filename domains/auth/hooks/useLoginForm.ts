import formValidator from "@/domains/shared/lib/formValidator";
import { useState, useCallback, useEffect } from "react";

type User = {
  email: string;
  password: string;
};
export function useLoginForm() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<User>({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validate = useCallback(() => {
    const newErrors = { email: "", password: "" };
    if (
      touched.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())
    ) {
      newErrors.email = "Must be a valid email address";
    }
    const { isValid, message } = formValidator.password(user.password.trim());
    if (touched.password && !isValid) {
      newErrors.password = message;
    }
    setErrors(newErrors);
  }, [user, touched]);

  const updateUser = (field: keyof User, value: string) => {
    setUser({
      ...user,
      [field]: value,
    });
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  useEffect(() => {
    const timer = setTimeout(validate, 300);
    return () => clearTimeout(timer);
  }, [user, validate]);

  return {
    user,
    setUser: updateUser,
    errors,
    touched,
    setTouched,
    validate,
  };
}
