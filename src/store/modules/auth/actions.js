import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// 로그인 액션 타입
export const LOGIN = createRequestTypes('auth/LOGIN');

// 로그아웃 액션 타입
export const LOGOUT = createRequestTypes('auth/LOGOUT');

// 회원가입 액션 타입
export const SIGNUP = createRequestTypes('auth/SIGNUP');

// 토큰 갱신 액션 타입
export const REFRESH_TOKEN = createRequestTypes('auth/REFRESH_TOKEN');

// 현재 사용자 조회 액션 타입
export const GET_ME = createRequestTypes('auth/GET_ME');

// 비밀번호 변경 액션 타입
export const CHANGE_PASSWORD = createRequestTypes('auth/CHANGE_PASSWORD');

// 직급 변경 액션 타입
export const CHANGE_POSITION = createRequestTypes('auth/CHANGE_POSITION');

// 권한 업데이트 액션 타입
export const UPDATE_PERMISSIONS = createRequestTypes('auth/UPDATE_PERMISSIONS');

// 동기 액션 타입 (비동기 처리가 필요 없는 단순 액션)
export const CHECK_AUTH = 'auth/CHECK_AUTH'; // 인증 상태 확인
export const CLEAR_AUTH_ERROR = 'auth/CLEAR_AUTH_ERROR'; // 에러 메시지 초기화

// 로그인 액션 생성자
// dispatch(login.request({ email: 'test@test.com', password: '1234' }))
export const login = createAsyncActions(LOGIN);

// 로그아웃 액션 생성자
// dispatch(logout.request())
export const logout = createAsyncActions(LOGOUT);

// 회원가입 액션 생성자
// dispatch(signup.request({ email, password, name }))
export const signup = createAsyncActions(SIGNUP);

// 토큰 갱신 액션 생성자
export const refreshToken = createAsyncActions(REFRESH_TOKEN);

// 현재 사용자 조회 액션 생성자
// dispatch(getMe.request())
export const getMe = createAsyncActions(GET_ME);

// 비밀번호 변경 액션 생성자
// dispatch(changePassword.request({ currentPassword, newPassword }))
export const changePassword = createAsyncActions(CHANGE_PASSWORD);

// 직급 변경 액션 생성자
// dispatch(changePosition.request({ userId, position }))
export const changePosition = createAsyncActions(CHANGE_POSITION);

// 권한 업데이트 액션 생성자
// dispatch(updatePermissions.request({ userId, permissions }))
export const updatePermissions = createAsyncActions(UPDATE_PERMISSIONS);

// 인증 상태 확인 (localStorage에서 토큰 확인)
// 사용법: dispatch(checkAuth())
export const checkAuth = () => ({ type: CHECK_AUTH });

// 에러 메시지 초기화
// 사용법: dispatch(clearAuthError())
export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });
