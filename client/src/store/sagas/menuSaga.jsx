import { call, put } from "redux-saga/effects";
import { commonAPi } from "../api/api";
import { failGetInfo, getMenu } from "../menuSlice";

export function* handleMenu(body) {
    try {
        const res = yield call(commonAPi.post, body)
        yield put(getMenu(res));
    }
    catch (error) {
        yield put(failGetInfo(error));
    }
}

export function* handleCreateMenu(body) {
    try {
        const res = yield call(commonAPi.post, body)
        yield put(getMenu(res));
    } catch (error) {
        yield put(failGetInfo(error))
    }
}