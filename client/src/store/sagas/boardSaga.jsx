import { call, put, all, delay } from "redux-saga/effects";
import { boardApi } from "../api/api";
import { failGetInfo, getData, getView, getReply, loading } from "../boardSlice";

export function* handleBoardList(body) {
    try {
        const res = yield call(boardApi.list, body)
        yield put(getData(res));
    }
    catch (error) {
        yield put(failGetInfo(error));
    }
}

export function* handleBoardWrite(body) {
    const listUrl = body.url + '/1';
    let [res, res2] = [];
    try {
        if (body.payload.board_type === 'reply') {
            res = yield call(boardApi.write, body)
            yield put(getReply(res))

        } else {
            [res, res2] = yield all([
                call(boardApi.write, body),
                call(boardApi.list, listUrl)
            ]);

            yield put(getData(res));
        }
    }
    catch (error) {
        yield put(failGetInfo(error));
    }
}

export function* /* 이거되네.. */ handleViewContent(body) {
    try {
        const res = yield call(boardApi.view, body);
        yield put(getReply(res));
        yield put(getView(res));
    }
    catch (error) {
        yield put(failGetInfo(error));
    }
}

export function* handleModifyBoard(body) {
    try {
        yield call(boardApi.modify, body);
    } catch (error) {
        yield put(failGetInfo(error));
    }
}

export function* handleDeleteBoard(body) {
    try {
        const res = yield call(boardApi.delete, body);
        if (body.payload.w_id !== undefined)
            yield put(getReply(res))
    } catch (error) {
        yield put(failGetInfo(error))
    }
}