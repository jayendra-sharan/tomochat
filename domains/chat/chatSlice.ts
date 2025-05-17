import { createSlice } from "@reduxjs/toolkit";

export type ChatState = {
  isPrivate: boolean;
}

const initialState: ChatState = {
  isPrivate: false,
}
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPrivateMode: (state, action) => {
      state.isPrivate = action.payload
    }
  }
});

export const { setPrivateMode } = chatSlice.actions;
export default chatSlice.reducer;
