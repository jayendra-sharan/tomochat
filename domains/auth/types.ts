export interface User {
  id: string;
  displayName: string;
  email: string;
  isEmailVerified: string;
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
  displayName: string;
  email: string;
  password: string;
  rePassword: string;
}

export type RegisterUserInput = Omit<RegisterUser, "rePassword">;

export interface RegisterUserResponse {
  displayName: string;
  id: string;
  email: string;
}
