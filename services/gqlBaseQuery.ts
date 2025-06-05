import Constants from "expo-constants";
import { storage } from "@/services/storage";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { logger } from "./logger";
import { useAuth } from "@/domains/auth/hooks/useAuth";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;
console.log("DEBUG ---- API END POINT", API_URL);

export async function gqlFetch(query: string, variables?: Record<string, any>) {
  const token = await storage.getItem("token");
  // @todo revert
  console.log("AUTH TOKEN - ", token);
  // @todo revert
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
    logger.error(result.errors[0]);
    throw new Error(result.errors[0].message || "GraphQL error");
  }

  return {
    data: result.data,
  };
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
      const result = await gqlFetch(document, variables);

      return { data: result.data as ResultType };
    } catch (error: any) {
      return {
        error: {
          name: error?.name || "NetworkError",
          message: error?.message || "Unknown error occurred",
        } as APIError,
      };
    }
  };
