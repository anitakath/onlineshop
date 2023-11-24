import { configureStore } from "@reduxjs/toolkit";


import authSliceReducer from './authSlice'
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
    wishlist: wishlistSlice,
    products: productSlice, // products && randomProducts
  },
});

export default store;
