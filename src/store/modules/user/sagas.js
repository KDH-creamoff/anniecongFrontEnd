import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_USERS,
  DELETE_USER,
  fetchUsers,
  deleteUser,
} from './actions';
import { userAPI } from '../../../api';

// ==================== Mock API (백엔드 배포 전 임시 - 사용 안 함) ====================
// 주석 처리: 백엔드 API 사용 중이므로 Mock API는 사용하지 않음
// const mockUserAPI = { ... };

// ==================== 사용자 목록 조회 ====================
function* fetchUsersSaga(action) {
  try {
    // 백엔드 API 사용
    // GET /api/auth/ 응답 형식: { message: "사용자 목록 조회 성공", users: [{ id, UserProfile: {...} }] }
    const response = yield call(userAPI.getUsers, action.payload);
    
    // 백엔드 응답 형식에 맞게 변환
    const usersData = response.data?.users || response.data?.data || response.data || [];
    const usersArray = Array.isArray(usersData) ? usersData : [];
    
    // UserProfile 중첩 객체 평탄화
    const transformedUsers = usersArray.map((user) => {
      const profile = user.UserProfile || user.profile || {};
      // role_id는 profile.role 또는 user.role_id에서 가져올 수 있음
      const roleId = profile.role_id || user.role_id || profile.role || user.role || null;
      // permissions는 Role 객체에서 가져올 수 있음 (나중에 Role 정보를 조회해서 매핑)
      const permissions = user.permissions || profile.permissions || user.UserProfile?.permissions || null;
      
      return {
        id: user.id || user.username,
        username: user.username || user.id,
        name: profile.full_name || user.name || '',
        email: profile.email || user.email || '',
        phone: profile.phone_number || user.phone || '',
        position: profile.position || user.position || '',
        department: profile.department || user.department || '',
        joinDate: profile.hire_date || user.hire_date || user.joinDate || '',
        role: profile.role || user.role || 1,
        roleId: roleId, // role_id 추가
        permissions: permissions, // permissions 정보 추가
        profile: profile,
        UserProfile: profile,
      };
    });
    
    yield put(fetchUsers.success({ data: transformedUsers }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || '사용자 목록을 불러오는데 실패했습니다.';
    yield put(fetchUsers.failure(errorMessage));
  }
}

// ==================== 사용자 삭제 ====================
function* deleteUserSaga(action) {
  try {
    // 백엔드 API 사용
    const response = yield call(userAPI.deleteUser, action.payload);
    yield put(deleteUser.success(response.data));
    // 삭제 후 목록 다시 조회
    yield put(fetchUsers.request());
    
    // 로컬 Mock API (주석처리)
    // const response = yield call(mockUserAPI.deleteUser, action.payload);
    // yield put(deleteUser.success(response.data));
    // yield put(fetchUsers.request());
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
