export interface User {
  id: string;
  email: string;
  displayName: string;
}

export type Member = {
  id: string;
  joinedAt: string;
  role: string;
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
  description?: string;
  lastMessageAt?: string;
};
