import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
