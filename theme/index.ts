import { MD3LightTheme as PaperLightTheme, MD3Theme } from "react-native-paper";

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
  buttonTokens: {
    borderRadius: number;
    primary: {
      background: string;
      text: string;
      pressed: {
        background: string;
      };
      disabled: {
        background: string;
        text: string;
      };
    };
    secondary: {
      border: string;
      text: string;
      pressed: {
        background: string;
      };
      disabled: {
        border: string;
        text: string;
      };
      paddingVertical: number;
      paddingHorizontal: number;
    };
    textLink: {
      color: string;
      pressedOpacity: number;
      disabled: string;
    };
    icon: {
      default: string;
      active: string;
      disabled: string;
      background: string;
      activeBackground: string;
    };
    menuLink: {
      color: string;
      fontWeight: string;
      pressed: string;
      disabled: string;
    };
  };
} = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,

    // ✅ Custom additions
    chatBubbleSelf: "#2E7BE0",
    chatBubbleOther: "#E0E0E0",
    suggestionBubble: "#A8E6CF",

    // Overrides
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
    ...PaperLightTheme.fonts,
  },
  fontSizes: {
    title: 16,
    body: 12,
    secondary: 11,
    small: 10,
  },
  buttonTokens: {
    borderRadius: 2,

    primary: {
      background: "#212121",
      text: "#ffffff",
      pressed: {
        background: "#3a3a3a",
      },
      disabled: {
        background: "#D1D5DB",
        text: "#6B7280",
      },
    },
    secondary: {
      border: "#212121",
      text: "#212121",
      pressed: {
        background: "#F3F4F6",
      },
      disabled: {
        border: "#D1D5DB",
        text: "#6B7280",
      },
      paddingVertical: 1,
      paddingHorizontal: 12,
    },

    textLink: {
      color: "#212121",
      pressedOpacity: 0.6,
      disabled: "#CBD5E1",
    },

    icon: {
      default: "#1E293B",
      active: "#7BB6EA",
      disabled: "#CBD5E1",
      background: "transparent",
      activeBackground: "#E0F2FE",
    },

    menuLink: {
      color: "#1E293B",
      fontWeight: "600",
      pressed: "#7BB6EA",
      disabled: "#CBD5E1",
    },
  },
};
