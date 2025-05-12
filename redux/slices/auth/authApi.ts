import { gqlBaseQuery } from "@/graphql/client";
import { ME } from "@/graphql/queries";
import { createApi } from '@reduxjs/toolkit/query/react';

type MeResponse = {
  id: string,
  displayName: string,
  email: string,
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: gqlBaseQuery(),
  tagTypes: ['Me'],
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        document: ME,
      }),
      transformResponse: (response: any) => response.me,
    }),
  }),
});

export const { useGetMeQuery } = authApi;
