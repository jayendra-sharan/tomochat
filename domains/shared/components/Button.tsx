import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type TomoButtonType = "primary" | "secondary" | "textLink" | "menuLink";

interface TomoButtonProps {
  type?: TomoButtonType;
  disabled?: boolean;
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
  contentStyle?: any;
  labelStyle?: any;
  loading?: boolean;
  icon?: IconSource;
}

export const Button: React.FC<TomoButtonProps> = ({
  type = "primary",
  disabled = false,
  onPress,
  children,
  style,
  contentStyle,
  labelStyle,
  loading,
  icon,
}) => {
  const theme = useAppTheme();
  const tokens = theme.buttonTokens;

  const getStyles = () => {
    switch (type) {
      case "textLink":
        return {
          mode: "text" as const,
          buttonStyle: {
            backgroundColor: "transparent",
          },
          contentStyle: {},
          labelStyle: {
            color: disabled ? tokens.textLink.disabled : tokens.textLink.color,
            textDecorationLine: "underline",
            opacity: disabled ? 0.6 : 1,
          },
        };

      case "menuLink":
        return {
          mode: "text" as const,
          buttonStyle: {
            backgroundColor: "transparent",
          },
          contentStyle: {},
          labelStyle: {
            color: disabled ? tokens.menuLink.disabled : tokens.menuLink.color,
            fontWeight: tokens.menuLink.fontWeight as any,
          },
        };

      case "secondary":
        return {
          mode: "outlined" as const,
          buttonStyle: {
            borderColor: disabled
              ? tokens.secondary.disabled.border
              : tokens.secondary.border,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderRadius: tokens.borderRadius,
          },
          contentStyle: {
            paddingVertical: tokens.secondary.paddingVertical ?? 1,
            paddingHorizontal: tokens.secondary.paddingHorizontal ?? 12,
          },
          labelStyle: {
            color: disabled
              ? tokens.secondary.disabled.text
              : tokens.secondary.text,
          },
        };

      case "primary":
      default:
        return {
          mode: "contained" as const,
          buttonStyle: {
            backgroundColor: disabled
              ? tokens.primary.disabled.background
              : tokens.primary.background,
            borderRadius: tokens.borderRadius,
          },
          contentStyle: {
            paddingVertical: 2,
            paddingHorizontal: 12,
          },
          labelStyle: {
            color: disabled
              ? tokens.primary.disabled.text
              : tokens.primary.text,
          },
        };
    }
  };

  const styles = getStyles();

  return (
    <PaperButton
      icon={icon}
      mode={styles.mode}
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonStyle, style]}
      contentStyle={[styles.contentStyle, contentStyle]}
      labelStyle={[styles.labelStyle, labelStyle]}
      loading={loading}
    >
      {children}
    </PaperButton>
  );
};
