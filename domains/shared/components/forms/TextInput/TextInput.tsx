import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, Text } from "react-native-paper";

export default function TextInput({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  autoCapitalize = "none",
}: FormTextInputProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
      <View style={styles.errorWrapper}>
        {!!error && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 4,
    fontSize: 13,
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
