import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer"
import ExpensesReducer from "./ExpensesReducer"
import ChangeTheameReducer from "./ChangeTheameReducer"
const store = configureStore({
    reducer :{
        auth : AuthReducer,
        Expense : ExpensesReducer ,
        toggle : ChangeTheameReducer
    }
})

export default store
