import { APIError } from "./gqlBaseQuery";

export function createGqlEndpoint<
  RequestType,
  ResponseType,
  RawResponse extends Record<string, any>
>(operation: keyof RawResponse, document: string) {
  return {
    query: (input?: RequestType) => ({
      document,
      variables: input ? { input } : undefined,
    }),
    transformResponse: (res: RawResponse): ResponseType =>
      res[operation] as ResponseType,
  };
}
