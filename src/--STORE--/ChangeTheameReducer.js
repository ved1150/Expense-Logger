import { createSlice } from "@reduxjs/toolkit";

const toggleData = {
   lightMode : true ,
   premiumAccount : false ,
   profile : false 
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
    } ,
    openProfile(state){
      state.profile = !state.profile
    }

  },
});

export const toggleActions = toggleSlice.actions;
export default toggleSlice.reducer;
