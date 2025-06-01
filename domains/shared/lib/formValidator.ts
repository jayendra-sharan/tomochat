const formValidator = {
  password: (value: string, repeatValue?: string) => {
    if (process.env.NODE_ENV === "development") {
      return {
        isValid: true,
        message: "",
      };
    }
    if (value.length < 6) {
      return {
        isValid: false,
        message: "Password must be 6 characters long.",
      };
    }
    if (value.length > 16) {
      return {
        isValid: false,
        message: "Password must be less than 16 characters",
      };
    }
    if (value === value.toLowerCase()) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase character.",
      };
    }
    if (!/\d/.test(value)) {
      return {
        isValid: false,
        message: "Password must contain at least one number.",
      };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return {
        isValid: false,
        message: "Password must contain at least one special character.",
      };
    }
    if (repeatValue !== undefined && repeatValue !== value) {
      return {
        isValid: false,
        message: "Passwords do not match",
      };
    }
    return {
      isValid: true,
      message: "",
    };
  },
};

export default formValidator;
