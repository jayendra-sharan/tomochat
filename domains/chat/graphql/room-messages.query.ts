export const ROOM_MESSAGES = `
  query RoomMessages($input: RoomMessagesInput!) {
    roomMessages(input: $input) {
      name
      id
      userId
      messages {
        id
        content
        sender {
          id
          displayName
        }
        suggestion {
          isMessageOk
          original
          fixedMessage
          fixLogic
          translated
        }
        createdAt
      }
    }
  }
`;
