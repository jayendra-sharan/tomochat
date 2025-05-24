export const LOGIN_MUTATION = `
  query Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        displayName
        isEmailVerified
      }
    }
  }
`;
