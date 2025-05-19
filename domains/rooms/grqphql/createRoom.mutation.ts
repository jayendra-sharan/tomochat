export const CREATE_ROOM = `
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
