export const GROUP_MESSAGES = `
  query GroupMessages($input: GroupMessagesInput!) {
    groupMessages(input: $input) {
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
          original
        }
        createdAt
      }
    }
  }
`;
