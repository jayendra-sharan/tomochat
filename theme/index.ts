import { MD3LightTheme as PaperLightTheme, MD3Theme } from 'react-native-paper';

// 👇 Extend the built-in theme with custom colors
export const TomoTheme: MD3Theme & {
  colors: MD3Theme['colors'] & {
    chatBubbleSelf: string;
    chatBubbleOther: string;
    suggestionBubble: string;
  };
} = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,

    // ✅ Custom additions
    chatBubbleSelf: '#4FC3F7',
    chatBubbleOther: '#E0E0E0', // or try '#D6D6D6' for more contrast
    suggestionBubble: '#A8E6CF',

    // Override Paper tokens (optional)
    primary: '#4FC3F7',
    onPrimary: '#0D0D0D',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    onSurface: '#212121',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#757575',
    outline: '#E0E0E0',
  },
  fonts: {
    ...PaperLightTheme.fonts, // use default fonts; you can override later
  },
  roundness: 8,
};