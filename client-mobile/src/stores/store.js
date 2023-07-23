import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userSlice from "../slicers/userSlice";
import hotelSlice from "../slicers/hotelSlice";
import bookmarkSlice from "../slicers/bookmarkSlice";
import orderSlice from "../slicers/orderSlice";

const reducer = combineReducers({
    user: userSlice,
    hotel: hotelSlice,
    bookmark: bookmarkSlice,
    order: orderSlice
});

const store = configureStore({
    reducer: reducer,
    // devTools: true,
})

export default store;