import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_USERS,
  DELETE_USER,
  fetchUsers,
  deleteUser,
} from './actions';

// ==================== Mock API (백엔드 배포 전 임시) ====================
const mockUserAPI = {
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        resolve({ data: users });
      }, 300);
    });
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userToDelete = users.find(u => u.id === userId);

        // 대표는 삭제 불가
        if (userToDelete && userToDelete.position === '대표') {
          reject({ response: { data: { message: '대표 계정은 삭제할 수 없습니다.' } } });
          return;
        }

        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        resolve({ data: { id: userId } });
      }, 300);
    });
  }
};

// ==================== 사용자 목록 조회 ====================
function* fetchUsersSaga(action) {
  try {
    const response = yield call(mockUserAPI.getUsers, action.payload);
    yield put(fetchUsers.success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 목록을 불러오는데 실패했습니다.';
    yield put(fetchUsers.failure(errorMessage));
  }
}

// ==================== 사용자 삭제 ====================
function* deleteUserSaga(action) {
  try {
    const response = yield call(mockUserAPI.deleteUser, action.payload);
    yield put(deleteUser.success(response.data));

    // 삭제 후 목록 다시 조회
    yield put(fetchUsers.request());
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 삭제에 실패했습니다.';
    yield put(deleteUser.failure(errorMessage));
    alert(errorMessage);
  }
}

// ==================== Watcher Saga ====================
export default function* userSaga() {
  yield takeLatest(FETCH_USERS.REQUEST, fetchUsersSaga);
  yield takeEvery(DELETE_USER.REQUEST, deleteUserSaga);
}
