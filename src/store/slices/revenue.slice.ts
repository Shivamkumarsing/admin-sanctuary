import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";



interface RevenueStats {
  per_active_subscription: any;
  monthly_recurring_revenue: any;
  total_revenue: any;
  totalRevenue: number;
  monthlyRevenue: number;
  invoicesCount: number;
  growth: number;
}

interface RevenueTrend {
  month: string;
  year: number;
  revenue: number;
}

interface RevenueByPlan {
  plan: string;
  revenue: number;
}

interface Invoice {
  id: number;
  society: string;
  amount: number;
  status: string;
  created_at: string;
}

interface RevenueState {
  stats: RevenueStats | null;
  trend: RevenueTrend[];
  byPlan: RevenueByPlan[];
  invoices: Invoice[];

  isLoading: boolean;
  error: string | null;
}



const initialState: RevenueState = {
  stats: null,
  trend: [],
  byPlan: [],
  invoices: [],

  isLoading: false,
  error: null,
};


export const fetchRevenueStats = createAsyncThunk(
  "revenue/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/revenue/stats");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch revenue stats"
      );
    }
  }
);


export const fetchRevenueTrend = createAsyncThunk(
  "revenue/fetchTrend",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/revenue/trend");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response||
          "Failed to fetch revenue trend"
      );
    }
  }
);


export const fetchRevenueByPlan = createAsyncThunk(
  "revenue/fetchByPlan",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/revenue/by-plan");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch revenue by plan"
      );
    }
  }
);


export const fetchInvoices = createAsyncThunk(
  "revenue/fetchInvoices",
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        "/revenue/invoices",
        { params }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch invoices"
      );
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchRevenueStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchRevenueStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })


      .addCase(fetchRevenueTrend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueTrend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trend = action.payload;
      })


      .addCase(fetchRevenueByPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueByPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.byPlan = action.payload;
      })


      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default revenueSlice.reducer;