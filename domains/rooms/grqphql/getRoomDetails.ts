export const GET_ROOM_DETAILS = `
  query RoomDetail($input: GetRoomDetailsInput) {
    getRoomDetails(input:$input) {
      id
      name
      topic
      description
      roomType
      inviteLink
      lastMessage
      members {
        id
        role
        joinedAt
        user {
          id
          displayName
          email
        }
      }
      messageCount
    }
  }
`;
