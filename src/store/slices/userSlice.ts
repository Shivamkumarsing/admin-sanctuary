import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";



interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    role: string;
}

interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}



const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
};



export const fetchUsersList = createAsyncThunk(
    "users/fetchUsersList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/users/list");

            return response.data.data.items;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch users list"
            );
        }
    }
);



const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;