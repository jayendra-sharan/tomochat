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
  mode = "contained",
  style,
  ...props
}) => {
  const theme = useAppTheme();
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "#e0e0e0";
  if (mode === "contained") {
    backgroundColor = disabled
      ? theme.colors.onSurfaceDisabled
      : theme.colors.onSurface;
    textColor = theme.colors.surface;
    borderColor = theme.colors.onSurface;
  }
  if (mode === "outlined") {
    borderColor = theme.colors.onSurface;
  }
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
        { borderColor },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: textColor,
          fontWeight: "400",
          fontSize: 16,
          paddingHorizontal: 4,
          paddingVertical: 2,
        }}
      >
        {children}
      </Text>
    </RNPButton>
  );
};
