import { takeLatest, takeEvery } from "redux-saga/effects";
import {
  handleEditUser,
  handleLogOutUser,
  handleLoginUser,
  handleDeleteUser,
  handleRegisterUser,
  handleProject,
} from "../sagas/userSaga";
import {
  _Login,
  _Edit,
  _Logout,
  _Delete,
  _Register,
  _Project,
} from "../userSlice";
import { _Condtion, _CreateMenu } from "../menuSlice";
import { handleCreateMenu, handleMenu } from "./menuSaga";
import {
  _DeleteTarget,
  _GetList,
  _InsertWrite,
  _Modify,
  _ViewContent,
} from "../boardSlice";
import {
  handleBoardList,
  handleBoardWrite,
  handleDeleteBoard,
  handleModifyBoard,
  handleViewContent,
} from "./boardSaga";
import { basicInfo } from "../basicSlice";
import { handleBasic } from "./basicSaga";
import { _GetLike } from "../likeSlice";
import { handleLike } from "./likeSaga";
// import { getSetting } from "../settingSlice";
import {
  _ProjectCalendarInfo,
  _ProjectInfo,
  addPlan,
  calendarInfo,
  testRequest,
} from "../calendarSlice";
import {
  handleCalendarInfo,
  handleProjectCalendarInfo,
  handleProjectInfo,
  handle_addPlan,
  handle_testRequest,
} from "./calendarSaga";

export default function* rootSaga() {
  yield [
    // user
    yield takeLatest(_Login.type, handleLoginUser),
    yield takeLatest(_Logout.type, handleLogOutUser),
    yield takeLatest(_Edit.type, handleEditUser),
    yield takeLatest(_Delete.type, handleDeleteUser),
    yield takeLatest(_Register.type, handleRegisterUser),
    yield takeLatest(_Project.type, handleProject),

    //menu
    yield takeLatest(_Condtion.type, handleMenu),
    yield takeLatest(_CreateMenu.type, handleCreateMenu),

    //board
    yield takeLatest(_GetList.type, handleBoardList),
    yield takeLatest(_InsertWrite.type, handleBoardWrite),
    yield takeLatest(_ViewContent.type, handleViewContent),
    yield takeLatest(_Modify.type, handleModifyBoard),
    yield takeLatest(_DeleteTarget.type, handleDeleteBoard),

    //baisc
    yield takeLatest(basicInfo.type, handleBasic),

    //like
    yield takeLatest(_GetLike.type, handleLike),

    // yield takeLatest(getSetting, handleSetting),

    //calendar
    yield takeLatest(calendarInfo.type, handleCalendarInfo),
    yield takeLatest(addPlan.type, handle_addPlan),
    yield takeLatest(testRequest.type, handle_testRequest),
    yield takeLatest(_ProjectInfo.type, handleProjectInfo),
    yield takeLatest(_ProjectCalendarInfo.type, handleProjectCalendarInfo),
  ];
}
