import { createSlice } from "@reduxjs/toolkit";

const expensesData = {
  list: [],
  activePremiumAccount : false ,
  deactiveButton : false ,
  email : null ,
  showExpenseForm : false
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
      },
    setEmail(state , action){
       state.email = action.payload
    },
    showExpenseForm(state ,action){
      state.showExpenseForm = !state.showExpenseForm
    }
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
