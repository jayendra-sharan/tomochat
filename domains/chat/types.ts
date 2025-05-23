type User = {
  displayName: string;
};
type Member = {
  user: User;
};

export type Room= {
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
  original: string;
};

export type Message = {
  id: string;
  content: string;
  sender: Sender;
  suggestion: Suggestion | null;
  createdAt: string;
};

export type RoomMessageInput = {
  roomId: string;
};

export type RoomMessages = {
  name: string;
  id: string;
  userId: string;
  messages: Message[];
};

export type SendMessageInput = {
  roomId: string;
  content: string;
  isPrivate: boolean;
  displayName: string;
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
