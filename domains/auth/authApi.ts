import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginInput,
  LoginResponse,
  RegisterUserInput,
  RegisterUserResponse,
  RequestEmailVerificationInput,
  User,
  VerifyEmailCodeInput,
} from "./types";
import { ME } from "./graphql/me.query";
import { LOGIN_MUTATION } from "./graphql/login.mutation";
import { CREATE_USER } from "./graphql/createUser.mutation";
import { SEND_VERIFICATION_CODE } from "./graphql/sendVerificationCode";
import { VERIFY_EMAIL_CODE } from "./graphql/verifyEmailCode.mutation";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        document: ME,
      }),
      transformResponse: (res: any) => res.me,
      transformErrorResponse: (error: any) => error,
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
      transformErrorResponse: (error: any) => error,
    }),
    sendVerificationCode: builder.mutation<
      boolean,
      RequestEmailVerificationInput
    >({
      query: (input) => ({
        document: SEND_VERIFICATION_CODE,
        variables: { input },
      }),
      transformResponse: (res: any) => res.requestEmailVerification,
      transformErrorResponse: (error: any) => error,
    }),
    verfiyEmailCode: builder.mutation<LoginResponse, VerifyEmailCodeInput>({
      query: (input) => ({
        document: VERIFY_EMAIL_CODE,
        variables: { input },
      }),
      transformResponse: (res: any) => res.verifyEmailCode,
      transformErrorResponse: (error: any) => error,
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLazyGetMeQuery,
  useRegisterMutation,
  useSendVerificationCodeMutation,
  useVerfiyEmailCodeMutation,
} = authApi;
