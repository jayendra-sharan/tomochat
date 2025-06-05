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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.tomochat.tomochat",
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
      API_URL: process.env.API_URL,
      eas: {
        projectId: "502be1d7-6a97-45f8-9238-e0b7deda5968",
      },
    },
  };
};
