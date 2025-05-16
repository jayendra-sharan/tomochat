import { Image, View } from "react-native";
import TypingDots from "./TypingDots";

export default function LoadingScreen(){
  return (
    <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Image
        source={require("@/assets/images/logo.png")}
        width={64}
        height={64}
        style={{ marginBottom: 20 }}
      />
      <TypingDots count={6} />
    </View>
  )
}
