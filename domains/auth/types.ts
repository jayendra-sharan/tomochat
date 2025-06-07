export interface User {
  id: string;
  displayName: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  error: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterUser {
  idToken: string;
  displayName: string;
}

export type RegisterUserInput = Omit<RegisterUser, "rePassword">;

export interface RegisterUserResponse {
  displayName: string;
  id: string;
  email: string;
}

export interface RequestEmailVerificationInput {
  email: string;
}

export interface VerifyEmailCodeInput {
  email: string;
  code: string;
}

export interface ChangePasswordInput {
  newPassword: string;
  currentPassword: string;
}

export interface RequestPasswordResetInput {
  email: string;
}
export interface RecoverPasswordInput {
  password: string;
}
