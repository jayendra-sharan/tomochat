import * as Sentry from "@sentry/react-native";

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  debug: (...args: any[]) => {
    console.debug("[debug]", ...args);
  },

  info: (...args: any[]) => {
    console.info("[info]", ...args);
  },

  // @todo add type to context
  error: (error: any, context?: Record<string, any>) => {
    console.error("[error]", error, context);

    const { pathname = "", gqlPath = [] } = context || {};

    if (pathname === "/login" && gqlPath.includes("me")) return;

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
