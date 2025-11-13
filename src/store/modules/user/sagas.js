import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { userAPI } from '../../../api';
import {
  FETCH_USERS,
  DELETE_USER,
  fetchUsers,
  deleteUser,
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

// ==================== Watcher Saga ====================
export default function* userSaga() {
  yield takeLatest(FETCH_USERS.REQUEST, fetchUsersSaga);
  yield takeEvery(DELETE_USER.REQUEST, deleteUserSaga);
}
