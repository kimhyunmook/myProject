import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  action: null,
  type: null,
  data: [],
  lookData: [],
  testData: [],
  projectData: [],
  projectExecution: [],
  memo: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    calendarInfo: (state, action) => {
      state.action = action.type;
    },
    addPlan: (state, action) => {
      state.action = action.type;
    },
    testRequest: (state, action) => {
      state.action = action.type;
    },
    getCalendarData: (state, action) => {
      state.data = action.payload.data;
      state.lookData = action.payload.lookData;
    },
    getAddPlanData: (state, action) => {
      state.lookData = action.payload.lookData;
    },
    getTestResponse: (state, action) => {
      state.testData = action.payload.data;
    },
    lookDataReset: (state, action) => {
      state.lookData = initialState.lookData;
    },

    _ProjectInfo: (state, action) => {
      state.action = action.type;
    },
    getProjectInfo: (state, action) => {
      state.projectData = action.payload.data;
    },
    _ProjectCalendarInfo: (state, action) => {
      state.action = action.type;
    },
    getProjectCalendarInfo: (state, action) => {
      state.projectExecution = action.payload.data;
    },

    // 전부 이걸로 변경 에정
    _ProjectMemo: (state, action) => {
      state.action = action.type;
    },
    getProjectMemo: (state, action) => {
      state.memo = action.payload.data;
      state.type = "memo/" + action.payload.condition;
    },
  },
});

export const {
  calendarInfo,
  getCalendarData,
  addPlan,
  getAddPlanData,
  lookDataReset,
  testRequest,
  getTestResponse,
  _ProjectInfo,
  getProjectInfo,
  _ProjectCalendarInfo,
  getProjectCalendarInfo,
  _ProjectMemo,
  getProjectMemo,
} = calendarSlice.actions;
export default calendarSlice.reducer;
