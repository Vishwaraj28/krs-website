import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { navThunk } from "@/store/thunk/navThunk"; // adjust path as needed
import transformNavData from "@/utils/transformNavData";

export interface NavItem {
  user_id: string;
  nav_item_id: string;
  section: string;
  section_order: number;
  title: string;
  url: string;
  item_order: number;
  is_active: boolean
}

export interface NavGroup {
  title: string;
  url: string;
  items: { title: string; url: string, isActive: boolean, order: number, id: string }[];
}

interface NavState {
  navMain: NavGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: NavState = {
  navMain: [],
  loading: false,
  error: null,
};

const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    clearNavItems(state) {
      state.navMain = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(navThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        navThunk.fulfilled,
        (state, action: PayloadAction<NavItem[]>) => {
          state.navMain = transformNavData(action.payload);
          state.loading = false;
        }
      )
      .addCase(navThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch navigation items";
      });
  },
});

export const { clearNavItems } = navSlice.actions;
export default navSlice.reducer;
