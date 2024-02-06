import { call, put } from "redux-saga/effects";
import { getUser, failedGetUser, _Register } from "../userSlice";
import { login, logout, register, userDelete, userEdit } from "../api/userAPi";
import { commonAPi } from "../api/api";

export function* handleProject(body) {
  try {
    const res = yield call(commonAPi.post, body);
    yield put(getUser(res));
  } catch (error) {
    yield put(failedGetUser(error));
  }
}

export function* handleLoginUser(body) {
  try {
    const res = yield call(login, body);
    if (res.message === "PW_ERROR") yield alert("pw error");
    switch (res.message) {
      case "PW_ERROR":
        yield alert("pw 틀렸습니다.");
        break;
      case "ID_NO_EXIST":
        yield alert("ID가 존재하지 않습니다.");
        break;
    }
    yield put(getUser(res));
  } catch (error) {
    yield put(failedGetUser(error));
  }
}

export function* handleLogOutUser(body) {
  try {
    const res = yield call(logout, body);
    if (res.message === "LOGOUT_SUCCESS") {
    }
    yield put(getUser(res));
  } catch (error) {
    yield put(failedGetUser(error));
  }
}

export function* handleEditUser(body) {
  try {
    const res = yield call(userEdit, body);
    yield put(getUser(res));
  } catch (error) {
    yield put(failedGetUser(error));
  }
}

export function* handleDeleteUser(body) {
  try {
    yield call(userDelete, body);
  } catch (error) {
    yield put(failedGetUser(error));
  }
}

export function* handleRegisterUser(body) {
  try {
    yield call(register, body);
  } catch (error) {
    yield put(failedGetUser(error));
  }
}
