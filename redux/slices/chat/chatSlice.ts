import { gqlFetch } from "@/graphql/client";
import { GROUP_MESSAGES } from "@/graphql/queries/groupMessages";
import { GROUPS } from "@/graphql/queries/groups";
import { ActiveChat, ChatState } from "./types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SendMessagePayload } from "./types";
import { SEND_MESSAGE } from "@/graphql/mutations/sendMessage";
import { AppState } from "@/redux/types";

export const fetchGroups = createAsyncThunk("user/fetchGroups", async (_, thunkApi) => {
  const { data, error } = await gqlFetch(GROUPS);

  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return data.groups;
});

export const fetchGrouChats = createAsyncThunk("user/fetchGroupChats", async ({ groupId }: {groupId: string}, thunkApi) => {
  const { data, error } = await gqlFetch(GROUP_MESSAGES, { groupId })

  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return data.groupMessages;
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async ( payload: SendMessagePayload, thunkApi) => {
  const state  = thunkApi.getState() as AppState;
  const { chat: { activeChat } } = state;
  const { content } = payload;
  const { id: groupId } = activeChat || {};
  const { data, error } = await gqlFetch(SEND_MESSAGE, { input: { groupId, content }});

  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return data.sendMessage;
});

const initialState: ChatState = {
  loading: false,
  error: "",
  groups: [],
  activeChat: {} as ActiveChat,
  sendingMessage: false,
  sendMessageError: "",
}

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    clearChats: () => initialState,
    setPrivateMode: (state, action: PayloadAction<boolean>) => {
      state.activeChat.privateMode = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGrouChats.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchGrouChats.fulfilled, (state, action) => {
        state.loading = false;
        state.activeChat = {
          privateMode: state.activeChat?.privateMode,
          messages: action.payload.messages,
          name: action.payload.name,
          id: action.payload.id,
          userId: action.payload.userId
        };
        state.error = "";
      })
      .addCase(fetchGrouChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
        state.sendMessageError = "";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        state.sendMessageError = "";
        state.activeChat && (
          state.activeChat.messages = [
            ...state.activeChat.messages,
            action.payload,
          ]
        )
      })
  }
});

export const { clearChats, setPrivateMode } = chatsSlice.actions;
export default chatsSlice.reducer;

