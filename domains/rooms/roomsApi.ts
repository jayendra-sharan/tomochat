import { createApi } from "@reduxjs/toolkit/query/react";
import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  JoinRoomResponse,
  JoinRoomRequest,
  RoomResponse,
} from "./types";
import { CREATE_ROOM } from "./grqphql/createRoom.mutation";
import { JOIN_ROOM } from "./grqphql/joinRoom.mutation";
import { ROOMS } from "./grqphql/rooms.query";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: gqlBaseQuery(),
  endpoints: (builder) => ({
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: (input) => ({
        document: CREATE_ROOM,
        variables: { input },
      }),
      // @todo add types in res
      transformResponse: (res: any) => res.createRoom,
    }),
    getRooms: builder.query<RoomResponse, void>({
      query: () => ({
        document: ROOMS,
      }),
      transformResponse: (res: any) => res.rooms,
    }),
    joinRoom: builder.mutation<JoinRoomResponse, JoinRoomRequest>({
      query: (input) => ({
        document: JOIN_ROOM,
        variables: { input },
      }),
      transformResponse: (res: any) => res.joinRoom,
    }),
  }),
});

export const { useCreateRoomMutation, useJoinRoomMutation, useGetRoomsQuery } =
  roomsApi;
