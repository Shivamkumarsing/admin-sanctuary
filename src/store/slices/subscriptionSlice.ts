import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";



interface SubscriptionStats {
    monthly_revenue: any;
    expiring_soon: number;
    active_subscriptions: number;
    total: number;
    active: number;
    expired: number;
    trial: number;
    revenue: number;
}

interface Subscription {
    id: number;
    society: string;
    plan: string;
    status: string;
    start_date: string;
    end_date: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
}

interface SubscriptionsState {
    stats: SubscriptionStats | null;
    list: Subscription[];
    pagination: Pagination | null;
    isLoading: boolean;
    error: string | null;
}


// ================= INITIAL STATE =================

const initialState: SubscriptionsState = {
    stats: null,
    list: [],
    pagination: null,
    isLoading: false,
    error: null,
};



export const fetchSubscriptionStats = createAsyncThunk(
    "subscriptions/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/subscriptions/stats");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch subscription stats"
            );
        }
    }
);



export const fetchSubscriptionList = createAsyncThunk(
    "subscriptions/fetchList",
    async (
        params: { page?: number; limit?: number } = {},
        { rejectWithValue }
    ) => {
        try {
            const { page = 1, limit = 10 } = params;

            const res = await axiosInstance.get(
                `/subscriptions/list?page=${page}&limit=${limit}`
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch subscriptions"
            );
        }
    }
);



const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchSubscriptionStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSubscriptionStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchSubscriptionStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchSubscriptionList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSubscriptionList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchSubscriptionList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default subscriptionsSlice.reducer;