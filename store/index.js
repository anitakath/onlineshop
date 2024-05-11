import { configureStore } from "@reduxjs/toolkit";


import authSliceReducer from './authSlice'
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import productSlice from "./productSlice";
import usersSlice from "./usersSlice";
import currentUserSlice from "./currentUserSlice";

import persistedReducer from "./persistConfig";


const store = configureStore({
  reducer: persistedReducer,
})



export default store;

