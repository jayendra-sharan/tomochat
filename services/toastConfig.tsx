import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text2Style={{ fontSize: 14 }}
      text1Style={{ marginBottom: 6 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text2Style={{ fontSize: 14, color: "red" }}
      text1Style={{ marginBottom: 12 }}
    />
  ),
  info: (props: any) => <BaseToast {...props} />,
};
