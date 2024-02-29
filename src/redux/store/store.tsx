import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../slices/userDetails"
const store = configureStore({
    reducer: {
        userDetails: userDetailsReducer
    }
});
export default store;