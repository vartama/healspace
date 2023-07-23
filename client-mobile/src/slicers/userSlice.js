import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../api/api";

export const login = createAsyncThunk(
    "user/login",
    async (dataUser, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, dataUser, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            const setToken = JSON.stringify(response.data.access_token);
            const setData = JSON.stringify(response.data.data);
            await AsyncStorage.setItem("access_token", setToken);
            await AsyncStorage.setItem("data_user", setData);
            return response.data.data;
        } catch (error) {
            console.log(error, 'error line 15');
        }
    }
)

export const register = createAsyncThunk(
    "user/register",
    async (dataUser, thunkAPI) => {
        try {
            console.log(dataUser, 'data user line 28');
            const response = await axios.post(`${API_URL}/users/register`, dataUser, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    isLogin: false,
    user: null,
    loading: false,
    errorMessage: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            });
    },
});


export const { } = userSlice.actions;

export default userSlice.reducer;