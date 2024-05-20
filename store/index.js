

import { configureStore } from "@reduxjs/toolkit";

import persistedReducer from "./persistConfig";


const store = configureStore({
  reducer: persistedReducer,
})



export default store;

