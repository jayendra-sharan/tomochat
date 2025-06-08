import React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === "android" ? 20 : 0 }}
        edges={["top", "bottom", "left", "right"]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
