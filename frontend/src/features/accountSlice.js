import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  accountTypes: [],
  categories: [],
  banks: [],
  currencies: [],
  alert: { msg: "", error: false },
  loading: true,
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    getAllAccounts(state, action) {
      state.accounts = action.payload;
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
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
