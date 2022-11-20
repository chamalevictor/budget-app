import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authenticated: false,
  alert: { msg: "", error: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      state.user = action.payload;
      state.authenticated = true;
    },
    setAlertMessage(state, action) {
      state.alert.msg = action.payload.msg;
      state.alert.error = action.payload.error;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
