import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    loading: false,
    data: {},
    last_operation: "",
  },
  reducers: {
    /** ACTIONS */
    _Login: (state, action) => {
      delete state.error;
      state.loading = true;
      state.last_operation = action.type;
    },
    _Logout: (state, action) => {
      delete state.error;
      state.loading = true;
      state.last_operation = action.type;
    },
    _Edit: (state, action) => {
      state.loading = false;
      state.last_operation = action.type;
      state.edit = action.payload.edit;
    },
    _Delete: (state, action) => {
      state.loading = false;
      state.login = false;
      state.last_operation = action.type;
      state.data = {};
    },
    _Register: (state, action) => {
      state.last_operation = action.type;
    },
    _Project: (state, action) => {
      state.last_operation = action.type;
    },

    /** RESULT */
    getUser: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.login = action.payload.login;
      state.message = action.payload.message;
    },
    failedGetUser(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.login = false;
    },
  },
});

export const {
  getUser,
  failedGetUser,
  _Login,
  _Logout,
  _Edit,
  _Delete,
  _Register,
  _Project,
} = userSlice.actions;
export default userSlice.reducer;
