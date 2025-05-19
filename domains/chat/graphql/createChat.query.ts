export const CREATE_CHAT = `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input:$input) {
      name
      inviteLink
      id
      topic
      members {
        id
      }
    }
  }
`;
