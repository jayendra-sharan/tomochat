import { TextInputProps as PaperTextInputProps } from "react-native-paper";

export type FormTextInputProps = {
  label: string;
  errorMessage: string;
} & PaperTextInputProps;
