import { View } from "react-native";
import { Slot } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import { store } from "@/redux/store";
import { TomoTheme } from "@/theme";
import WebWrapper from "../domains/shared/components/WebWrapper";
import FeatureProvider from "@/redux/FeatureProvider";
import { SocketProvider } from "@/domains/socket/SocketProvider";
import SafeAreaWrapper from "@/domains/shared/components/SafeAreaWrapper";
import { toastConfig } from "@/services/toastConfig";

export default function Layout() {
  return (
    <Provider store={store}>
      <FeatureProvider>
        <PaperProvider theme={TomoTheme}>
          <SocketProvider>
            <WebWrapper>
              <SafeAreaWrapper>
                <View style={{ flex: 1 }}>
                  <Slot />
                </View>
              </SafeAreaWrapper>
              <Toast config={toastConfig} />
            </WebWrapper>
          </SocketProvider>
        </PaperProvider>
      </FeatureProvider>
    </Provider>
  );
}
