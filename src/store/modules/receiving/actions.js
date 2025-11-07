import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 입고 목록 조회
export const FETCH_RECEIVING_LIST = createRequestTypes('receiving/FETCH_RECEIVING_LIST');

// 입고 생성
export const CREATE_RECEIVING = createRequestTypes('receiving/CREATE_RECEIVING');

// 입고 수정
export const UPDATE_RECEIVING = createRequestTypes('receiving/UPDATE_RECEIVING');

// 입고 삭제
export const DELETE_RECEIVING = createRequestTypes('receiving/DELETE_RECEIVING');

// 입고 확정
export const CONFIRM_RECEIVING = createRequestTypes('receiving/CONFIRM_RECEIVING');

// 라벨 출력
export const PRINT_LABEL = createRequestTypes('receiving/PRINT_LABEL');

// UI 상태 관리
export const SET_RECEIVING_FILTER = 'receiving/SET_RECEIVING_FILTER';
export const CLEAR_RECEIVING_ERROR = 'receiving/CLEAR_RECEIVING_ERROR';
export const RESET_RECEIVING_STATE = 'receiving/RESET_RECEIVING_STATE';

// ==================== 액션 생성자 ====================

// 입고 관리
export const fetchReceivingList = createAsyncActions(FETCH_RECEIVING_LIST);
export const createReceiving = createAsyncActions(CREATE_RECEIVING);
export const updateReceiving = createAsyncActions(UPDATE_RECEIVING);
export const deleteReceiving = createAsyncActions(DELETE_RECEIVING);
export const confirmReceiving = createAsyncActions(CONFIRM_RECEIVING);
export const printLabel = createAsyncActions(PRINT_LABEL);

// UI 액션 생성자
export const setReceivingFilter = (filter) => ({
  type: SET_RECEIVING_FILTER,
  payload: filter,
});

export const clearReceivingError = () => ({
  type: CLEAR_RECEIVING_ERROR,
});

export const resetReceivingState = () => ({
  type: RESET_RECEIVING_STATE,
});
