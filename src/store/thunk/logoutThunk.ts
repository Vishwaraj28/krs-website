import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";

// No input or output needed for logout
export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutThunk", async (_, thunkAPI) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
