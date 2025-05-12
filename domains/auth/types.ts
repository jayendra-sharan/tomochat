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
