import { configureStore } from "@reduxjs/toolkit";


import authSliceReducer from './authSlice'
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import productSlice from "./productSlice";
import usersSlice from "./usersSlice";
import persistedReducer from "./persistConfig";
import currentUserSlice from "./currentUserSlice";

/*

const rootReducer = {
  auth: authSliceReducer,
  cart: cartSliceReducer,
  wishlist: wishlistSlice,
  products: productSlice,
  users: usersSlice,
};

const store = configureStore({
  reducer: persistedReducer(rootReducer), // Verwende den persistierten Reducer
});

*/

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
    wishlist: wishlistSlice,
    products: productSlice, // products && randomProducts
    users: usersSlice,
    currentUser: currentUserSlice,
  },
});

export default store;


/* 


*/
