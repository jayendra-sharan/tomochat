export const GROUP_MESSAGES = `
  query GroupMessages($groupId: ID!) {
    groupMessages(groupId: $groupId) {
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
          improved
          english
          issues
        }
        createdAt
      }
    }
  }
`
