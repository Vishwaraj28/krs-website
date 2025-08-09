import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { NavItem } from "@/store/slice/navigationSlice";

export const navThunk = createAsyncThunk<
  NavItem[], // Return type
  void, // No argument
  { rejectValue: string }
>("navigation/fetchNavItems", async (_, thunkAPI) => {
  const { data, error } = await supabase.rpc("get_user_nav_items");

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data || [];
});