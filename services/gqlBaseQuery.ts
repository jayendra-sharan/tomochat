import Constants from "expo-constants";
import { storage } from "@/services/storage";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { logger } from "./logger";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

export async function gqlFetch(query: string, variables?: Record<string, any>) {
  const token = await storage.getItem("token");
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await res.json();

  if (result.errors?.length) {
    const primary = result.errors[0];

    logger.error(primary, {
      gqlPath: primary.path,
      code: primary.extensions?.code,
    });

    return {
      data: result.data,
      error: {
        name: primary.extensions?.code || "GraphQLError",
        message: primary.message,
      },
    };
  }
  return { data: result.data, error: null };
}

export type APIError = {
  message: string;
  name: string;
};

export const gqlBaseQuery =
  <ResultType = unknown>(): BaseQueryFn<
    { document: string; variables?: any },
    ResultType,
    APIError
  > =>
  async ({ document, variables }) => {
    try {
      const { data, error } = await gqlFetch(document, variables);
      if (error) {
        return { error };
      }
      return { data: data as ResultType };
    } catch (error: any) {
      logger.error(error);
      return {
        error: {
          name: error?.name || "NetworkError",
          message: error?.message || "Unknown error occurred",
        } as APIError,
      };
    }
  };
