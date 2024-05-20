
import { createSlice } from "@reduxjs/toolkit"





const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        incrementItem: (state, action) => {
            const {name, id, price, desc, img} = action.payload


            let quantity = 0;
            
            const product = {
                name,
                id,
                price, 
                desc,
                quantity,
                img,
            }
            
           const findProductIndex = state.findIndex((product) => product.id === action.payload.id)
           
           if(findProductIndex === -1){
               product.quantity += 1;
                state.push(product);
                
           }else{
               state[findProductIndex].quantity += 1;
           }

           state.forEach((product) => {
               const totalPrice = product.quantity * product.price
               product.totalPrice = totalPrice.toFixed(2)
           })

           
        },
    

        decrementItem: (state, action) => {
            const { id } = action.payload;

            const findProductIndex = state.findIndex((product) => product.id === id)

            if (findProductIndex >= 0) {
              if (state[findProductIndex].quantity === 0) {
                return;
              } else if (state[findProductIndex].quantity > 1) {
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

        deleteAllItems: (state, action) =>{

          state.splice(0, state.length);
        }


    }
})


export const  { incrementItem, decrementItem, deleteAllItems} = cartSlice.actions;
export default cartSlice.reducer;

/*

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
        state[findProductIndex].quantity += 1;
      }
    },
    decrementWishlist: (state, action) => {
      const { id } = action.payload;

      const findProductIndex = state.findIndex((product) => product.id === id);

      if (state[findProductIndex] && state[findProductIndex].quantity > 1) {
        state[findProductIndex].quantity -= 1;
      } else {
        state.splice(findProductIndex, 1);
      }

      state.forEach((product) => {
        const totalPrice = product.quantity * product.price;
        product.totalPrice = totalPrice.toFixed(2);
      });
    },
    deleteAllWishlistItems: (state, action) => {
      state.splice(0, state.length);
    },
  },
});


export const { incrementItem, decrementItem, deleteAllItems } =
  cartSlice.actions;
export const { incrementWishlist, decrementWishlist, deleteAllWishlistItems } =
  wishlistSlice.actions;

export const cartReducer = cartSlice.reducer;
export const wishlistReducer = wishlistSlice.reducer;

*/


// BRING CART & WISHLIST TOGETHER!



/*
const cartAndWishlistSlice = createSlice({
  name: "cartAndWishlist",
  initialState: {
    cart: [],
    wishlist: [],
  },
  reducers: {
    incrementItem: (state, action) => {
      const { name, id, price, desc, img } = action.payload;

      let quantity = 0;

      const product = {
        name,
        id,
        price,
        desc,
        quantity,
        img,
      };

      const findProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (findProductIndex === -1) {
        product.quantity += 1;
        state.cart.push(product);
      } else {
        state.cart[findProductIndex].quantity += 1;
      }

      state.cart.forEach((product) => {
        const totalPrice = product.quantity * product.price;
        product.totalPrice = totalPrice.toFixed(2);
      });
    },
    decrementItem: (state, action) => {
      const { id } = action.payload;

      const findProductIndex = state.findIndex((product) => product.id === id);

      if (findProductIndex >= 0) {
        if (state[findProductIndex].quantity === 0) {
          return;
        } else if (state[findProductIndex].quantity > 1) {
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

    deleteAllItems: (state, action) => {
      state.splice(0, state.length);
    },

    // WISHLIST!!!
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
        state[findProductIndex].quantity += 1;
      }
    },
    decrementWishlist: (state, action) => {
      const { id } = action.payload;

      const findProductIndex = state.findIndex((product) => product.id === id);

      if (state[findProductIndex] && state[findProductIndex].quantity > 1) {
        state[findProductIndex].quantity -= 1;
      } else {
        state.splice(findProductIndex, 1);
      }

      state.forEach((product) => {
        const totalPrice = product.quantity * product.price;
        product.totalPrice = totalPrice.toFixed(2);
      });
    },
    deleteAllWishlistItems: (state, action) => {
      state.splice(0, state.length);
    },
  },
});


export const { incrementItem, decrementItem, deleteAllItems } =
  cartAndWishlistSlice.actions;

export default cartAndWishlistSlice.reducer;


*/