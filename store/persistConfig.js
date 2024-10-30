

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";




const rootReducer = combineReducers({
  auth: authSliceReducer,
 
  cart: cartSliceReducer,
  wishlist: wishlistSlice,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "wishlist", ],
  timeout: 10,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
