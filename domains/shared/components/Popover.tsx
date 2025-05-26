import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Platform,
} from "react-native";
import { Portal } from "react-native-paper";
import { WEB_APP_MAX_WIDTH } from "../constants";

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
        <View
          style={[
            StyleSheet.absoluteFill,
            Platform.OS === "web" && {
              maxWidth: WEB_APP_MAX_WIDTH,
              margin: "auto",
            },
          ]}
        >
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
