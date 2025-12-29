import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { User, Session } from "@supabase/supabase-js";

export type SignupInput = {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  area: string;
};

export const signupThunk = createAsyncThunk<
  { user: User | null; session: Session | null },
  SignupInput,
  { rejectValue: string }
>(
  "auth/signupThunk",
  async ({ email, password, phone, firstName, lastName, area }, thunkAPI) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            area,
            phone,
            is_approved: false,
            role: "pending_user",
          },
        },
      }
    );

    if (signUpError || !signUpData.user) {
      return thunkAPI.rejectWithValue(signUpError?.message ?? "Signup failed");
    }

    return {
      user: signUpData.user,
      session: signUpData.session,
    };
  }
);
