
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

            let { id, } = action.payload;

            const findProductIndex = state.findIndex((product) => product.id === id)

        
            //state[findProductIndex].quantity -= action.payload.quantity;
            state.splice(findProductIndex, 1);

            state.forEach((product) =>{
                const totalPrice = product.quantity * product.price;
                product.totalPrice = totalPrice.toFixed(2)
            })

           

        }


    }
})

export const  { incrementItem, decrementItem, deleteAllItems} = cartSlice.actions;
export default cartSlice.reducer;