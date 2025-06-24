import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabaseClient";
import { NavItem } from "@/store/slice/navigationSlice";

export const navThunk = createAsyncThunk<
  NavItem[], // Return type
  string, // userId as argument
  { rejectValue: string }
>("navigation/fetchNavItems", async (userId, thunkAPI) => {
  const { data, error } = await supabase
    .from("v_krs_user_nav_items")
    .select("*")
    .eq("user_id", userId)
    .order("section_order", { ascending: true })
    .order("item_order", { ascending: true });

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data || [];
});
