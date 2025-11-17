import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 결재 목록 조회
export const FETCH_APPROVAL_INBOX = createRequestTypes('approval/FETCH_APPROVAL_INBOX');

// 결재 상세 조회
export const FETCH_APPROVAL_DETAIL = createRequestTypes('approval/FETCH_APPROVAL_DETAIL');

// 결재 승인
export const APPROVE_REQUEST = createRequestTypes('approval/APPROVE_REQUEST');

// 결재 반려
export const REJECT_REQUEST = createRequestTypes('approval/REJECT_REQUEST');

// 결재 문서 생성
export const CREATE_APPROVAL_DOCUMENT = createRequestTypes('approval/CREATE_APPROVAL_DOCUMENT');

// UI 상태 관리
export const SET_APPROVAL_FILTER = 'approval/SET_APPROVAL_FILTER';
export const CLEAR_APPROVAL_ERROR = 'approval/CLEAR_APPROVAL_ERROR';
export const RESET_APPROVAL_STATE = 'approval/RESET_APPROVAL_STATE';

// ==================== 액션 생성자 ====================

// 결재 목록 조회
export const fetchApprovalInbox = createAsyncActions(FETCH_APPROVAL_INBOX);

// 결재 상세 조회
export const fetchApprovalDetail = createAsyncActions(FETCH_APPROVAL_DETAIL);

// 결재 승인
export const approveRequest = createAsyncActions(APPROVE_REQUEST);

// 결재 반려
export const rejectRequest = createAsyncActions(REJECT_REQUEST);

// 결재 문서 생성
export const createApprovalDocument = createAsyncActions(CREATE_APPROVAL_DOCUMENT);

// UI 액션 생성자
export const setApprovalFilter = (filter) => ({
  type: SET_APPROVAL_FILTER,
  payload: filter,
});

export const clearApprovalError = () => ({
  type: CLEAR_APPROVAL_ERROR,
});

export const resetApprovalState = () => ({
  type: RESET_APPROVAL_STATE,
});