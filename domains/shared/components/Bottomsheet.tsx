import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const { height } = Dimensions.get("window");

const ChatInfoBottomSheet: React.FC<Props> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.3}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriverForBackdrop
      avoidKeyboard
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["#ffffff", "#f1f5f9", "#e0f2fe"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        >
          {children}
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    minHeight: height * 0.35,
  },
});

export default ChatInfoBottomSheet;
