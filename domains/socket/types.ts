export interface StartTypingPayload {
  userId: string;
  groupId: string;
  displayName: string;
}

export interface StopTypingPayload extends StartTypingPayload {}
