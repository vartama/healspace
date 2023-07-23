import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../api/api";

export const fetchHotels = createAsyncThunk(
    "hotel/fetchHotels",
    async () => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            const response = await axios.get(`${API_URL}/hotels`, {
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

export const fetchHotel = createAsyncThunk(
    "hotel/fetchHotel",
    async (hotelId, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            const response = await axios.get(`${API_URL}/hotels/${hotelId}`, {
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
    hotels: null,
    hotel: null,
    loading: false,
    errorMessage: null
}

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                // state.hotels = null
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            })
            .addCase(fetchHotel.pending, (state) => {
                state.loading = true;
                // state.hotel = null;
            })
            .addCase(fetchHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.hotel = action.payload;
            })
            .addCase(fetchHotel.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            });
    },
})

export const { } = hotelSlice.actions;
export default hotelSlice.reducer;