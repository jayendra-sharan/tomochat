import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { GROUPS } from "./graphql/groups.query";
import { GroupMessages, Group, SendMessageInput, SendMessageResponse, GroupMessageInput, CreateChatResponse, CreateChatRequest } from "./types";
import { GROUP_MESSAGES } from "./graphql/group-messages.query";
import { SEND_MESSAGE } from "./graphql/send-message.mutation";
import { CREATE_CHAT } from "./graphql/createChat.query";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    createChat: builder.query<CreateChatResponse, CreateChatRequest>({
      query: (input) => ({
        document: CREATE_CHAT,
        variables: { input }
      }),
    }),
    getGroups: builder.query<Group[], void>({
      query: () => ({
        document: GROUPS
      }),
      transformResponse: (res: any) => res.groups,
    }),
    getGroupChats: builder.query<GroupMessages, GroupMessageInput>({
      query: (input) => ({
        document: GROUP_MESSAGES,
        variables: { input },
      }),
      transformResponse: (res: any) => res.groupMessages
    }),
    sendMessage: builder.mutation<SendMessageResponse, SendMessageInput>({
      query: (input) => ({
        document: SEND_MESSAGE,
        variables: { input },
      }),
      transformResponse: (res: any) => res.sendMessage
    })
  })
})

export const { useGetGroupsQuery, useGetGroupChatsQuery, useSendMessageMutation } = chatApi;
