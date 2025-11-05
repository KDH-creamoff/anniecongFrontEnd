import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { userAPI } from '../../../api';
import {
  FETCH_USERS,
  FETCH_USER_DETAIL,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_ACCESS_LOGS,
  fetchUsers,
  fetchUserDetail,
  createUser,
  updateUser,
  deleteUser,
  fetchAccessLogs,
} from './actions';

// ==================== 사용자 목록 조회 ====================
function* fetchUsersSaga(action) {
  try {
    const response = yield call(userAPI.getUsers, action.payload);
    yield put(fetchUsers.success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 목록을 불러오는데 실패했습니다.';
    yield put(fetchUsers.failure(errorMessage));
  }
}

// ==================== 사용자 상세 조회 ====================
function* fetchUserDetailSaga(action) {
  try {
    const response = yield call(userAPI.getUserById, action.payload);
    yield put(fetchUserDetail.success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.';
    yield put(fetchUserDetail.failure(errorMessage));
  }
}

// ==================== 사용자 생성 ====================
function* createUserSaga(action) {
  try {
    const response = yield call(userAPI.createUser, action.payload);
    yield put(createUser.success(response.data));

    // 성공 후 목록 새로고침
    yield put(fetchUsers.request());
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 생성에 실패했습니다.';
    yield put(createUser.failure(errorMessage));
  }
}

// ==================== 사용자 수정 ====================
function* updateUserSaga(action) {
  try {
    const { id, ...userData } = action.payload;
    const response = yield call(userAPI.updateUser, id, userData);
    yield put(updateUser.success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 수정에 실패했습니다.';
    yield put(updateUser.failure(errorMessage));
  }
}

// ==================== 사용자 삭제 ====================
function* deleteUserSaga(action) {
  try {
    yield call(userAPI.deleteUser, action.payload);
    yield put(deleteUser.success({ id: action.payload }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 삭제에 실패했습니다.';
    yield put(deleteUser.failure(errorMessage));
  }
}

// ==================== 접근 로그 조회 ====================
function* fetchAccessLogsSaga(action) {
  try {
    const response = yield call(userAPI.getAccessLogs, action.payload);
    yield put(fetchAccessLogs.success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '접근 로그를 불러오는데 실패했습니다.';
    yield put(fetchAccessLogs.failure(errorMessage));
  }
}

// ==================== Watcher Saga ====================
export default function* userSaga() {
  yield takeLatest(FETCH_USERS.REQUEST, fetchUsersSaga);
  yield takeLatest(FETCH_USER_DETAIL.REQUEST, fetchUserDetailSaga);
  yield takeEvery(CREATE_USER.REQUEST, createUserSaga);
  yield takeEvery(UPDATE_USER.REQUEST, updateUserSaga);
  yield takeEvery(DELETE_USER.REQUEST, deleteUserSaga);
  yield takeLatest(FETCH_ACCESS_LOGS.REQUEST, fetchAccessLogsSaga);
}
