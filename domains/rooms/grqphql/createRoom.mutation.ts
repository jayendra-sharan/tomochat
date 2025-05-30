export const CREATE_ROOM = `
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input:$input) {
      id
      name
      topic
      inviteLink
      lastMessage
      isUnread
      members {
        user { 
          displayName
        }
      }
    }
  }
`;
