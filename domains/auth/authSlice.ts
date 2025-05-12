import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  loading: false,
  error: "",
  user: {} as AuthState["user"],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: () => initialState,
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
