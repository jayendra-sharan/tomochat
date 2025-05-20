export const ROOMS = `
  query Rooms {
    rooms {
      id
      name
      topic
      inviteLink
      lastMessage
      members {
        user {
          displayName
        }
      }
    }
  }
`;
