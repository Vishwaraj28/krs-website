import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { User, Session } from "@supabase/supabase-js";

type LoginInput = {
  email: string;
  password: string;
};

export const loginThunk = createAsyncThunk<
  { user: User; session: Session },
  LoginInput,
  { rejectValue: string }
>("auth/loginThunk", async ({ email, password }, thunkAPI) => {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError || !authData.session || !authData.user) {
    return thunkAPI.rejectWithValue(authError?.message ?? "Login failed");
  }

  return {
    user: authData.user,
    session: authData.session,
  };
});
