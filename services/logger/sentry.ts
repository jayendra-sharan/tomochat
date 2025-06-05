import * as Sentry from "@sentry/react-native";

console.log("DEBUG ---- ENVIRONMENT", process.env.NODE_ENV);

export const initSentry = () => {
  Sentry.init({
    dsn: "https://383d0fde015a73ad11028242e8bd8c15@o4509419995594752.ingest.de.sentry.io/4509419996905552",
    enableNative: false,
    tracesSampleRate: 1.0,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 10000,
    environment: process.env.NODE_ENV || "development",
    enabled: process.env.NODE_ENV === "production",
  });
};

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
