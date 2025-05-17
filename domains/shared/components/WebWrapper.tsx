import React from 'react';
import { View, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function WebWrapper({ children }: { children: React.ReactNode }) {
  const isWeb = Platform.OS === 'web';
  const theme = useTheme();

  if (!isWeb) return <>{children}</>;

  return (
    <View
      style={{
        maxWidth: 620,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: theme.colors.outline,
        display: "flex",
        flexDirection: "column",
      } as any}
    >
      {children}
    </View>
  );
}