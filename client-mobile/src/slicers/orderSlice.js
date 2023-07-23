import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../api/api";

export const payment = createAsyncThunk(
    "payment/getPayment",
    async (bookData, thunkAPI) => {
        try {
            console.log(bookData, 'data book line 10');
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            const response = await axios.post(`${API_URL}/orders/book`, bookData, {
                headers: {
                    access_token: newToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(response.data.data.order.paypalPaymentUrl, 'line 20');
            return response.data.data
        } catch (error) {
            console.log(error.response.data);
        }
    }
)

export const paymentSuccess = createAsyncThunk(
    "payment/successPayment",
    async (bookData, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            const response = await axios.get(`${API_URL}/book/success`, bookData, {
                headers: {
                    access_token: newToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    dataPaypal: null,
    successPayment: null,
    loading: false,
    errorMessage: null,
    successMessage: null
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(payment.pending, (state) => {
                state.loading = true;
            })
            .addCase(payment.fulfilled, (state, action) => {
                state.loading = false;
                state.dataPaypal = action.payload;
            })
            .addCase(payment.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            })
            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true;
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => {
                state.loading = false;
                state.successPayment = action.payload;
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            });
    },
});

export const { } = orderSlice.actions;

export default orderSlice.reducer;