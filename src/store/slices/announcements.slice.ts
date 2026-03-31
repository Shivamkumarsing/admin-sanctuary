import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ==========================
// 🚀 Async Thunks
// ==========================

// 👉 GET all announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/announcements/all");

      // ✅ handle both cases (data OR data.data)
      return response.data?.data || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch announcements"
      );
    }
  }
);

// 👉 CREATE announcement
export const createAnnouncement = createAsyncThunk(
  "announcements/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/announcements/create",
        data
      );

      return response.data?.data || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create announcement"
      );
    }
  }
);

// ==========================
// 📦 Initial State
// ==========================

interface AnnouncementState {
  list: any[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
}

const initialState: AnnouncementState = {
  list: [],
  loading: false,
  error: null,
  createLoading: false,
};

// ==========================
// 🧩 Slice
// ==========================

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================
      // 📥 FETCH
      // ======================
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ======================
      // ➕ CREATE
      // ======================
      .addCase(createAnnouncement.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.createLoading = false;

        // ✅ Add new announcement at top
        if (action.payload) {
          state.list.unshift(action.payload);
        }
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default announcementsSlice.reducer;