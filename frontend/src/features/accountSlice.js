import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  singleAccount: [],
  destinationAccount: [],
  accountTypes: [],
  categories: [],
  banks: [],
  currencies: [],
  alert: { msg: "", error: false },
  loading: true,
  createAccountComplete: false,
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    getAllAccounts(state, action) {
      state.accounts = action.payload;
      state.singleAccount = action.payload;
    },
    loadingAccounts(state, action) {
      state.loading = action.payload;
    },
    getAllAccountTypes(state, action) {
      state.accountTypes = action.payload;
    },
    getAllCategories(state, action) {
      state.categories = action.payload;
    },
    getAllBanks(state, action) {
      state.banks = action.payload;
    },
    getAllCurrencies(state, action) {
      state.currencies = action.payload;
    },
    createAccount(state, action) {
      state.accounts = [...state.accounts, action.payload];
    },
    createNewAccountCompleted(state, action) {
      state.createAccountComplete = action.payload;
    },
    getSingleAccount(state, action) {
      state.singleAccount = state.accounts.filter(
        (account) => account.account_id == action.payload
      );
    },
    setDestinationAccount(state, action) {
      state.destinationAccount = state.accounts.filter(
        (account) => account.account_id == action.payload
      );
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
