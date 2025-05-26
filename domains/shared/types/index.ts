export interface User {
  id: string;
  email: string;
  displayName: string;
}

type Member = {
  user: Pick<User, "displayName">;
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
