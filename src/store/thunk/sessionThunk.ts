// src/store/thunk/sessionThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { User, Session } from "@supabase/supabase-js";

export const sessionThunk = createAsyncThunk<
  { user: User; session: Session },
  void,
  { rejectValue: string }
>("auth/restoreSession", async (_, thunkAPI) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    return thunkAPI.rejectWithValue("No active session found");
  }

  return { user: session.user, session };
});
