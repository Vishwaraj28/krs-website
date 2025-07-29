import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { User, Session } from "@supabase/supabase-js";

type SignupInput = {
  email: string;
  password: string;
  fullName: string;
  area: string;
};

export const signupThunk = createAsyncThunk<
  { user: User | null; session: Session | null },
  SignupInput,
  { rejectValue: string }
>("auth/signupThunk", async ({ email, password, fullName, area }, thunkAPI) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        area,
        is_approved: false,
        role: "pending_user",
      },
    },
  });

  if (signUpError || !signUpData.user) {
    return thunkAPI.rejectWithValue(signUpError?.message ?? "Signup failed");
  }

  return {
    user: signUpData.user,
    session: signUpData.session,
  };
});
