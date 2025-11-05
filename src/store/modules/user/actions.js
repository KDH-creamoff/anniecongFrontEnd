import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================
// 사용자 목록 조회
export const FETCH_USERS = createRequestTypes('user/FETCH_USERS');

// 사용자 상세 조회
export const FETCH_USER_DETAIL = createRequestTypes('user/FETCH_USER_DETAIL');

// 사용자 생성
export const CREATE_USER = createRequestTypes('user/CREATE_USER');

// 사용자 수정
export const UPDATE_USER = createRequestTypes('user/UPDATE_USER');

// 사용자 삭제
export const DELETE_USER = createRequestTypes('user/DELETE_USER');

// 접근 로그 조회
export const FETCH_ACCESS_LOGS = createRequestTypes('user/FETCH_ACCESS_LOGS');

// UI 상태 관리
export const SET_SELECTED_USER = 'user/SET_SELECTED_USER';
export const CLEAR_USER_ERROR = 'user/CLEAR_USER_ERROR';
export const RESET_USER_STATE = 'user/RESET_USER_STATE';

// ==================== 액션 생성자 ====================
export const fetchUsers = createAsyncActions(FETCH_USERS);
export const fetchUserDetail = createAsyncActions(FETCH_USER_DETAIL);
export const createUser = createAsyncActions(CREATE_USER);
export const updateUser = createAsyncActions(UPDATE_USER);
export const deleteUser = createAsyncActions(DELETE_USER);
export const fetchAccessLogs = createAsyncActions(FETCH_ACCESS_LOGS);

// UI 액션 생성자
export const setSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  payload: user,
});

export const clearUserError = () => ({
  type: CLEAR_USER_ERROR,
});

export const resetUserState = () => ({
  type: RESET_USER_STATE,
});
