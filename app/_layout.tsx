import { StyleSheet, View } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
// import * as Sentry from "@sentry/react-native";

// Sentry.init({
//   dsn: "https://383d0fde015a73ad11028242e8bd8c15@o4509419995594752.ingest.de.sentry.io/4509419996905552",

//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,
//   integrations: [Sentry.feedbackIntegration()],
//   enabled: process.env.NODE_ENV === "production",
//   enableNative: true,
//   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
//   // spotlight: __DEV__,
// });

// export default Sentry.wrap(

export default function Layout() {
  return (
    <LinearGradient
      colors={["#ffffff", "#f1f5f9", "#e0f2fe"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <Provider store={store}>
        <FeatureProvider>
          <PaperProvider theme={TomoTheme}>
            <SocketProvider>
              <WebWrapper>
                <SafeAreaWrapper>
                  <View style={styles.appWrapper}>
                    <Slot />
                  </View>
                </SafeAreaWrapper>
                <Toast config={toastConfig} />
              </WebWrapper>
            </SocketProvider>
          </PaperProvider>
        </FeatureProvider>
      </Provider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    // backgroundColor: "#fdfdfd",
  },
});
