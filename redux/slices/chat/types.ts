interface Sender {
  id: string;
  displayName: string;
}

interface MessageSuggestion {
  improved: string;
  english: string;
  issues: [string]
}

export interface Message {
  id: string;
  content: string;
  sender: Sender;
  suggestion: MessageSuggestion;
  createdAt: string;
}

export interface ActiveChat {
  name: string;
  id: string;
  userId: string;
  messages: Message[];
  privateMode?: boolean;
}

export interface ChatState {
  loading: boolean;
  error?: string;
  groups: any;
  activeChat: ActiveChat;
  sendingMessage: boolean;
  sendMessageError?: string;
}

// action payload types
export type SendMessagePayload = {
  content: string;
}

