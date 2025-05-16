import { useLocalSearchParams } from "expo-router";

export function useSingleQueryParam(key: string): string | undefined {
  const params = useLocalSearchParams();

  const value = params[key];

  if (Array.isArray(value)) {
    return value[0]
  }

  return typeof value === "string" ? value : undefined;
}
