import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterPushTokenInput } from "./types";
import { REGISTER_PUSH_TOKEN } from "./graphql/registerPushToken.mutation";

export const notificationApi = createApi({
  reducerPath: "notification",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    registerPushToken: builder.mutation<boolean, RegisterPushTokenInput>({
      query: (input) => ({
        document: REGISTER_PUSH_TOKEN,
        variables: { input },
      }),
      transformResponse: (res: any) => res.registerPushToken,
      transformErrorResponse: (error: any) => error,
    }),
  }),
});

export const { useRegisterPushTokenMutation } = notificationApi;
