import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AppWrapper = ({ children }) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};

export default AppWrapper;
