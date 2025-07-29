import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Session } from "@supabase/supabase-js";
import { loginThunk } from "@/store/thunk/loginThunk";
import { sessionThunk } from "@/store/thunk/sessionThunk";
import { signupThunk } from "@/store/thunk/signupThunk";
import { logoutThunk } from "../thunk/logoutThunk";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  initialized: false,
};

// Common success handler
const setAuthSuccess = (
  state: AuthState,
  action: PayloadAction<{
    user: User | null;
    session: Session | null;
  }>
) => {
  state.user = action.payload.user;
  state.session = action.payload.session;
  state.isAuthenticated = !!action.payload.session;
  state.initialized = true;
};

// Common failure handler
const setAuthFailure = (state: AuthState) => {
  state.user = null;
  state.session = null;
  state.isAuthenticated = false;
  state.initialized = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      setAuthFailure(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, setAuthSuccess)
      .addCase(loginThunk.rejected, setAuthFailure)
      .addCase(sessionThunk.fulfilled, setAuthSuccess)
      .addCase(sessionThunk.rejected, setAuthFailure)
      .addCase(signupThunk.fulfilled, setAuthSuccess)
      .addCase(signupThunk.rejected, setAuthFailure)
      .addCase(logoutThunk.fulfilled, setAuthFailure)
      .addCase(logoutThunk.rejected, setAuthFailure);
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
