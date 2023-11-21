import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./counterSlice";
import peopleSliceReducer from './peopleSlice'
import cartSliceReducer from "./cartSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    adressBook: peopleSliceReducer,

    
    cart: cartSliceReducer,
    wishlist: wishlistSlice,
  },
});

export default store;
