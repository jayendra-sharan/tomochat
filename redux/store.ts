import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/authSlice";
import chatReducer from "@/domains/chat/chatSlice";
import { authApi } from "@/domains/auth/authApi";
import { chatApi } from "@/domains/chat/chatApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      chatApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
