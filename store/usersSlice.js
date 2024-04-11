import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    login_data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsers_data: (state, action) => {
      state.login_data = action.payload;
      state.loading = false;
      state.error = null;
      //console.log(state)
      //console.log(action.payload)
    },
    setLoading: (state, action) => {
     //state.loading = action.payload;
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      //state.error = action.payload;
    },
   
    
  },
});


export const { setUsers_data, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
