import { call, put, all, delay } from "redux-saga/effects";
import { commonAPi } from "../api/api";
import {
  getCalendarData,
  getAddPlanData,
  getTestResponse,
  getProjectInfo,
  getProjectCalendarInfo,
} from "../calendarSlice";

export function* handleCalendarInfo(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getCalendarData(res));
  } catch (error) {
    console.error(error);
  }
}

export function* handle_addPlan(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getAddPlanData(res));
  } catch (error) {
    console.error(error);
  }
}
export function* handle_testRequest(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getTestResponse(res));
  } catch (error) {
    console.error(error);
  }
}

export function* handleProjectInfo(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getProjectInfo(res));
  } catch (error) {
    console.error(error);
  }
}

export function* handleProjectCalendarInfo(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getProjectCalendarInfo(res));
  } catch (error) {
    console.error(error);
  }
}
