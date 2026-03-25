import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";





interface DashboardStats {
  totalSocieties: number;
  activeUsers: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
}

interface DashboardState {
  stats: DashboardStats | null;
  revenueGrowth: any;
  subscriptionStatus: any;
  recentSocieties: any[];
  recentTickets: any[];
  isLoading: boolean;
  error: string | null;
}




const initialState: DashboardState = {
  stats: null,
  revenueGrowth: null,
  subscriptionStatus: null,
  recentSocieties: [],
  recentTickets: [],
  isLoading: false,
  error: null,
};




export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/dashboard/stats");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch dashboard stats"
      );
    }
  }
);



export const fetchRevenueGrowth = createAsyncThunk(
  "dashboard/fetchRevenueGrowth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/dashboard/revenue-growth");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch revenue growth"
      );
    }
  }
);



export const fetchSubscriptionStatus = createAsyncThunk(
  "dashboard/fetchSubscriptionStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/dashboard/subscription-status");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch subscription status"
      );
    }
  }
);



export const fetchRecentSocieties = createAsyncThunk(
  "dashboard/fetchRecentSocieties",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/dashboard/recent-societies");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch recent societies"
      );
    }
  }
);



export const fetchRecentTickets = createAsyncThunk(
  "dashboard/fetchRecentTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/dashboard/recent-tickets");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch recent tickets"
      );
    }
  }
);





const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder


      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })


      .addCase(fetchRevenueGrowth.fulfilled, (state, action) => {
        state.revenueGrowth = action.payload;
      })


      .addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
        state.subscriptionStatus = action.payload;
      })


      .addCase(fetchRecentSocieties.fulfilled, (state, action) => {
        state.recentSocieties = action.payload;
      })


      .addCase(fetchRecentTickets.fulfilled, (state, action) => {
        state.recentTickets = action.payload;
      })


      .addMatcher(
        (action) => action.type.startsWith("dashboard/") && action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default dashboardSlice.reducer;