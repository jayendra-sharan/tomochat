import * as Sentry from "@sentry/react-native";

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  debug: (msg: string, ctx?: Record<string, any>) => {
    console.debug("[debug]", msg, ctx);
  },

  info: (msg: string, ctx?: Record<string, any>) => {
    console.info("[info]", msg, ctx);
    // Optional: send to Sentry if you want metrics
  },

  warn: (msg: string, ctx?: Record<string, any>) => {
    console.warn("[warn]", msg, ctx);

    if (isProd) {
      Sentry.captureMessage(msg, {
        level: "warning",
        extra: ctx,
        tags: { kind: "handled" },
      });
    }
  },

  error: (err: unknown, ctx?: Record<string, any>) => {
    console.error("[error]", err, ctx);

    if (!isProd) return;

    if (err instanceof Error) {
      Sentry.captureException(err, { extra: ctx });
    } else {
      Sentry.captureMessage(String(err), {
        level: "error",
        extra: ctx,
        tags: { kind: "unstructured" },
      });
    }
  },
};
