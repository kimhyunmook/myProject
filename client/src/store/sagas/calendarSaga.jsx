import { call, put, all, delay } from "redux-saga/effects";
import { commonAPi } from "../api/api";
import { calendarInfo, getCalendarData } from "../calendarSlice";

export function* handleCalendarInfo(body) {
  try {
    const res = yield call(commonAPi.post, body);
    console.log("RES", res);
    yield put(getCalendarData(res));
  } catch (error) {
    console.error(error);
  }
}
