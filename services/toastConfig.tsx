import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => <BaseToast {...props} />,
  error: (props: any) => <ErrorToast {...props} />,
  info: (props: any) => <BaseToast {...props} />,
};
