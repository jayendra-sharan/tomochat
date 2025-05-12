export interface User {
  email: string;
  displayName: string;
  id: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: User;
}
