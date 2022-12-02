import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import accountReducer from "../features/accountSlice";
import transactionReducer from "../features/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
  },
});
