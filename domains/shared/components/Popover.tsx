import React from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
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
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={120}
            style={{
              position: "absolute",
              bottom: y,
              left: x,
              right: 0,
              maxHeight: "80%",
              width: "100%",
            }}
          >
            <Pressable
              style={{
                bottom: y,
                left: x,
                right: 0,
                width: "100%",
              }}
              onPress={() => {}}
            >
              {children}
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </Portal>
  );
};

export default Popover;
