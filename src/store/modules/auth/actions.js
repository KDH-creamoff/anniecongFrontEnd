import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

/**
 * ==================== 액션 타입 ====================
 *
 * 왜 createRequestTypes를 사용하나요?
 * - 비동기 작업은 REQUEST, SUCCESS, FAILURE 3가지 상태를 가짐
 * - 예: LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
 * - createRequestTypes는 이 3개를 자동으로 생성해줌
 */

// 로그인 액션 타입
// 생성되는 타입: 'auth/LOGIN_REQUEST', 'auth/LOGIN_SUCCESS', 'auth/LOGIN_FAILURE'
export const LOGIN = createRequestTypes('auth/LOGIN');

// 로그아웃 액션 타입
export const LOGOUT = createRequestTypes('auth/LOGOUT');

// 회원가입 액션 타입
export const SIGNUP = createRequestTypes('auth/SIGNUP');

// 토큰 갱신 액션 타입
export const REFRESH_TOKEN = createRequestTypes('auth/REFRESH_TOKEN');

// 동기 액션 타입 (비동기 처리가 필요 없는 단순 액션)
export const CHECK_AUTH = 'auth/CHECK_AUTH'; // 인증 상태 확인
export const CLEAR_AUTH_ERROR = 'auth/CLEAR_AUTH_ERROR'; // 에러 메시지 초기화

/**
 * ==================== 액션 생성자 ====================
 *
 * 왜 createAsyncActions를 사용하나요?
 * - 비동기 액션마다 request, success, failure 함수를 수동으로 만드는 것은 번거로움
 * - createAsyncActions는 3개의 액션 생성자를 자동으로 만들어줌
 *
 * 예시: login.request({ email, password })
 *       login.success({ user, token })
 *       login.failure('로그인 실패')
 */

// 로그인 액션 생성자
// 사용법: dispatch(login.request({ email: 'test@test.com', password: '1234' }))
export const login = createAsyncActions(LOGIN);

// 로그아웃 액션 생성자
// 사용법: dispatch(logout.request())
export const logout = createAsyncActions(LOGOUT);

// 회원가입 액션 생성자
// 사용법: dispatch(signup.request({ email, password, name }))
export const signup = createAsyncActions(SIGNUP);

// 토큰 갱신 액션 생성자
export const refreshToken = createAsyncActions(REFRESH_TOKEN);

/**
 * 동기 액션 생성자
 * - 비동기 처리가 필요 없는 간단한 액션
 */

// 인증 상태 확인 (localStorage에서 토큰 확인)
// 사용법: dispatch(checkAuth())
export const checkAuth = () => ({ type: CHECK_AUTH });

// 에러 메시지 초기화
// 사용법: dispatch(clearAuthError())
export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });
