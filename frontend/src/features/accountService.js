import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountActions } from "./accountSlice";
import axiosClient from "../config/axiosClient";
import { useDispatch } from "react-redux";

const getConfig = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const getAccounts = createAsyncThunk(
  "Get all accounts",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(accountActions.loadingAccounts(true));
      const { data: accounts } = await axiosClient("/accounts", getConfig());
      if (accounts) {
        thunkApi.dispatch(accountActions.getAllAccounts(accounts));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        thunkApi.dispatch(accountActions.loadingAccounts(false));
        thunkApi.dispatch(accountActions.createNewAccountCompleted(false));
      }, 750);
    }
  }
);

export const createAccount = createAsyncThunk(
  "Create Account",
  async (newAccount, thunkApi) => {
    try {
      thunkApi.dispatch(accountActions.loadingAccounts(true));
      const { data } = await axiosClient.post(
        "/accounts",
        newAccount,
        getConfig()
      );
      if (data) {
        thunkApi.dispatch(accountActions.createAccount(data));
      }
    } catch (error) {
      console.log(error);
      thunkApi.dispatch(accountActions.loadingAccounts(false));
    } finally {
      setTimeout(() => {
        thunkApi.dispatch(accountActions.loadingAccounts(false));
        thunkApi.dispatch(accountActions.createNewAccountCompleted(true));
      }, 1500);
    }
  }
);

export const getExtras = createAsyncThunk("Get Extras", async (_, thunkApi) => {
  try {
    const { data: accountTypes } = await axiosClient(
      "/account_types",
      getConfig()
    );
    if (accountTypes) {
      thunkApi.dispatch(accountActions.getAllAccountTypes(accountTypes));
    }

    const { data: categories } = await axiosClient("/categories", getConfig());
    if (categories) {
      thunkApi.dispatch(accountActions.getAllCategories(categories));
    }

    const { data: banks } = await axiosClient("/banks", getConfig());
    if (banks) {
      thunkApi.dispatch(accountActions.getAllBanks(banks));
    }

    const { data: currencies } = await axiosClient("/currencies", getConfig());
    if (currencies) {
      thunkApi.dispatch(accountActions.getAllCurrencies(currencies));
    }
  } catch (error) {
    console.log(error);
  }
});

export const markAccountAsDeleted = createAsyncThunk(
  "Mark Account as Deleted",
  async (id_account, thunkApi) => {
    try {
      thunkApi.dispatch(accountActions.loadingAccounts(true));
      const { data } = await axiosClient.put(
        "/accounts",
        id_account,
        getConfig()
      );
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        thunkApi.dispatch(accountActions.loadingAccounts(false));
      }, 750);
    }
  }
);

export const getSigleAccountService = createAsyncThunk(
  "Get Single Account",
  async (account_id, thunkApi) => {
    try {
      thunkApi.dispatch(accountActions.getSingleAccount(account_id));
    } catch (error) {
      console.log(error);
    }
  }
);

export const destinationAccountService = createAsyncThunk(
  "Set Destination Account",
  async (account_id, thunkApi) => {
    try {
      thunkApi.dispatch(accountActions.setDestinationAccount(account_id));
    } catch (error) {
      console.log(error);
    }
  }
);
