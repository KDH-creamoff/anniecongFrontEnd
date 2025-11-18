import { call, put, takeLatest } from 'redux-saga/effects';
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

// ==================== 초기 사용자 데이터 설정 ====================
// 앱 시작 시 임시 사용자 데이터 생성
const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem('users');

  // 이미 사용자 데이터가 있으면 기존 데이터 확인 및 업데이트
  if (existingUsers) {
    const users = JSON.parse(existingUsers);
    let needsUpdate = false;

    // 각 사용자의 permissions 필드 확인 및 추가
    const updatedUsers = users.map(user => {
      if (!user.permissions) {
        needsUpdate = true;
        return {
          ...user,
          permissions: user.position === '대표' ? {
            dash: true,
            basic: true,
            receiving: true,
            manufacturing: true,
            inventory: true,
            shipping: true,
            approval: true,
            label: true,
            user: true
          } : {
            dash: false,
            basic: false,
            receiving: false,
            manufacturing: false,
            inventory: false,
            shipping: false,
            approval: false,
            label: false,
            user: false
          }
        };
      }
      return user;
    });

    if (needsUpdate) {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('기존 사용자 데이터에 permissions 필드가 추가되었습니다.');
    }
    return;
  }

  const initialUsers = [
    {
      id: 'admin@kitae.com',
      email: 'admin@kitae.com',
      password: 'admin@123456',
      name: '관리자',
      phone: '010-1234-5678',
      position: '대표',
      department: '경영지원',
      joinDate: '2024-01-01',
      permissions: {
        dash: true,
        basic: true,
        receiving: true,
        manufacturing: true,
        inventory: true,
        shipping: true,
        approval: true,
        label: true,
        user: true
      }
    },
    {
      id: 'user1@kitae.com',
      email: 'user1@kitae.com',
      password: 'user123',
      name: '김직원',
      phone: '010-2345-6789',
      position: '직원',
      department: '생산',
      joinDate: '2024-02-15',
      permissions: {
        dash: false,
        basic: false,
        receiving: false,
        manufacturing: false,
        inventory: false,
        shipping: false,
        approval: false,
        label: false,
        user: false
      }
    },
    {
      id: 'user2@kitae.com',
      email: 'user2@kitae.com',
      password: 'user456',
      name: '이사원',
      phone: '010-3456-7890',
      position: '알바',
      department: '경영지원',
      joinDate: '2024-03-20',
      permissions: {
        dash: false,
        basic: false,
        receiving: false,
        manufacturing: false,
        inventory: false,
        shipping: false,
        approval: false,
        label: false,
        user: false
      }
    }
  ];

  localStorage.setItem('users', JSON.stringify(initialUsers));
  console.log('임시 사용자 데이터가 생성되었습니다.');
};

// 앱 시작 시 초기화 실행
initializeMockUsers();

// ==================== Mock API (백엔드 배포 전 임시) ====================
const mockAPI = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (user) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          resolve({ data: { user: userWithoutPassword } });
        } else {
          reject({ response: { data: { message: '아이디 또는 비밀번호가 일치하지 않습니다.' } } });
        }
      }, 500);
    });
  },

  signup: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const isDuplicate = users.some(u => u.email === userData.email || u.id === userData.userId);

        if (isDuplicate) {
          reject({ response: { data: { message: '이미 존재하는 이메일 또는 아이디입니다.' } } });
        } else {
          // 새 사용자 생성 - userId를 id로, hireDate를 joinDate로 매핑
          const newUser = {
            id: userData.userId || userData.email,
            email: userData.email,
            password: userData.password,
            name: userData.name,
            phone: userData.phone,
            position: userData.position,
            department: userData.department,
            joinDate: userData.hireDate || new Date().toISOString().split('T')[0],
            // 기본 권한 설정 (모두 false)
            permissions: {
              dash: false,
              basic: false,
              receiving: false,
              manufacturing: false,
              inventory: false,
              shipping: false,
              approval: false,
              label: false,
              user: false
            }
          };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          const { password, ...userWithoutPassword } = newUser;
          resolve({ data: { user: userWithoutPassword } });
        }
      }, 500);
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        resolve({ data: { message: '로그아웃 성공' } });
      }, 300);
    });
  },

  getMe: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          resolve({ data: { user: JSON.parse(currentUser) } });
        } else {
          reject({ response: { data: { message: '인증이 필요합니다.' }, status: 401 } });
        }
      }, 300);
    });
  },

  changePassword: (passwordData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
          reject({ response: { data: { message: '인증이 필요합니다.' }, status: 401 } });
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex !== -1 && users[userIndex].password === passwordData.currentPassword) {
          users[userIndex].password = passwordData.newPassword;
          localStorage.setItem('users', JSON.stringify(users));
          resolve({ data: { message: '비밀번호가 변경되었습니다.' } });
        } else {
          reject({ response: { data: { message: '현재 비밀번호가 일치하지 않습니다.' } } });
        }
      }, 500);
    });
  },

  // PUT /auth/:id - 사용자 정보 업데이트 (직급, 권한 등)
  updateUser: (userId, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
          reject({ response: { data: { message: '인증이 필요합니다.' }, status: 401 } });
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex !== -1) {
          // 변경된 필드만 업데이트
          users[userIndex] = {
            ...users[userIndex],
            ...updateData
          };
          localStorage.setItem('users', JSON.stringify(users));

          // 현재 사용자 정보도 업데이트
          if (currentUser.id === userId) {
            const updatedCurrentUser = { ...currentUser, ...updateData };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
          }

          resolve({ data: { user: users[userIndex] } });
        } else {
          reject({ response: { data: { message: '사용자를 찾을 수 없습니다.' } } });
        }
      }, 500);
    });
  },

};

function* loginSaga(action) {
  try {
    const response = yield call(mockAPI.login, action.payload);
    yield put(login.success(response.data));
  } catch (error) {
    yield put(login.failure(error.response?.data?.message || '로그인에 실패했습니다.'));
  }
}

function* logoutSaga() {
  try {
    yield call(mockAPI.logout);

    yield put(logout.success());
  } catch (error) {
    yield put(logout.success());
  }
}

function* signupSaga(action) {
  try {
    const response = yield call(mockAPI.signup, action.payload);

    yield put(signup.success(response.data));

  } catch (error) {
    // 3. 실패 액션 디스패치
    yield put(signup.failure(error.response?.data?.message || '회원가입에 실패했습니다.'));
  }
}

/**
 * ==================== 현재 사용자 조회 Saga ====================
 */
function* getMeSaga() {
  try {
    const response = yield call(mockAPI.getMe);
    yield put(getMe.success(response.data));
  } catch (error) {
    yield put(getMe.failure(error.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.'));
  }
}

/**
 * ==================== 비밀번호 변경 Saga ====================
 */
function* changePasswordSaga(action) {
  try {
    const response = yield call(mockAPI.changePassword, action.payload);
    yield put(changePassword.success(response.data));
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
    const { userId, position } = action.payload;
    const response = yield call(mockAPI.updateUser, userId, { position });

    yield put(changePosition.success(response.data));

    yield put(getMe.request());
  } catch (error) {
    yield put(changePosition.failure(error.response?.data?.message || '직급 변경에 실패했습니다.'));
  }
}

/**
 * ==================== 권한 업데이트 Saga ====================
 * PUT /auth/:id { permissions: object }
 */
function* updatePermissionsSaga(action) {
  try {
    const { userId, permissions } = action.payload;
    const response = yield call(mockAPI.updateUser, userId, { permissions });

    yield put(updatePermissions.success(response.data));

    yield put(getMe.request());
  } catch (error) {
    yield put(updatePermissions.failure(error.response?.data?.message || '권한 업데이트에 실패했습니다.'));
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
