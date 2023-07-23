import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../api/api";

export const findAllBookmarks = createAsyncThunk(
    "bookmarks/findAllBookmarks",
    async () => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            console.log(newToken, 'ini token line 12');
            const response = await axios.get(`${API_URL}/bookmarks`, {
                headers: {
                    access_token: newToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const addBookmark = createAsyncThunk(
    "bookmark/addBookmark",
    async (hotelId, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            console.log(newToken, 'ini token line 33');
            console.log(hotelId, 'ini hotelId line 34');
            const response = await axios.post(`${API_URL}/users/bookmarks/${hotelId}`, {}, {
                headers: {
                    access_token: newToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return response.data.data
        } catch (error) {
            console.log(error?.response.data);
        }
    }
)

export const deleteBookmark = createAsyncThunk(
    "bookmark/deleteBookmark",
    async (bookmarkId, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            const newToken = JSON.parse(token)
            console.log(newToken, 'ini token line 54');
            const response = await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`, {
                headers: {
                    access_token: newToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    bookmarks : null,
    bookmark : null,
    loading : false,
    errorMessage : null,
    successMessage : null
}

const bookmarkSlice = createSlice({
    name : "bookmark",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(findAllBookmarks.pending, (state) => {
                state.loading = true;
                // state.hotels = null
            })
            .addCase(findAllBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarks = action.payload;
            })
            .addCase(findAllBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            })
            .addCase(addBookmark.pending, (state) => {
                state.loading = true;
                // state.hotel = null;
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmark = action.payload;
            })
            .addCase(addBookmark.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            })
            .addCase(deleteBookmark.pending, (state) => {
                state.loading = true;
                // state.hotel = null;
            })
            .addCase(deleteBookmark.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteBookmark.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            });
    },
})

export const { } = bookmarkSlice.actions
export default bookmarkSlice.reducer;