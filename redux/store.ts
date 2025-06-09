import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/domains/auth/authSlice";
import chatReducer from "@/domains/chat/chatSlice";
import roomReducer from "@/domains/rooms/roomsSlice";
import { authApi } from "@/domains/auth/authApi";
import { chatApi } from "@/domains/chat/chatApi";
import { roomsApi } from "@/domains/rooms/roomsApi";
import { userApi } from "@/domains/user/userApi";
import { notificationApi } from "@/domains/notification/notificationApi";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  room: roomReducer,
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
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
      notificationApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const resetStore = () => ({ type: "RESET_STORE" });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
