import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Portal } from "react-native-paper";

type Props = {
  visible: boolean;
  x?: number;
  y?: number;
  onClose: () => void;
  children: React.ReactNode;
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={StyleSheet.absoluteFill}>
          {/* @todo make it reusable by removing dependeicy on position */}
          <View style={{ position: "absolute", bottom: y, left: x, right: 0 }}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

export default Popover;
