export const DELETE_MESSAGES = `
  mutation DeleteMessages($input: DeleteMessagesInput!) {
    deleteMessages(input: $input) 
  }
`;
