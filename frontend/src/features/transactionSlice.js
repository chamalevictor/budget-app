import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  loadingTransactions: false,
  transactionCompleted: false,
  links: {
    linkTo: "accounts",
    linkName: "cuentas",
  },
};

export const transactionSlice = createSlice({
  name: "Transaction Slice",
  initialState,
  reducers: {
    getTransactions(state, action) {
      state.transactions = action.payload;
    },
    newTransaction(state, action) {
      state.transactions = action.payload;
    },
    loadingTransactions(state, action) {
      state.loadingTransactions = action.payload;
    },
    transactionCompleted(state, action) {
      state.transactionCompleted = action.payload;
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
