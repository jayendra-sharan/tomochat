import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { GET_USER_CONNECTIONS } from "./graphql/getUserConnections.query";
import { GetUserConnectionsResponse } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    getUserConnections: builder.query<GetUserConnectionsResponse, void>({
      query: () => ({
        document: GET_USER_CONNECTIONS,
      }),
      transformResponse: (res: any) => res.getUserConnections,
      transformErrorResponse: (error: any) => error,
    }),
  }),
});

export const { useGetUserConnectionsQuery } = userApi;
