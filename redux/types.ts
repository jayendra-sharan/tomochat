import { AuthState } from "@/redux/slices/auth/types";
import { ChatState } from "@/redux/slices/chat/types";

export type AppState = {
  auth: AuthState;
  chat: ChatState;
}
