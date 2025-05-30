import { MD3LightTheme as PaperLightTheme, MD3Theme } from "react-native-paper";

// 👇 Extend the built-in theme with custom colors
export const TomoTheme: MD3Theme & {
  colors: MD3Theme["colors"] & {
    chatBubbleSelf: string;
    chatBubbleOther: string;
    suggestionBubble: string;
  };
  fontSizes: {
    title: number;
    body: number;
    secondary: number;
    small: number;
  };
} = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,

    // ✅ Custom additions
    chatBubbleSelf: "#2E7BE0",
    chatBubbleOther: "#E0E0E0", // or try '#D6D6D6' for more contrast
    suggestionBubble: "#A8E6CF",

    // Override Paper tokens (optional)
    primary: "#2E7BE0",
    onPrimary: "#FFFFFF",
    background: "#F2F2F2",
    surface: "#FFFFFF",
    onSurface: "#212121",
    surfaceVariant: "#F5F5F5",
    onSurfaceVariant: "#757575",
    outline: "#E0E0E0",
  },
  fonts: {
    ...PaperLightTheme.fonts, // use default fonts; you can override later
  },
  fontSizes: {
    title: 16,
    body: 12,
    secondary: 11,
    small: 10,
  },
  roundness: 8,
};
