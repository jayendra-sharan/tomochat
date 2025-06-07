import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    name: "TomoChat",
    slug: "cw-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "tomochat",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    owner: "tomochat",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    notification: {
      icon: "./assets/images/notification-icon.png",
      color: "#000000",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tomochat.tomochat",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.tomochat.tomochat",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png",
    },
    plugins: ["expo-router", "expo-secure-store", "expo-notifications"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      ...config.extra,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      API_URL: process.env.API_URL,
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
      eas: {
        projectId: "502be1d7-6a97-45f8-9238-e0b7deda5968",
      },
    },
  };
};
