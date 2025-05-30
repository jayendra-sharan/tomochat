import { createApi } from "@reduxjs/toolkit/query/react";
import { gqlBaseQuery } from "@/services/gqlBaseQuery";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  JoinRoomResponse,
  JoinRoomRequest,
  RoomResponse,
  GetRoomDetailsResponse,
  GetRoomDetailsInput,
  AddMembersToRoomResponse,
  AddMembersToRoomInput,
} from "./types";
import { CREATE_ROOM } from "./grqphql/createRoom.mutation";
import { JOIN_ROOM } from "./grqphql/joinRoom.mutation";
import { ROOMS } from "./grqphql/rooms.query";
import { GET_ROOM_DETAILS } from "./grqphql/getRoomDetails";
import { ADD_MEMBERS_TO_ROOM } from "./grqphql/addMembersToRoom.query";

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
    getRoomDetails: builder.query<GetRoomDetailsResponse, GetRoomDetailsInput>({
      query: (input) => ({
        document: GET_ROOM_DETAILS,
        variables: { input },
      }),
      transformResponse: (res: any) => res.getRoomDetails,
      transformErrorResponse: (error: any) => error,
    }),
    addMembersToRoom: builder.mutation<
      AddMembersToRoomResponse,
      AddMembersToRoomInput
    >({
      query: (input) => ({
        document: ADD_MEMBERS_TO_ROOM,
        variables: { input },
      }),
      transformResponse: (res: any) => res.addMembersToRoom,
      transformErrorResponse: (error: any) => error,
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useGetRoomsQuery,
  useGetRoomDetailsQuery,
  useAddMembersToRoomMutation,
} = roomsApi;
