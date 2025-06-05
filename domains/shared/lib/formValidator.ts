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
        message: "Password must be 8 characters long.",
      };
    }
    if (value.length > 64) {
      return {
        isValid: false,
        message: "Password must be less than 64 characters",
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
