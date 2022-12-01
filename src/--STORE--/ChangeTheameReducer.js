import { createSlice } from "@reduxjs/toolkit";

const toggleData = {
   lightMode : true ,
   premiumAccount : false
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleData,
  reducers: {
    changeMode(state){
     state.lightMode = !state.lightMode
    } ,
    premiumAccount(state){
      state.premiumAccount = true
    }
  },
});

export const toggleActions = toggleSlice.actions;
export default toggleSlice.reducer;
