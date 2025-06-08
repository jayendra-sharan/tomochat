import React from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Pressable,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Portal } from "react-native-paper";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000050",
  },
  centeredWeb: {
    maxWidth: 768,
    marginHorizontal: "auto",
  },
  sheetContainer: {
    maxHeight: "80%",
  },
});

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  x?: number;
  y?: number;
};

const Popover: React.FC<Props> = ({
  visible,
  onClose,
  children,
  x = 0,
  y = 0,
}) => {
  if (!visible) return null;

  return (
    <Portal>
      <Pressable
        style={[styles.overlay, Platform.OS === "web" && styles.centeredWeb]}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View
          style={[styles.overlay, Platform.OS === "web" && styles.centeredWeb]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <Pressable style={styles.sheetContainer} onPress={() => {}}>
              {children}
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </Portal>
  );
};

export default Popover;
