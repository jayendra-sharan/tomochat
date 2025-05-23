import { View } from "react-native";

export function UnreadIndicator() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <View
        style={{
          backgroundColor: "grey",
          width: 12,
          height: 12,
          borderRadius: 12,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2, // Android
        }}
      ></View>
    </View>
  );
}
