
import { createSlice } from "@reduxjs/toolkit"


const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    randomProducts: [],
    showProducts: false,
    selectedProduct: null,
    filterProductArray: [],
    updateRandomProducts: [],
    newProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setRandomProductss: (state, action) => {
      state.randomProducts = action.payload;
      console.log(action.payload)
      console.log(state.randomProducts)
    },
    setShowProductss: (state, action) => {
      state.showProducts.action.payload;
    },
    setSelectedProductt: (state, action) => {
      state.selectedProduct = action.payload;
      console.log(action.payload);
    },
    setFilterProductArray: (state, action) => {
      state.filterProductArray = action.payload;
    },
    setUpdatedRandomProducts: (state, action) => {
        console.log(action.payload)
   
      const filteredRandomProducts = state.randomProducts.filter((p) => p !== action.payload);
      console.log(filteredRandomProducts)
      state.updateRandomProducts = [... filteredRandomProducts] 
    },
    setNewProduct: (state, action) => {
      state.newProduct = action.payload;
    },
  },
});

export const 
    {setProducts,
     setRandomProductss, 
     setShowProducts,
     setSelectedProductt,
     setUpdatedRandomProducts,

    } = productsSlice.actions; 
export default productsSlice.reducer;