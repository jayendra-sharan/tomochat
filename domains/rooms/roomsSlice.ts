import { createSlice } from "@reduxjs/toolkit";

export type RoomState = {
  currentRoomId: string;
};

const initialState: RoomState = {
  currentRoomId: "",
};
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoomId: (state, action) => {
      state.currentRoomId = action.payload;
    },
  },
});

export const { setCurrentRoomId } = roomSlice.actions;
export default roomSlice.reducer;
