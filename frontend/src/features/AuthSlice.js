import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/login", {
            email: user.email,
            password: user.password,
        })
        return response.data;
    } catch (error) {
        if (error.response) {
            const msg = error.response.data.message;
            return thunkAPI.rejectWithValue(msg);
        }
    }
})

export const GetMe = createAsyncThunk("user/GetMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/me");
        return response.data;
    } catch (error) {
        if (error.response) {
            const msg = error.response.data.message;
            return thunkAPI.rejectWithValue(msg);
        }
    }
})

export const Logout = createAsyncThunk("user/Logout", async () => {
    await axios.delete("http://localhost:5000/logout");
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get Me (User Logged In)
        builder.addCase(GetMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(GetMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;