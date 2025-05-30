import { useAppTheme } from "@/hooks/useAppTheme";
import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, Text } from "react-native-paper";
import { FormTextInputProps } from "./types";
import type { TextInput as RNTextInput } from "react-native";

const TextInput = forwardRef<RNTextInput, FormTextInputProps>(
  ({ label, fieldType, errorMessage, ...rest }, ref) => {
    const theme = useAppTheme();
    let keyboardProps = {};
    if (fieldType === "email") {
      keyboardProps = {
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoComplete: "email",
        textContentType: "emailAddress",
      };
    }

    return (
      <View style={styles.wrapper}>
        <PaperTextInput
          ref={ref}
          label={label}
          error={!!errorMessage}
          style={styles.input}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
          activeUnderlineColor={theme.colors.onSurface}
          {...keyboardProps}
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
  }
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderRadius: 2,
    marginBottom: 4,
    fontSize: 16,
  },
  errorWrapper: {
    minHeight: 14,
    justifyContent: "flex-start",
  },
  errorText: {
    fontSize: 12,
    lineHeight: 12,
    paddingLeft: 16,
  },
});

export default TextInput;
