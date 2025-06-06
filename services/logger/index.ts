import * as Sentry from "@sentry/react-native";

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  debug: (...args: any[]) => {
    console.debug("[debug]", ...args);
  },

  info: (...args: any[]) => {
    console.info("[info]", ...args);
  },

  error: (error: any, context?: Record<string, any>) => {
    console.error("[error]", error);
    const { source = "", path = [] } = context || {};
    if (path.includes("me") && source === "/login") {
      return;
    }
    // Capture exception with optional context
    if (isProd) {
      if (error instanceof Error) {
        Sentry.captureException(error, { extra: context });
      } else {
        Sentry.captureMessage(JSON.stringify(error), { extra: context });
      }
    }
  },
};
