import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginInput, LoginResponse, User } from "./types";
import { ME } from "./graphql/me.query";
import { LOGIN_MUTATION } from "./graphql/login.mutation";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: gqlBaseQuery(),
  tagTypes: ['Me'],
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        document: ME,
      }),
      transformResponse: (res: any) => res.me,
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginResponse, LoginInput>({
      query: (input) => ({
        document: LOGIN_MUTATION,
        variables: { input },
      }),
      transformResponse: (res: any) => res.login,
      invalidatesTags: ['Me'],
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation } = authApi;
