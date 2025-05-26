import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Button as RNPButton,
  ButtonProps as RNPButtonProps,
  Text,
} from "react-native-paper";

interface ButtonProps extends Omit<RNPButtonProps, "theme"> {
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  mode,
  style,
  ...props
}) => {
  const theme = useAppTheme();
  const backgroundColor = disabled ? "lightgrey" : theme.colors.onSurface;
  const textColor = mode !== "text" ? "#ffffff" : theme.colors.onSurface;
  const isTextMode = mode === "text";
  return (
    <RNPButton
      disabled={disabled}
      mode={mode}
      style={[
        {
          borderRadius: 2,
        },
        !isTextMode && { backgroundColor },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: textColor,
          fontWeight: "bold",
          fontSize: 16,
          padding: 4,
        }}
      >
        {children}
      </Text>
    </RNPButton>
  );
};
