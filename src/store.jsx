import accountReducer from "./Features/accounts/accountSlice";
import customerReducer from "./Features/customers/CustomerSlice";

import { configureStore } from "@reduxjs/toolkit";

const store=configureStore({
  reducer:{
    account:accountReducer,
    customer:customerReducer
  }
})

export default store;
