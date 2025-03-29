import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../services/apiServices";

 interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "other";
    image: string;
  }
  

interface AuthState {
    userInfo: AuthResponse | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userInfo: null,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        if (!username?.trim()) {
            return rejectWithValue(`Please enter username`)
        }
        if (!password?.trim()) {
            return rejectWithValue(`Please enter password`)
        }
        try {
            const response = await fetch(`${API_BASE_URL}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
