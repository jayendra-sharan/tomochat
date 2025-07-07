export const getTempMessage = (content: string, userId: string, displayName: string) => {
  return {
    id: 'temp-' + Date.now(),
    content,
    createdAt: new Date().toISOString(),
    suggestion: null,
    sender: {
      id: userId,
      displayName,
    },
  }
}
