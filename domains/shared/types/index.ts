export interface User {
  id: string;
  email: string;
  displayName: string;
}

export type Member = {
  user: Pick<User, "displayName" | "id">;
};

export type Room = {
  id: string;
  name: string;
  topic: string;
  inviteLink: string;
  members: Member[];
  lastMessage: string;
  isUnread: boolean;
};
