import * as Sentry from "@sentry/react-native";

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
