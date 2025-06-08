import { Link } from "expo-router";
import React from "react";
import { View, Image } from "react-native";

type HeaderProps = {
  title?: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        paddingHorizontal: 16,
        paddingVertical: 2,
        // backgroundColor: "#fafafa",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
      }}
    >
      <Link href="/">
        <Image
          source={require("@/assets/images/logo_full.png")}
          style={{ width: 100 }}
          resizeMode="contain"
        />
      </Link>
    </View>
  );
};
