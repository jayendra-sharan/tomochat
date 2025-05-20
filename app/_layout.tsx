import { Platform, View } from "react-native";
import { Slot } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { TomoTheme } from "@/theme";
import { Header } from "@/domains/shared/components/Header";
import WebWrapper from "../domains/shared/components/WebWrapper";
import FeatureProvider from "@/redux/FeatureProvider";
import AppWrapper from "@/domains/shared/components/AppWrapper";

export default function Layout() {
  const Wraper = Platform.OS === "web" ? WebWrapper : AppWrapper;
  return (
    <Provider store={store}>
      <FeatureProvider>
        <PaperProvider theme={TomoTheme}>
          <Wraper>
            {Platform.OS === "web" && <Header />}
            <View style={{ flex: 1 }}>
              <Slot />
            </View>
          </Wraper>
        </PaperProvider>
      </FeatureProvider>
    </Provider>
  );
}
