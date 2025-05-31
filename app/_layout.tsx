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
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://383d0fde015a73ad11028242e8bd8c15@o4509419995594752.ingest.de.sentry.io/4509419996905552',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  integrations: [Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function Layout() {
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
});