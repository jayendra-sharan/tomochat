export const SEND_VERIFICATION_CODE = `
  mutation RequestEmailVerification($input: RequestEmailVerificationInput!) {
    requestEmailVerification(input: $input)
  }
`;
