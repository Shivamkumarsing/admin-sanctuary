import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

//
// ================= TYPES =================
//

interface User {
  userName?: string;
  email: string;
  role?: string;
  phoneNumber?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  userName: string;
  email: string;
  role: string;
  phoneNumber: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

//
// ============== INITIAL STATE ============
//

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

const initialState: AuthState = {
  user: null,
  token: token,
  isLoading: false,
  error: null,
  isAuthenticated: !!token,
};

//
// ============== LOGIN ====================
//

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        userData
      );

      const { access_token, user } = response.data;
      localStorage.setItem("token", access_token);

      return { token: access_token, user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);



export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/register",
        userData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },

    resetAuthState: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    //
    // LOGIN
    //
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //
    // REGISTER
    //
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});



export const { logout, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;