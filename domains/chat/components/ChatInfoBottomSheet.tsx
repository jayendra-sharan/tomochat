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
    >
      <View style={styles.container}>{children}</View>
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
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: height * 0.15,
  },
});

export default ChatInfoBottomSheet;
