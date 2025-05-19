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
        flex: 1,
        maxWidth: 620,
        width: '100%',
        marginHorizontal: 'auto',
        backgroundColor: theme.colors.background,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: theme.colors.outline,
      }}
    >
      {children}
    </View>
  );
}