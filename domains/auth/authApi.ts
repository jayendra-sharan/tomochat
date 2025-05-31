import { APIError, gqlBaseQuery } from "@/services/gqlBaseQuery";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import {
  ChangePasswordInput,
  LoginInput,
  LoginResponse,
  RecoverPasswordInput,
  RegisterUserInput,
  RegisterUserResponse,
  RequestEmailVerificationInput,
  RequestPasswordResetInput,
  User,
  VerifyEmailCodeInput,
} from "./types";
import { ME } from "./graphql/me.query";
import { LOGIN_MUTATION } from "./graphql/login.mutation";
import { CREATE_USER } from "./graphql/createUser.mutation";
import { SEND_VERIFICATION_CODE } from "./graphql/sendVerificationCode";
import { VERIFY_EMAIL_CODE } from "./graphql/verifyEmailCode.mutation";
import { CHANGE_PASSWORD_MUTATION } from "./graphql/changePassword.mutation";
import { RECOVER_PASSWORD_MUTATION } from "./graphql/recoverPassword.mutation";
import { REQUEST_PASSWORD_RESET_MUTATION } from "./graphql/requestPasswordReset.mutation";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: gqlBaseQuery() as BaseQueryFn<
    { document: string; variables?: any },
    unknown,
    APIError
  >,
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
    changePassword: builder.mutation<Boolean, ChangePasswordInput>({
      query: (input) => ({
        document: CHANGE_PASSWORD_MUTATION,
        variables: { input },
      }),
      transformResponse: (res: { changePassword: boolean }) =>
        res.changePassword,
      transformErrorResponse: (error: APIError) => error,
    }),
    requestPasswordReset: builder.mutation<Boolean, RequestPasswordResetInput>({
      query: (input) => ({
        document: REQUEST_PASSWORD_RESET_MUTATION,
        variables: { input },
      }),
      transformResponse: (res: { requestPasswordReset: boolean }) =>
        res.requestPasswordReset,
      transformErrorResponse: (error: APIError) => error,
    }),
    recoverPassword: builder.mutation<Boolean, RecoverPasswordInput>({
      query: (input) => ({
        document: RECOVER_PASSWORD_MUTATION,
        variables: { input },
      }),
      transformResponse: (res: { recoverPassword: boolean }) =>
        res.recoverPassword,
      transformErrorResponse: (error: APIError) => error,
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
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useRequestPasswordResetMutation,
} = authApi;
