export const SEND_MESSAGE = `
mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    id
    content
    createdAt
    suggestion {
      isMessageOk
      original
      fixedMessage
      fixLogic
    }
    sender {
      id
      displayName
    }
  }
}
`;
