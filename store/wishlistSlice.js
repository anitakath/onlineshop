import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    incrementWishlist: (state, action) => {
      const { name, id, price, desc, img } = action.payload;

      let quantity = 0;

      const product = {
        name,
        id,
        price,
        desc,
        img,
        quantity,
      };

      const findProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (findProductIndex === -1) {
        product.quantity += 1;
        state.push(product);
      } else {
          return
      }

     
    },
    decrementWishlist: (state, action) =>{
      const { id } = action.payload;

      const findProductIndex = state.findIndex((product) => product.id === id);

      if (state[findProductIndex].quantity > 1) {
        state[findProductIndex].quantity -= 1;
      } else {
        state.splice(findProductIndex, 1);
      }

      state.forEach((product) => {
        const totalPrice = product.quantity * product.price;
        product.totalPrice = totalPrice.toFixed(2);
      });
    }
  },
});


export default wishlistSlice.reducer;
export const { incrementWishlist, decrementWishlist } = wishlistSlice.actions;