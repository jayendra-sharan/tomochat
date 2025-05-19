type User = {
  displayName: string;
};
type Member = {
  user: User;
};

export type Group = {
  id: string;
  name: string;
  topic: string;
  inviteLink: string;
  members: Member[];
  lastMessage: string;
};

export type Sender = {
  id: string;
  displayName: string;
};

export type Suggestion = {
  improved: string;
  english: string;
  issues: [string];
};

export type Message = {
  id: string;
  content: string;
  sender: Sender;
  suggestion: Suggestion | null;
  createdAt: string;
};

export type GroupMessageInput = {
  groupId: string;
};

export type GroupMessages = {
  name: string;
  id: string;
  userId: string;
  messages: Message[];
};

export type SendMessageInput = {
  groupId: string;
  content: string;
  isPrivate: boolean;
};

export type SendMessageResponse = {
  id: string;
  content: string;
  createdAt: string;
  suggestion: Suggestion;
  sender: Sender;
};

export type CreateChatRequest = {
  name: string;
  language: string;
};

export type CreateChatResponse = {
  name: string;
  id: string;
  inviteLink: string;
};
