import { createSlice } from "@reduxjs/toolkit";


const peopleSlice = createSlice({
  name: "adressBook",
  initialState: [],
  reducers: {
    addPerson: (state, action) => {
        const {person, age, dish} = action.payload
        const newPerson ={
            person,
            age,
            dish,
            id: Date.now()
        }
      state.push(newPerson);
    },
    removePerson: (state, action) => {
      const personId = action.payload;
      return state.filter((person) => person.id !== personId);
    },
  },
}); 


export const { addPerson, removePerson } = peopleSlice.actions //  import to the component that does a dispatch
export default peopleSlice.reducer // peopleSliceReducer, import to the stores property.