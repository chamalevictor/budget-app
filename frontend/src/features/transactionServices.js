import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionActions } from "./transactionSlice.js";
import axiosClient from "../config/axiosClient";

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

export const getAllTransactions = createAsyncThunk(
  "Get all transactions",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(transactionActions.loadingTransactions(true));
      const { data } = await axiosClient("/transactions", getConfig());
      if (data) {
        thunkApi.dispatch(transactionActions.getTransactions(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        thunkApi.dispatch(transactionActions.loadingTransactions(false));
        thunkApi.dispatch(transactionActions.transactionCompleted(false));
        thunkApi.dispatch(transactionActions.transferCompleted(false));
      }, 750);
    }
  }
);

export const newTransaction = createAsyncThunk(
  "New Transaction",
  async (newTransaction, thunkApi) => {
    try {
      thunkApi.dispatch(transactionActions.loadingTransactions(true));
      const { data } = await axiosClient.post(
        "/transactions",
        newTransaction,
        getConfig()
      );
      if (data) {
        thunkApi.dispatch(transactionActions.newTransaction(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        thunkApi.dispatch(transactionActions.loadingTransactions(false));
        thunkApi.dispatch(transactionActions.transactionCompleted(true));
      }, 1000);
    }
  }
);
export const newTransfer = createAsyncThunk(
  "New Transaction",
  async (newTransferObj, thunkApi) => {
    try {
      const { data } = await axiosClient.post(
        "/transactions/transfer",
        newTransferObj,
        getConfig()
      );
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(transactionActions.loadingTransactions(false));
      thunkApi.dispatch(transactionActions.transferCompleted(true));
    }
  }
);
