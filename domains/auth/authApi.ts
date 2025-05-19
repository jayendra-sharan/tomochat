import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginInput,
  LoginResponse,
  RegisterUserInput,
  RegisterUserResponse,
  User,
} from "./types";
import { ME } from "./graphql/me.query";
import { LOGIN_MUTATION } from "./graphql/login.mutation";
import { CREATE_USER } from "./graphql/createUser.mutation";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        document: ME,
      }),
      transformResponse: (res: any) => res.me,
    }),
    login: builder.mutation<LoginResponse, LoginInput>({
      query: (input) => ({
        document: LOGIN_MUTATION,
        variables: { input },
      }),
      transformResponse: (res: any) => res.login,
      transformErrorResponse: (error: any) => error,
    }),
    register: builder.mutation<RegisterUserResponse, RegisterUserInput>({
      query: (input) => ({
        document: CREATE_USER,
        variables: { input },
      }),
      transformResponse: (res: any) => res.createUser,
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLazyGetMeQuery,
  useRegisterMutation,
} = authApi;
