export interface ClientToServerEvents {
  start_typing: (payload: { userId: string; roomId: string, displayName: string }) => void;
  stop_typing: (payload: { userId: string; roomId: string, displayName: string }) => void;
  join_room: (payload: { roomId: string, userId: string }) => void;
  leave_room: (payload: { roomId: string, userId: string }) => void;
  // send_message: (payload: { groupId: string; content: string; userId: string }) => void;
}

export interface ServerToClientEvents {
  typing_started: (payload: { userId: string; roomId: string, displayName: string }) => void;
  typing_stopped: (payload: { userId: string; roomId: string, displayName: string }) => void;
  // new_message: (payload: {
  //   id: string;
  //   groupId: string;
  //   content: string;
  //   userId: string;
  //   createdAt: string;
  // }) => void;
}
