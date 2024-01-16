import { call, put } from "redux-saga/effects";
import { basicInfo, failGetInfo } from "../basicSlice";


export function* handleBasic(body) {
    try {
        console.log(body)
        yield put(basicInfo(body));
    }
    catch (error) {
        yield put(failGetInfo(error));
    }
}