

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import productSlice from "./productSlice";
import usersSlice from "./usersSlice";
import currentUserSlice from "./currentUserSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  cart: cartSliceReducer,
  wishlist: wishlistSlice,
  products: productSlice,
  users: usersSlice,
  currentUser: currentUserSlice,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "wishlist", "products", "users", "currentUser"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
