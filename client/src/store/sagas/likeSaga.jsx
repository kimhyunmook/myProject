import { call, put, all } from "redux-saga/effects";
import { commonAPi } from "../api/api";
import { _GetLike, getLikeData } from "../likeSlice";

export function* handleLike(body) {
    try {
        const res = yield call(commonAPi.post, body);
        yield put(getLikeData(res));
    }
    catch {
        console.error('like error');
    }
}