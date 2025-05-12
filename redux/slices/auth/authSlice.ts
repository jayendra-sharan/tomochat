import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gqlFetch } from "@/graphql/client";
import { LOGIN_QUERY, ME } from "@/graphql/queries";
import { storage } from "@/utils/storage";
import { AUTH_TOKEN } from "@/constants";
import { AuthState, User } from "./types";

export const fetchMe = createAsyncThunk("user/fetchMe", async(_, thunkApi) => {
  const { data, error } = await gqlFetch(ME);

  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return data.me;
});

export const login = createAsyncThunk("user/login", async({ email, password } : any, thunkApi) => {
  const { data, error } = await gqlFetch(LOGIN_QUERY, {
    input: { email, password }
  });

  if (error) {
    return thunkApi.rejectWithValue(error);
  }

  return data.login;
});

const initialState: AuthState = {
  loading: false,
  error: "",
  user: {} as User,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          displayName: action.payload.displayName,
          email: action.payload.email
        };
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = {
          ...user,
        }

        storage.setItem(AUTH_TOKEN, token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
