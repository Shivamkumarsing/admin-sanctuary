import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import revenueReducer from "./slices/revenue.slice";
import announcementReducer from "./slices/announcements.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    usersSlice:userReducer,
    subscriptionsSlice: subscriptionReducer,
    revenueSlice: revenueReducer,
    announcementsSlice: announcementReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;