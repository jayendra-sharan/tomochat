export const SEND_MESSAGE = `
mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    id
    content
    createdAt
    suggestion {
      original
      aiReply
      english
      issues
    }
    sender {
      id
      displayName
    }
  }
}
`;