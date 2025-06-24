// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slice/authSlice";
import navReducer from "@/store/slice/navigationSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
