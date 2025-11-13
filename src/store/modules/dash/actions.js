import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// 제조관리 통계 조회 액션 타입 (입고완료, 제조완료, 출고완료, 재고알람 등)
export const GET_MANUFACTURING_STATS = createRequestTypes('dash/GET_MANUFACTURING_STATS');

// 입고 통계 상세 조회 액션 타입
export const GET_RECEIVING_STATS = createRequestTypes('dash/GET_RECEIVING_STATS');

// 제조 통계 상세 조회 액션 타입
export const GET_PRODUCTION_STATS = createRequestTypes('dash/GET_PRODUCTION_STATS');

// 출고 통계 상세 조회 액션 타입
export const GET_SHIPPING_STATS = createRequestTypes('dash/GET_SHIPPING_STATS');

// 재고 알람 목록 조회 액션 타입
export const GET_INVENTORY_ALERTS = createRequestTypes('dash/GET_INVENTORY_ALERTS');

// 유통기한 임박 목록 조회 액션 타입
export const GET_EXPIRY_ALERTS = createRequestTypes('dash/GET_EXPIRY_ALERTS');

// 승인 대기 목록 조회 액션 타입
export const GET_PENDING_APPROVALS = createRequestTypes('dash/GET_PENDING_APPROVALS');

// 최근 활동 내역 조회 액션 타입
export const GET_RECENT_ACTIVITIES = createRequestTypes('dash/GET_RECENT_ACTIVITIES');

// 동기 액션 타입 (비동기 처리가 필요 없는 단순 액션)
export const CLEAR_STATS_ERROR = 'dash/CLEAR_STATS_ERROR'; // 에러 메시지 초기화
export const REFRESH_STATS = 'dash/REFRESH_STATS'; // 통계 새로고침


// 제조관리 통계 조회 액션 생성자
export const getManufacturingStats = createAsyncActions(GET_MANUFACTURING_STATS);

// 입고 통계 상세 조회 액션 생성자
export const getReceivingStats = createAsyncActions(GET_RECEIVING_STATS);

// 제조 통계 상세 조회 액션 생성자
export const getProductionStats = createAsyncActions(GET_PRODUCTION_STATS);

// 출고 통계 상세 조회 액션 생성자
export const getShippingStats = createAsyncActions(GET_SHIPPING_STATS);

// 재고 알람 목록 조회 액션 생성자
export const getInventoryAlerts = createAsyncActions(GET_INVENTORY_ALERTS);

// 유통기한 임박 목록 조회 액션 생성자
export const getExpiryAlerts = createAsyncActions(GET_EXPIRY_ALERTS);

// 승인 대기 목록 조회 액션 생성자
export const getPendingApprovals = createAsyncActions(GET_PENDING_APPROVALS);

// 최근 활동 내역 조회 액션 생성자
export const getRecentActivities = createAsyncActions(GET_RECENT_ACTIVITIES);

// 에러 메시지 초기화
export const clearStatsError = () => ({ type: CLEAR_STATS_ERROR });

// 통계 새로고침 (모든 통계를 다시 불러오기)
export const refreshStats = () => ({ type: REFRESH_STATS });
