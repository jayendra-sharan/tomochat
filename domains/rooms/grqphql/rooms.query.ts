export const ROOMS = `
  query Rooms {
    rooms {
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
