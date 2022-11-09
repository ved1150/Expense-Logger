import { createSlice } from "@reduxjs/toolkit";

const expensesData = {
  list: [],
  activePremiumAccount : false ,
  deactiveButton : false 
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesData,
  reducers: {
    updateList(state, action) {
      state.list = action.payload;
    },
    activeButton(state){
      state.activePremiumAccount = true
      state.deactiveButton = false
    },
    deactiveButton(state){
        state.deactiveButton = true 
        state.activePremiumAccount = false
      }
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
