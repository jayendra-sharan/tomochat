export const ROOMS = `
  query Rooms {
    rooms {
      id
      name
      topic
      lastMessage
      members {
        user {
          displayName
        }
      }
    }
  }
`;
