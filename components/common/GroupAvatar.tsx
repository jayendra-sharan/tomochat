import { View } from "react-native";
import { Text } from "react-native-paper";

export default function GroupAvatar({ groupName }: {groupName: string}) {
  return (
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 64,
        backgroundColor: "#f4f5f6",
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text style={{ color: "#333", fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>
          {groupName.charAt(0).toUpperCase()}
        </Text>
      </View>
  )
}

