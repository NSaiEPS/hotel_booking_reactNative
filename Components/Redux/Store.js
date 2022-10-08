import { configureStore } from "@reduxjs/toolkit";
import redux_Slice from "./Redux_Slice";
export const Store=configureStore({
    reducer:{
        reduxstore:redux_Slice,
        // signingstore:redux_Slice,
    }
}
)