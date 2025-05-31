import * as Sentry from "@sentry/react-native";

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  debug: (...args: any[]) => {
    if (!isProd) return;
    console.debug("[debug]", ...args);
  },

  info: (...args: any[]) => {
    if (!isProd) return;
    console.info("[info]", ...args);
  },

  error: (error: any, context?: Record<string, any>) => {
    if (!isProd) return;
    console.error("[error]", error);

    // Capture exception with optional context
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: context });
    } else {
      Sentry.captureMessage(JSON.stringify(error), { extra: context });
    }
  },
};
