import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_ME,
  CHANGE_PASSWORD,
  CHANGE_POSITION,
  UPDATE_PERMISSIONS,
  login,
  logout,
  signup,
  getMe,
  changePassword,
  changePosition,
  updatePermissions
} from './actions';
import { fetchUsers } from '../user/actions';
import { authAPI, roleAPI } from '../../../api';

// ==================== Mock API (백엔드 배포 전 임시 - 사용 안 함) ====================
// 주석 처리: 백엔드 API 사용 중이므로 Mock API는 사용하지 않음
// const mockAPI = { ... };

function* loginSaga(action) {
  try {
    // 백엔드 API 형식에 맞게 데이터 변환
    // 백엔드: { username, password }
    const loginData = {
      username: action.payload.userId || action.payload.username || action.payload.email,
      password: action.payload.password,
    };
    
    console.log('🔐 로그인 요청:', loginData);
    const response = yield call(authAPI.login, loginData);
    console.log('✅ 로그인 응답:', response.data);
    
    // 백엔드 응답 형식: { message: "로그인 성공", user: { id, username, profile: {...} } }
    // 세션 기반 인증: 쿠키는 자동으로 설정되므로 localStorage에 저장하지 않음
    const userData = response.data?.user || response.data;
    const profile = userData?.profile || userData?.UserProfile || {};
    
    // UserProfile 중첩 객체 평탄화
    // role_id는 profile.role_id 또는 profile.role에서 가져올 수 있음
    const roleId = profile.role_id || userData?.role_id || profile.role || userData?.role || null;
    // permissions는 Role 객체에서 가져올 수 있음 (나중에 Role 정보를 조회해서 매핑)
    const permissions = userData?.permissions || profile?.permissions || userData?.profile?.permissions || null;
    
    const transformedUser = {
      id: userData.id || userData.username,
      username: userData.username || userData.id,
      name: profile.full_name || userData.name || '',
      email: profile.email || userData.email || '',
      phone: profile.phone_number || userData.phone || '',
      position: profile.position || userData.position || '',
      department: profile.department || userData.department || '',
      joinDate: profile.hire_date || userData.hire_date || userData.joinDate || '',
      role: profile.role || userData.role || 1,
      roleId: roleId, // role_id 추가
      signatureImageUrl: profile.signature_image_url || userData.signature_image_url || null,
      permissions: permissions, // permissions 정보 추가
      profile: profile,
      UserProfile: profile,
    };
    
    yield put(login.success({ user: transformedUser }));
  } catch (error) {
    console.error('❌ 로그인 실패:', error);
    const errorMessage = error.response?.data?.message || error.message || '로그인에 실패했습니다.';
    yield put(login.failure(errorMessage));
  }
}

function* logoutSaga() {
  try {
    // 백엔드 API 사용
    yield call(authAPI.logout);
    yield put(logout.success());
    
    // 로컬 Mock API (주석처리)
    // yield call(mockAPI.logout);
    // yield put(logout.success());
  } catch (error) {
    yield put(logout.success());
  }
}

function* signupSaga(action) {
  try {
    // 백엔드 API 형식에 맞게 데이터 변환
    // 백엔드: { full_name, phone_number, email, hire_date, position, department, role, username, password }
    const signupData = {
      full_name: action.payload.name,
      phone_number: action.payload.phone,
      email: action.payload.email,
      hire_date: action.payload.hireDate || new Date().toISOString().split('T')[0],
      position: action.payload.position || '',
      department: action.payload.department || '',
      role: action.payload.role || 1,
      username: action.payload.userId || action.payload.email,
      password: action.payload.password,
    };
    
    const response = yield call(authAPI.signup, signupData);
    
    // 백엔드 응답 형식: { message: "회원가입 성공", user: { id, username } }
    yield put(signup.success(response.data));
  } catch (error) {
    yield put(signup.failure(error.response?.data?.message || '회원가입에 실패했습니다.'));
  }
}

/**
 * ==================== 현재 사용자 조회 Saga ====================
 */
function* getMeSaga() {
  try {
    // 백엔드 API 사용
    const response = yield call(authAPI.getMe);
    
    // 백엔드 응답 형식: { message: "사용자 정보 조회 성공", user: { id, profile: {...} } }
    const userData = response.data?.user || response.data;
    const profile = userData?.profile || userData?.UserProfile || {};
    
    // 프론트엔드 형식으로 변환 (UserProfile 중첩 객체 평탄화)
    // role_id는 profile.role_id 또는 profile.role에서 가져올 수 있음
    const roleId = profile.role_id || userData?.role_id || profile.role || userData?.role || null;
    // permissions는 Role 객체에서 가져올 수 있음 (나중에 Role 정보를 조회해서 매핑)
    const permissions = userData?.permissions || profile?.permissions || userData?.profile?.permissions || null;
    
    const transformedUser = {
      id: userData.id || userData.username,
      username: userData.username || userData.id,
      name: profile.full_name || userData.name || '',
      email: profile.email || userData.email || '',
      phone: profile.phone_number || userData.phone || '',
      position: profile.position || userData.position || '',
      department: profile.department || userData.department || '',
      joinDate: profile.hire_date || userData.hire_date || userData.joinDate || '',
      role: profile.role || userData.role || 1,
      roleId: roleId, // role_id 추가
      signatureImageUrl: profile.signature_image_url || userData.signature_image_url || null,
      permissions: permissions, // permissions 정보 추가
      profile: profile,
      UserProfile: profile,
    };
    
    yield put(getMe.success({ user: transformedUser }));
  } catch (error) {
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      console.log('⚠️ getMeSaga: 401 에러 감지, 로그인 페이지로 리다이렉트');
      // Redux 상태를 초기화
      yield put(logout.success());
      // localStorage 초기화
      if (typeof window !== 'undefined') {
        // 세션 기반 인증: 쿠키는 백엔드에서 제거됨
        localStorage.removeItem('currentUser');
        localStorage.removeItem('users'); // 임시 데이터 정리
        // 로그인 페이지로 강제 리다이렉트 (replace 사용하여 히스토리 스택에서 제거)
        if (window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      }
      return;
    }
    yield put(getMe.failure(error.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.'));
  }
}

/**
 * ==================== 비밀번호 변경 Saga ====================
 */
function* changePasswordSaga(action) {
  try {
    // 백엔드 API 사용
    // 현재 사용자 정보 가져오기
    const currentUser = yield select((state) => state.auth.user);
    if (!currentUser?.id) {
      yield put(changePassword.failure('사용자 정보를 찾을 수 없습니다.'));
      return;
    }
    
    const response = yield call(authAPI.changePassword, {
      userId: currentUser.id,
      newPassword: action.payload.newPassword,
    });
    yield put(changePassword.success(response.data));
    
    // 로컬 Mock API (주석처리)
    // const response = yield call(mockAPI.changePassword, action.payload);
    // yield put(changePassword.success(response.data));
  } catch (error) {
    yield put(changePassword.failure(error.response?.data?.message || '비밀번호 변경에 실패했습니다.'));
  }
}

/**
 * ==================== 직급 변경 Saga ====================
 * PUT /auth/:id { position: string }
 */
function* changePositionSaga(action) {
  try {
    // 백엔드 API 사용
    // PUT /auth/:id { position: string }
    const { userId, position } = action.payload;
    const response = yield call(authAPI.updateUser, userId, { position });
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(changePosition.success(response.data));
    
    // 사용자 정보 다시 조회
    yield put(getMe.request());
  } catch (error) {
    yield put(changePosition.failure(error.response?.data?.message || '직급 변경에 실패했습니다.'));
  }
}

/**
 * ==================== 권한 업데이트 Saga ====================
 * PUT /api/roles/:roleId/permissions { permissions: object }
 * 
 * 프론트엔드 권한 이름 → 백엔드 권한 이름 매핑:
 * - basic → can_basic_info
 * - receiving → can_receiving
 * - manufacturing → can_plant1_preprocess, can_plant_transfer, can_plant2_manufacture (3개 모두 업데이트)
 * - inventory → can_inventory
 * - shipping → can_shipping
 * - label → can_label
 * - user → can_user_management
 * - dash, approval → 권한 없음 (제외)
 */
function* updatePermissionsSaga(action) {
  try {
    const { userId, roleId: providedRoleId, permissions: frontendPermissions } = action.payload;
    console.log('🔐 권한 업데이트 요청:', { userId, providedRoleId, frontendPermissions });
    
    // 사용자 목록 가져오기
    const usersState = yield select((state) => state.user.users);
    const usersList = usersState?.data || [];
    
    console.log('📋 사용자 목록 상태:', { 
      hasUsers: !!usersState, 
      hasData: !!usersState?.data, 
      usersCount: usersList.length,
      allUsers: usersList.map(u => ({ 
        id: u.id, 
        name: u.name, 
        roleId: u.roleId, 
        role_id: u.role_id,
        role: u.role 
      }))
    });
    
    // 선택한 사용자 찾기 (userId로 검색)
    const selectedUser = usersList.find((u) => u.id === userId);
    
    if (!selectedUser) {
      console.error('❌ 사용자를 찾을 수 없습니다:', { 
        requestedUserId: userId, 
        availableUserIds: usersList.map(u => u.id),
        usersList: usersList.map(u => ({ id: u.id, name: u.name }))
      });
      throw new Error(`사용자를 찾을 수 없습니다. (userId: ${userId})`);
    }
    
    console.log('✅ 선택한 사용자 찾음:', { 
      userId: selectedUser.id, 
      name: selectedUser.name, 
      roleId: selectedUser.roleId,
      role_id: selectedUser.role_id,
      role: selectedUser.role,
      UserProfile: selectedUser.UserProfile,
    });
    
    // 현재 로그인한 사용자 정보 (혼동 방지)
    const currentUser = yield select((state) => state.auth.user);
    console.log('👤 현재 로그인한 사용자:', { 
      id: currentUser?.id, 
      name: currentUser?.name,
      roleId: currentUser?.roleId,
    });
    
    // role_id 확인: payload에서 제공된 roleId 우선, 없으면 사용자 정보에서 찾기
    const roleId = providedRoleId || 
                   selectedUser.roleId || 
                   selectedUser.role_id || 
                   selectedUser.profile_id || 
                   selectedUser.UserProfile?.role_id || 
                   selectedUser.profile?.role_id || 
                   selectedUser.role || 
                   selectedUser.UserProfile?.role;
    
    if (!roleId) {
      console.error('❌ role_id를 찾을 수 없습니다:', { 
        selectedUserId: selectedUser.id,
        selectedUserName: selectedUser.name,
        selectedUser: selectedUser,
        UserProfile: selectedUser.UserProfile,
        profile: selectedUser.profile,
        providedRoleId
      });
      throw new Error(`사용자의 역할(role_id)을 찾을 수 없습니다. (userId: ${userId}, name: ${selectedUser.name})`);
    }
    
    console.log('✅ role_id 최종 확인:', { 
      selectedUserId: selectedUser.id, 
      selectedUserName: selectedUser.name, 
      roleId, 
      providedRoleId,
      fromUser: selectedUser.roleId || selectedUser.role_id || selectedUser.role,
      willUpdateRoleId: roleId
    });
    
    // 프론트엔드 권한 이름을 백엔드 권한 이름으로 매핑
    const backendPermissions = {};
    
    // basic → can_basic_info
    if ('basic' in frontendPermissions) {
      backendPermissions.can_basic_info = frontendPermissions.basic;
    }
    
    // receiving → can_receiving
    if ('receiving' in frontendPermissions) {
      backendPermissions.can_receiving = frontendPermissions.receiving;
    }
    
    // manufacturing → can_plant1_preprocess, can_plant_transfer, can_plant2_manufacture (3개 모두)
    if ('manufacturing' in frontendPermissions) {
      const manufacturingValue = frontendPermissions.manufacturing;
      backendPermissions.can_plant1_preprocess = manufacturingValue;
      backendPermissions.can_plant_transfer = manufacturingValue;
      backendPermissions.can_plant2_manufacture = manufacturingValue;
    }
    
    // inventory → can_inventory
    if ('inventory' in frontendPermissions) {
      backendPermissions.can_inventory = frontendPermissions.inventory;
    }
    
    // shipping → can_shipping
    if ('shipping' in frontendPermissions) {
      backendPermissions.can_shipping = frontendPermissions.shipping;
    }
    
    // label → can_label
    if ('label' in frontendPermissions) {
      backendPermissions.can_label = frontendPermissions.label;
    }
    
    // user → can_user_management
    if ('user' in frontendPermissions) {
      backendPermissions.can_user_management = frontendPermissions.user;
    }
    
    // dash, approval는 백엔드 권한에 없으므로 제외
    
    console.log('🔄 백엔드 권한 매핑:', { roleId, backendPermissions });
    
    // PUT /api/roles/:roleId/permissions 호출
    const response = yield call(roleAPI.updatePermissions, roleId, backendPermissions);
    console.log('✅ 권한 업데이트 응답:', response.data);
    
    // 백엔드 응답 확인
    const updatedRole = response.data?.data || response.data;
    console.log('✅ 업데이트된 역할 정보:', updatedRole);
    
    yield put(updatePermissions.success(response.data));
    
    // 권한 업데이트 후 사용자 목록 다시 조회
    yield put(fetchUsers.request());
    
    // 성공 메시지 표시
    const permissionCount = Object.values(frontendPermissions).filter(Boolean).length;
    const totalCount = Object.keys(frontendPermissions).length;
    console.log(`✅ 권한이 업데이트되었습니다. (${permissionCount}/${totalCount} 권한 활성화)`);
    
    // 현재 사용자의 권한을 변경한 경우 getMe로 현재 사용자 정보 갱신
    // (위에서 이미 currentUser를 선언했으므로 재사용)
    if (currentUser && currentUser.id === userId) {
      yield put(getMe.request());
    }
  } catch (error) {
    console.error('❌ 권한 업데이트 실패:', error);
    console.error('❌ 에러 상세:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage = error.response?.data?.message || error.message || '권한 업데이트에 실패했습니다.';
    yield put(updatePermissions.failure(errorMessage));
    alert(`권한 업데이트 실패: ${errorMessage}`);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN.REQUEST, loginSaga);

  yield takeLatest(LOGOUT.REQUEST, logoutSaga);

  yield takeLatest(SIGNUP.REQUEST, signupSaga);

  yield takeLatest(GET_ME.REQUEST, getMeSaga);

  yield takeLatest(CHANGE_PASSWORD.REQUEST, changePasswordSaga);

  yield takeLatest(CHANGE_POSITION.REQUEST, changePositionSaga);

  yield takeLatest(UPDATE_PERMISSIONS.REQUEST, updatePermissionsSaga);
}
