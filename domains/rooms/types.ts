import { Message } from "../chat/types";
import { Room } from "../shared/types";

export type CreateRoomRequest = {
  name: string;
  language: string;
};

export type JoinRoomRequest = {
  inviteLink: string;
};

export type CreateRoomResponse = {
  name: string;
  id: string;
  inviteLink: string;
};

export type JoinRoomResponse = {
  result: boolean;
};

export type RoomResponse = Room[];
