import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  action: null,
  type: null,
  data: [],
  lookData: [],
  testData: {},
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    calendarInfo: (state, action) => {
      state.action = action.type;
    },
    notToday: (state, action) => {
      state.action = action.type;
    },
    testRequest: (state, action) => {
      state.action = action.type;
    },
    getCalendarData: (state, action) => {
      state.data = action.payload.data;
      state.lookData = action.payload.lookData;
    },
    getNotTodayData: (state, action) => {
      state.lookData = action.payload.lookData;
    },
    getTestResponse: (state, action) => {
      state.testData = action.payload.data;
    },
    lookDataReset: (state, action) => {
      state.lookData = initialState.lookData;
    },
  },
});

export const {
  calendarInfo,
  getCalendarData,
  notToday,
  getNotTodayData,
  lookDataReset,
  testRequest,
  getTestResponse,
} = calendarSlice.actions;
export default calendarSlice.reducer;
