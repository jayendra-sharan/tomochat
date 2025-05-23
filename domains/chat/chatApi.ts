import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ROOMS } from "./graphql/rooms.query";
import { RoomMessages, Room, SendMessageInput, SendMessageResponse, RoomMessageInput, CreateChatResponse, CreateChatRequest } from "./types";
import { ROOM_MESSAGES } from "./graphql/room-messages.query";
import { SEND_MESSAGE } from "./graphql/send-message.mutation";
import { CREATE_CHAT } from "./graphql/createChat.query";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    createChat: builder.mutation<CreateChatResponse, CreateChatRequest>({
      query: (input) => ({
        document: CREATE_CHAT,
        variables: { input }
      }),
      transformResponse: (res: any) => res.createRoom
    }),
    getRooms: builder.query<Room[], void>({
      query: () => ({
        document: ROOMS
      }),
      transformResponse: (res: any) => res.rooms,
    }),
    getRoomChats: builder.query<RoomMessages, RoomMessageInput>({
      query: (input) => ({
        document: ROOM_MESSAGES,
        variables: { input },
      }),
      transformResponse: (res: any) => res.roomMessages
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

export const { useGetRoomsQuery, useGetRoomChatsQuery, useSendMessageMutation, useCreateChatMutation } = chatApi;
