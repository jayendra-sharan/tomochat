export const ROOMS = `
  query Rooms {
    rooms {
      id
      name
      topic
      inviteLink
      lastMessage
      lastMessageAt
      isUnread
      members {
        user {
          displayName
        }
      }
    }
  }
`;
