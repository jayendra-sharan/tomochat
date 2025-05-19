export const GROUPS = `
  query Groups {
    groups {
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
