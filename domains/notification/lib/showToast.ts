import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export function showToast(type: ToastType, title: string, message?: string) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 50,
  });
}
