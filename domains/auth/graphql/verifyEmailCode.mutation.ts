export const VERIFY_EMAIL_CODE = `
  mutation VerifyEmailCode($input: VerifyEmailCodeInput!) {
    verifyEmailCode(input: $input) {
      token
      user {
        displayName
        id
        email
      }
    }
  }
`;
