import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/authSlice";
import chatReducer from "@/domains/chat/chatSlice";
import { authApi } from "@/domains/auth/authApi";
import { chatApi } from "@/domains/chat/chatApi";
import { roomsApi } from "@/domains/rooms/roomsApi";
import { userApi } from "@/domains/user/userApi";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      chatApi.middleware,
      roomsApi.middleware,
      userApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const resetStore = () => ({ type: "RESET_STORE" });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
