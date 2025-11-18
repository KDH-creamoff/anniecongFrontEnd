import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 작업 지시서 관리
export const FETCH_WORK_ORDERS = createRequestTypes('manufacturing/FETCH_WORK_ORDERS'); // 작업 지시서 목록 조회
export const FETCH_WORK_ORDER_BY_ID = createRequestTypes('manufacturing/FETCH_WORK_ORDER_BY_ID'); // 작업 지시서 상세 조회
export const CREATE_WORK_ORDER = createRequestTypes('manufacturing/CREATE_WORK_ORDER'); // 작업 지시서 등록
export const UPDATE_WORK_ORDER = createRequestTypes('manufacturing/UPDATE_WORK_ORDER'); // 작업 지시서 수정
export const DELETE_WORK_ORDER = createRequestTypes('manufacturing/DELETE_WORK_ORDER'); // 작업 지시서 삭제
export const UPDATE_WORK_ORDER_STATUS = createRequestTypes('manufacturing/UPDATE_WORK_ORDER_STATUS'); // 작업 지시서 상태 변경

// 제조 이력 관리
export const FETCH_MANUFACTURING_HISTORY = createRequestTypes('manufacturing/FETCH_MANUFACTURING_HISTORY'); // 제조 이력 조회
export const FETCH_HISTORY_BY_DATE = createRequestTypes('manufacturing/FETCH_HISTORY_BY_DATE'); // 날짜별 제조 이력 조회
export const CREATE_MANUFACTURING_RECORD = createRequestTypes('manufacturing/CREATE_MANUFACTURING_RECORD'); // 제조 기록 생성

// 공장간 이동 관리
export const FETCH_TRANSFERS = createRequestTypes('manufacturing/FETCH_TRANSFERS'); // 이송 목록 조회
export const FETCH_TRANSFER_BY_ID = createRequestTypes('manufacturing/FETCH_TRANSFER_BY_ID'); // 이송 상세 조회
export const CREATE_TRANSFER = createRequestTypes('manufacturing/CREATE_TRANSFER'); // 이송 등록
export const UPDATE_TRANSFER_STATUS = createRequestTypes('manufacturing/UPDATE_TRANSFER_STATUS'); // 이송 상태 변경
export const CANCEL_TRANSFER = createRequestTypes('manufacturing/CANCEL_TRANSFER'); // 이송 취소
export const FETCH_AVAILABLE_PRODUCTS = createRequestTypes('manufacturing/FETCH_AVAILABLE_PRODUCTS'); // 출고가능품목 조회

// 2공장 제조 관리
export const FETCH_FACTORY2_WORKS = createRequestTypes('manufacturing/FETCH_FACTORY2_WORKS'); // 2공장 작업 목록 조회
export const FETCH_FACTORY2_ORDERS = createRequestTypes('manufacturing/FETCH_FACTORY2_ORDERS'); // 2공장 주문 목록 조회
export const UPDATE_FACTORY2_WORK_STATUS = createRequestTypes('manufacturing/UPDATE_FACTORY2_WORK_STATUS'); // 2공장 작업 상태 변경

// 작업 통계
export const FETCH_WORK_STATISTICS = createRequestTypes('manufacturing/FETCH_WORK_STATISTICS'); // 작업 통계 조회 (진행중/대기/완료 작업 수)

// 캘린더 데이터 관리
export const FETCH_CALENDAR_SUMMARY = createRequestTypes('manufacturing/FETCH_CALENDAR_SUMMARY'); // 캘린더 요약 데이터 조회 (작업지시서 기반)

// UI 상태 관리
export const SET_MANUFACTURING_FILTER = 'manufacturing/SET_MANUFACTURING_FILTER'; // 필터 설정
export const CLEAR_MANUFACTURING_ERROR = 'manufacturing/CLEAR_MANUFACTURING_ERROR'; // 에러 초기화
export const RESET_MANUFACTURING_STATE = 'manufacturing/RESET_MANUFACTURING_STATE'; // 상태 초기화

// ==================== 액션 생성자 ====================

// 작업 지시서 관리
export const fetchWorkOrders = createAsyncActions(FETCH_WORK_ORDERS);
export const fetchWorkOrderById = createAsyncActions(FETCH_WORK_ORDER_BY_ID);
export const createWorkOrder = createAsyncActions(CREATE_WORK_ORDER);
export const updateWorkOrder = createAsyncActions(UPDATE_WORK_ORDER);
export const deleteWorkOrder = createAsyncActions(DELETE_WORK_ORDER);
export const updateWorkOrderStatus = createAsyncActions(UPDATE_WORK_ORDER_STATUS);

// 제조 이력 관리
export const fetchManufacturingHistory = createAsyncActions(FETCH_MANUFACTURING_HISTORY);
export const fetchHistoryByDate = createAsyncActions(FETCH_HISTORY_BY_DATE);
export const createManufacturingRecord = createAsyncActions(CREATE_MANUFACTURING_RECORD);

// 공장간 이동 관리
export const fetchTransfers = createAsyncActions(FETCH_TRANSFERS);
export const fetchTransferById = createAsyncActions(FETCH_TRANSFER_BY_ID);
export const createTransfer = createAsyncActions(CREATE_TRANSFER);
export const updateTransferStatus = createAsyncActions(UPDATE_TRANSFER_STATUS);
export const cancelTransfer = createAsyncActions(CANCEL_TRANSFER);
export const fetchAvailableProducts = createAsyncActions(FETCH_AVAILABLE_PRODUCTS);

// 2공장 제조 관리
export const fetchFactory2Works = createAsyncActions(FETCH_FACTORY2_WORKS);
export const fetchFactory2Orders = createAsyncActions(FETCH_FACTORY2_ORDERS);
export const updateFactory2WorkStatus = createAsyncActions(UPDATE_FACTORY2_WORK_STATUS);

// 작업 통계
export const fetchWorkStatistics = createAsyncActions(FETCH_WORK_STATISTICS);

// 캘린더 데이터 관리
export const fetchCalendarSummary = createAsyncActions(FETCH_CALENDAR_SUMMARY);

// UI 액션 생성자
export const setManufacturingFilter = (filter) => ({
  type: SET_MANUFACTURING_FILTER,
  payload: filter,
});

export const clearManufacturingError = () => ({
  type: CLEAR_MANUFACTURING_ERROR,
});

export const resetManufacturingState = () => ({
  type: RESET_MANUFACTURING_STATE,
});
