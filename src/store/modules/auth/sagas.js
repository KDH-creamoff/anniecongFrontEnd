import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { authAPI, userAPI } from '../../../api';
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_ME,
  CHANGE_PASSWORD,
  CHANGE_POSITION,
  login,
  logout,
  signup,
  getMe,
  changePassword,
  changePosition
} from './actions';

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
        const isDuplicate = users.some(u => u.email === userData.email);

        if (isDuplicate) {
          reject({ response: { data: { message: '이미 존재하는 이메일입니다.' } } });
        } else {
          const newUser = {
            id: Date.now(),
            ...userData,
            joinDate: new Date().toISOString().split('T')[0]
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

  changePosition: (positionData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
          reject({ response: { data: { message: '인증이 필요합니다.' }, status: 401 } });
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === positionData.userId);

        if (userIndex !== -1) {
          users[userIndex].position = positionData.position;
          localStorage.setItem('users', JSON.stringify(users));

          // 현재 사용자 정보도 업데이트
          if (currentUser.id === positionData.userId) {
            currentUser.position = positionData.position;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }

          resolve({ data: { user: users[userIndex] } });
        } else {
          reject({ response: { data: { message: '사용자를 찾을 수 없습니다.' } } });
        }
      }, 500);
    });
  }
};

/**
 * ==================== Redux Saga란? ====================
 *
 * 왜 Saga를 사용하나요?
 * - API 호출 같은 비동기 작업을 깔끔하게 처리
 * - 컴포넌트에서 비동기 로직을 분리 (관심사의 분리)
 * - 테스트하기 쉬움
 *
 * Saga의 흐름:
 * 1. 컴포넌트에서 액션 디스패치: dispatch(login.request({ email, password }))
 * 2. Saga가 액션을 감지: takeLatest(LOGIN.REQUEST, loginSaga)
 * 3. API 호출 및 처리: loginSaga 함수 실행
 * 4. 성공/실패 액션 디스패치: login.success() 또는 login.failure()
 * 5. Reducer가 상태 업데이트
 */

/**
 * ==================== 로그인 Saga ====================
 *
 * function*은 무엇인가요?
 * - Generator 함수 (ES6 기능)
 * - Redux Saga는 Generator를 사용해서 비동기 작업을 동기 코드처럼 작성
 *
 * yield는 무엇인가요?
 * - 비동기 작업이 완료될 때까지 기다림
 * - await과 비슷하지만 더 강력함 (취소, 재시도 등 가능)
 */
function* loginSaga(action) {
  try {
    // 1. API 호출 (yield call)
    // - call: API 함수를 호출하고 결과를 기다림
    // - authAPI.login: 백엔드 로그인 API 호출
    // - action.payload: { email, password } 등의 로그인 정보
    const response = yield call(authAPI.login, action.payload);

    // 2. 성공 액션 디스패치 (yield put)
    // - put: 다른 액션을 디스패치 (dispatch와 같은 역할)
    // - response.data: 서버에서 받은 데이터 (user 정보, token 등)
    yield put(login.success(response.data));

    // 여기서 추가 작업을 할 수 있습니다:
    // - 로그인 성공 알림 표시
    // - 페이지 리다이렉트
    // - 사용자 정보 추가 로드 등
  } catch (error) {
    // 3. 실패 액션 디스패치
    // - error.response?.data?.message: 백엔드에서 보낸 에러 메시지
    // - || '로그인에 실패했습니다.': 기본 에러 메시지
    yield put(login.failure(error.response?.data?.message || '로그인에 실패했습니다.'));
  }
}

/**
 * ==================== 로그아웃 Saga ====================
 *
 * 왜 로그아웃도 API 호출을 하나요?
 * - 백엔드에서 토큰을 무효화하거나 세션을 삭제하기 위함
 * - 보안상 중요한 작업
 */
function* logoutSaga() {
  try {
    // 1. 백엔드에 로그아웃 요청
    yield call(authAPI.logout);

    // 2. 로그아웃 성공 액션 디스패치
    yield put(logout.success());
  } catch (error) {
    // 왜 에러가 나도 logout.success()를 호출하나요?
    // - 로그아웃은 클라이언트에서 토큰만 삭제해도 되기 때문
    // - 백엔드 API가 실패해도 사용자는 로그아웃되어야 함
    yield put(logout.success());
  }
}

/**
 * ==================== 회원가입 Saga ====================
 */
function* signupSaga(action) {
  try {
    // 1. 회원가입 API 호출
    // - action.payload: { email, password, name } 등의 회원가입 정보
    const response = yield call(authAPI.signup, action.payload);

    // 2. 성공 액션 디스패치
    yield put(signup.success(response.data));

    // 여기서 추가 작업:
    // - 회원가입 성공 메시지 표시
    // - 로그인 페이지로 리다이렉트
    // - 또는 자동 로그인 처리
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
    // 1. 현재 로그인한 사용자 정보 조회
    const response = yield call(authAPI.getMe);

    // 2. 성공 액션 디스패치
    yield put(getMe.success(response.data));
  } catch (error) {
    // 3. 실패 액션 디스패치
    yield put(getMe.failure(error.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.'));
  }
}

/**
 * ==================== 비밀번호 변경 Saga ====================
 */
function* changePasswordSaga(action) {
  try {
    // 1. 비밀번호 변경 API 호출
    // - action.payload: { currentPassword, newPassword }
    const response = yield call(userAPI.changePassword, action.payload);

    // 2. 성공 액션 디스패치
    yield put(changePassword.success(response.data));
  } catch (error) {
    // 3. 실패 액션 디스패치
    yield put(changePassword.failure(error.response?.data?.message || '비밀번호 변경에 실패했습니다.'));
  }
}

/**
 * ==================== 직급 변경 Saga ====================
 */
function* changePositionSaga(action) {
  try {
    // 1. 직급 변경 API 호출
    // - action.payload: { userId, position }
    const response = yield call(userAPI.changePosition, action.payload);

    // 2. 성공 액션 디스패치
    yield put(changePosition.success(response.data));

    // 3. 사용자 정보 다시 조회 (변경된 직급 반영)
    yield put(getMe.request());
  } catch (error) {
    // 4. 실패 액션 디스패치
    yield put(changePosition.failure(error.response?.data?.message || '직급 변경에 실패했습니다.'));
  }
}

/**
 * ==================== Watcher Saga ====================
 *
 * 왜 Watcher Saga가 필요한가요?
 * - 어떤 액션이 디스패치되면 어떤 Saga를 실행할지 지정
 * - 여러 Worker Saga들을 감시하는 역할
 *
 * takeLatest vs takeEvery?
 * - takeLatest: 같은 액션이 연속으로 오면 마지막 것만 처리 (이전 것은 취소)
 *   예) 로그인 버튼을 여러 번 클릭해도 마지막 요청만 처리
 * - takeEvery: 모든 액션을 처리
 *   예) 여러 파일 업로드 요청을 모두 처리
 */
export default function* authSaga() {
  // LOGIN.REQUEST 액션이 디스패치되면 loginSaga 실행
  yield takeLatest(LOGIN.REQUEST, loginSaga);

  // LOGOUT.REQUEST 액션이 디스패치되면 logoutSaga 실행
  yield takeLatest(LOGOUT.REQUEST, logoutSaga);

  // SIGNUP.REQUEST 액션이 디스패치되면 signupSaga 실행
  yield takeLatest(SIGNUP.REQUEST, signupSaga);

  // GET_ME.REQUEST 액션이 디스패치되면 getMeSaga 실행
  yield takeLatest(GET_ME.REQUEST, getMeSaga);

  // CHANGE_PASSWORD.REQUEST 액션이 디스패치되면 changePasswordSaga 실행
  yield takeLatest(CHANGE_PASSWORD.REQUEST, changePasswordSaga);

  // CHANGE_POSITION.REQUEST 액션이 디스패치되면 changePositionSaga 실행
  yield takeLatest(CHANGE_POSITION.REQUEST, changePositionSaga);
}

/**
 * ==================== 전체 흐름 정리 ====================
 *
 * 로그인 예시:
 * 1. 컴포넌트: dispatch(login.request({ email: 'test@test.com', password: '1234' }))
 * 2. Saga: LOGIN.REQUEST 감지 → loginSaga 실행
 * 3. Saga: API 호출 (yield call(authAPI.login, ...))
 * 4. Saga: 성공 시 login.success() 디스패치
 * 5. Reducer: LOGIN.SUCCESS 처리 → 상태 업데이트
 * 6. 컴포넌트: useSelector로 업데이트된 상태 확인
 *
 * 이렇게 하면:
 * - 컴포넌트는 간단하게 액션만 디스패치
 * - 비동기 로직은 Saga에서 처리
 * - 상태 관리는 Reducer에서 처리
 * → 코드가 깔끔하고 테스트하기 쉬워짐!
 */
