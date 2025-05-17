import { useTheme } from 'react-native-paper';
import { TomoTheme } from '@/theme';

export const useAppTheme = () => useTheme<typeof TomoTheme>();
