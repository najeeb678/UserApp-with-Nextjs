import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../slices/userDetails"
const store = configureStore({
    reducer: {
        app: userDetails
    }
});
export default store;