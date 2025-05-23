type User = {
  displayName: string;
};
type Member = {
  user: User;
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
