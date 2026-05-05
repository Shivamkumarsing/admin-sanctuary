import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";

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
    ? Cookies.get("access_token")
    : null;

const initialState: AuthState = {
  user: null,
  token: token || null,
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

      const { access_token, refresh_token, user } = response.data;

      // Store tokens in cookies
      Cookies.set("access_token", access_token, {
        expires: 1, // 1 day expiry
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", refresh_token, {
        expires: 30, // 30 days expiry
        secure: true,
        sameSite: "strict",
      });

      return { token: access_token, user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

//
// ============== REFRESH TOKEN ====================
//

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = Cookies.get("refresh_token");

      if (!refreshTokenValue) {
        return rejectWithValue("No refresh token available");
      }

      const response = await axiosInstance.post(
        "/auth/refresh",
        { refresh_token: refreshTokenValue }
      );

      const { access_token, refresh_token: newRefreshToken } = response.data;

      // Update tokens in cookies
      Cookies.set("access_token", access_token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", newRefreshToken, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });

      return { token: access_token };
    } catch (error: any) {
      // Clear cookies on refresh failure
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
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

      // Clear cookies
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
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
    // REFRESH TOKEN
    //
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
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