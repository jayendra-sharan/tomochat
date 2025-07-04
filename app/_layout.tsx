import { StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import Head from "expo-router/head";
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
import * as Sentry from "@sentry/react-native";
import { usePushNotifications } from "@/domains/notification/hooks/usePushNotification";
import { useNotificationResponse } from "@/domains/notification/hooks/useNotificationResponse";
import { initSentry } from "@/services/logger/sentry";
import { configureNotificationHandler } from "@/domains/notification/lib/setNotificationHandler";
import { useEffect } from "react";

export default Sentry.wrap(function Layout() {
  return (
    <>
      <Head>
        <title>TomoChat | Learn languages, powered by friends</title>
        <meta
          name="description"
          content="Practice new languages through real chats with people you know"
        />
      </Head>
      <LinearGradient
        colors={["#ffffff", "#f1f5f9", "#e0f2fe"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <Provider store={store}>
          <InnerLayout />
        </Provider>
      </LinearGradient>
    </>
  );
});

function InnerLayout() {
  useEffect(() => {
    initSentry();
    configureNotificationHandler({
      alertEnabled: true,
      soundEnabled: true,
      badgeEnabled: true,
    });
  }, []);

  usePushNotifications();
  useNotificationResponse();

  return (
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
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
  },
});
