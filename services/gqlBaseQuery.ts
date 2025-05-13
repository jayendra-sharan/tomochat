import Constants from "expo-constants";
import { storage } from '@/services/storage';
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";

const GRAPHQL_ENDPOINT = Constants.expoConfig?.extra?.API_URL;

export async function gqlFetch<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const token = await storage.getItem('token');
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message || 'GraphQL Error');
  }

  return json;
}

export const gqlBaseQuery = (): BaseQueryFn<{ document: string; variables?: any }, unknown, unknown> =>
  async ({ document, variables }) => {
    try {
      const result = await gqlFetch(document, variables);
      if (result.error) return { error: result.error };
      return { data: result.data };
    } catch (error) {
      return { error };
    }
  };
