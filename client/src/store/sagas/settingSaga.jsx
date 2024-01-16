import { call, put } from "redux-saga/effects";
import { commonAPi } from "../api/api";
import { settingFail, getSetting,settingInfo} from "../settingSlice";
export function* handleSetting(body) {
    try {
        const res = yield body;
        yield put(settingInfo(res))
    } catch(error) {
        yield put(settingFail(error))
    }
}