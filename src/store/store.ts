import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    usersSlice:userReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;