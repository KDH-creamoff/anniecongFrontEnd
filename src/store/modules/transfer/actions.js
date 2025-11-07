import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 이동 목록 조회
export const FETCH_TRANSFER_LIST = createRequestTypes('transfer/FETCH_TRANSFER_LIST');

// UI 상태 관리
export const SET_TRANSFER_FILTER = 'transfer/SET_TRANSFER_FILTER';
export const CLEAR_TRANSFER_ERROR = 'transfer/CLEAR_TRANSFER_ERROR';
export const RESET_TRANSFER_STATE = 'transfer/RESET_TRANSFER_STATE';

// ==================== 액션 생성자 ====================

// 이동 관리
export const fetchTransferList = createAsyncActions(FETCH_TRANSFER_LIST);

// UI 액션 생성자
export const setTransferFilter = (filter) => ({
  type: SET_TRANSFER_FILTER,
  payload: filter,
});

export const clearTransferError = () => ({
  type: CLEAR_TRANSFER_ERROR,
});

export const resetTransferState = () => ({
  type: RESET_TRANSFER_STATE,
});
