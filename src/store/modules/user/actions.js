import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================
// 사용자 목록 조회
export const FETCH_USERS = createRequestTypes('user/FETCH_USERS');

// 사용자 삭제
export const DELETE_USER = createRequestTypes('user/DELETE_USER');

// ==================== 액션 생성자 ====================
export const fetchUsers = createAsyncActions(FETCH_USERS);
export const deleteUser = createAsyncActions(DELETE_USER);
