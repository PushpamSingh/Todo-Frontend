import { configureStore } from "@reduxjs/toolkit";
import authReducer from  './AuthSlice.store.js';
const store=configureStore({
    reducer:{
        authReducer
    }
})

export default store