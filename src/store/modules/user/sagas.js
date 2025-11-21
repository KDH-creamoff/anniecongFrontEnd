import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_USERS,
  DELETE_USER,
  fetchUsers,
  deleteUser,
} from './actions';
import { userAPI, roleAPI } from '../../../api';

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
    
    // UserProfile 중첩 객체 평탄화 및 Role 정보로 permissions 매핑
    const transformedUsers = [];
    for (const user of usersArray) {
      const profile = user.UserProfile || user.profile || {};
      // role_id는 profile.role_id 또는 user.role_id에서만 가져오기 (role 코드가 아닌 role_id만 사용)
      const roleId = profile.role_id || user.role_id || null;
      
      // Role 정보를 가져와서 permissions 매핑
      let permissions = null;
      if (roleId) {
        try {
          const roleResponse = yield call(roleAPI.getRoleById, roleId);
          const role = roleResponse.data?.data || roleResponse.data;
          if (role) {
            // 백엔드 Role 권한 필드를 프론트엔드 permissions 객체로 변환
            permissions = {
              basic: role.can_basic_info || false,
              receiving: role.can_receiving || false,
              manufacturing: role.can_plant1_preprocess || role.can_plant_transfer || role.can_plant2_manufacture || false,
              inventory: role.can_inventory || false,
              shipping: role.can_shipping || false,
              label: role.can_label || false,
              quality: role.can_quality || false,
              user: role.can_user_management || false,
              dash: true, // 대시보드는 항상 허용 (백엔드 권한 없음)
              approval: true, // 전자결재는 항상 허용 (백엔드 권한 없음)
            };
          }
        } catch (roleError) {
          console.warn(`⚠️ 사용자 ${user.id}의 Role 정보 조회 실패:`, roleError);
          // Role 조회 실패 시 기본값 사용
        }
      }
      
      // Role에서 가져온 permissions가 없으면 기존 방식 사용
      if (!permissions) {
        permissions = user.permissions || profile.permissions || user.UserProfile?.permissions || null;
      }
      
      transformedUsers.push({
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
      });
    }
    
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
