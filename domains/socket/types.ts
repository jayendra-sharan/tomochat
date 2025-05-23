export interface StartTypingPayload {
  userId: string;
  roomId: string;
  displayName: string;
}

export interface StopTypingPayload extends StartTypingPayload {}
