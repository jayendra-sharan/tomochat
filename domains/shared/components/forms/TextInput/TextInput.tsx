import { useAppTheme } from "@/hooks/useAppTheme";
import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, Text } from "react-native-paper";
import { FormTextInputProps } from "./types";
import { TextInputProps as PaperTextInputProps } from "react-native-paper";

const TextInput = forwardRef<PaperTextInputProps, FormTextInputProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    const theme = useAppTheme();

    return (
      <View style={styles.wrapper}>
        <PaperTextInput
          label={label}
          error={!!errorMessage}
          style={styles.input}
          {...rest}
        />
        <View style={styles.errorWrapper}>
          {!!errorMessage && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {errorMessage}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 4,
    fontSize: 16,
  },
  errorWrapper: {
    minHeight: 14,
    justifyContent: "flex-start",
  },
  errorText: {
    fontSize: 11,
    lineHeight: 11,
    paddingLeft: 16,
  },
});

export default TextInput;
