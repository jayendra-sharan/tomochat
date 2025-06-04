import { Room } from "../shared/types";

export type CreateRoomRequest = {
  name: string;
  language: string;
  userDisplayName: string;
  description: string;
};

export type JoinRoomRequest = {
  inviteLink: string;
};

export type CreateRoomResponse = Room;

export type JoinRoomResponse = {
  result: boolean;
};

export type RoomResponse = Room[];

export type GetRoomDetailsInput = {
  roomId: string;
};

export interface GetRoomDetailsResponse extends Room {
  messageCount: number;
  createdAt: string;
}

export interface AddMembersToRoomInput {
  roomId: string;
  memberIds: string[];
}

export type AddMembersToRoomResponse = Room;

export type DeleteMessagesInput = {
  roomId: string;
};

export type LeaveRoomInput = {
  roomId: string;
};

export type MakeUserAdminInput = {
  roomId: string;
  memberId: string;
};

export type DeleteRoomInput = {
  roomId: string;
};
