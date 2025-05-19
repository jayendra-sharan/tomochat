export const JOIN_ROOM = `
  mutation joinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      result
    }
  }
`;
