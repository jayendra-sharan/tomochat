export const RECOVER_PASSWORD_MUTATION = `
  mutation RecoverPassword($input: RecoverPasswordInput!) {
    recoverPassword(input: $input)
  }
`;
