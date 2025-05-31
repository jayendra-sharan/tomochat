import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Password from "@/domains/auth/components/Password";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Password mode="default" title="Chage your password" />
    </View>
  );
};

export default ProfileScreen;
