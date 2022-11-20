import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axiosClient";
import { userActions } from "./userSlice";

export const loginUser = createAsyncThunk(
  "User login",
  async (user, thunkApi) => {
    try {
      const { data } = await axiosClient.post("/users/login", user);
      console.log(data);
      if (data) {
        thunkApi.dispatch(userActions.setLoggedUser(data));
      }
    } catch (error) {
      //console.log(error.response.data.msg);
      thunkApi.dispatch(
        userActions.setAlertMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  }
);
