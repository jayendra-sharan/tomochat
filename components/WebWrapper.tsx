import React from 'react';
import { View, Platform } from 'react-native';

export default function WebWrapper({ children }: { children: React.ReactNode }) {
  const isWeb = Platform.OS === 'web';

  if (!isWeb) return <>{children}</>;

  return (
    <View
      style={{
        maxWidth: 620,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
        display: "flex",
        flexDirection: "column"
      } as any}
    >
      {children}
    </View>
  );
}
