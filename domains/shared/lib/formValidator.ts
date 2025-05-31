const formValidator = {
  password: (value: string, repeatValue?: string) => {
    if (value.length < 6) {
      return {
        result: false,
        message: "Password must be 6 characters long.",
      };
    }
    if (value.length > 16) {
      return {
        result: false,
        message: "Password must be less than 16 characters",
      };
    }
    if (value === value.toLowerCase()) {
      return {
        result: false,
        message: "Password must contain at least one uppercase character.",
      };
    }
    if (!/\d/.test(value)) {
      return {
        result: false,
        message: "Password must contain at least one number.",
      };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return {
        result: false,
        message: "Password must contain at least one special character.",
      };
    }
    if (repeatValue !== undefined && repeatValue !== value) {
      return {
        result: false,
        message: "Passwords do not match",
      };
    }
    return {
      result: true,
      message: "",
    };
  },
};

export default formValidator;
