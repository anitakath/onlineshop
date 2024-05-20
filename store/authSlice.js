import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser:  null,
    },
    reducers:{
        login(state){
            state.isLoggedIn = true;
            console.log(state.isLoggedIn)
            
        },
        logout(state){
            state.isLoggedIn = false;
            console.log(state.isLoggedIn);

        },
        setCurrentUser(state, action){
            state.user = action.payload;
        }
    }

})

export const {login, logout, setCurrentUser} = authSlice.actions;
export default authSlice.reducer;