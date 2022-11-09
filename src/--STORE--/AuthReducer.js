import { createSlice } from "@reduxjs/toolkit";

const authData = {
  token: null,
  islogin : false ,
  forgotPassword : false
};

const authSlice = createSlice({
  name: "auth",
  initialState: authData,
  reducers: {
    login(state , action) {
      state.token = action.payload
      state.islogin = true
    },
    logout(state , action) {
        state.token = action.payload
        state.islogin = false
      },
     forgot(state){
      state.forgotPassword = !state.forgotPassword 
     }
  },
});

export const authActions = authSlice.actions
export default authSlice.reducer

