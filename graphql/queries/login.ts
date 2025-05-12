export const LOGIN_QUERY = `
  query Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        displayName
      }
    }
  }
`;
