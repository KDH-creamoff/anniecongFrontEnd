import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================
// 재고 현황 조회
export const FETCH_INVENTORY_STATUS = createRequestTypes('inventory/FETCH_INVENTORY_STATUS');

// 재고 이동 내역 조회
export const FETCH_INVENTORY_MOVEMENTS = createRequestTypes('inventory/FETCH_INVENTORY_MOVEMENTS');

// 창고 가용률 조회
export const FETCH_WAREHOUSE_UTILIZATION = createRequestTypes('inventory/FETCH_WAREHOUSE_UTILIZATION');

// 재고 알림 조회
export const FETCH_INVENTORY_ALERTS = createRequestTypes('inventory/FETCH_INVENTORY_ALERTS');

// 온도 기록 업데이트
export const UPDATE_TEMPERATURE = createRequestTypes('inventory/UPDATE_TEMPERATURE');

// 온도 이력 조회
export const FETCH_TEMPERATURE_HISTORY = createRequestTypes('inventory/FETCH_TEMPERATURE_HISTORY');

// UI 상태 관리
export const SET_INVENTORY_FILTER = 'inventory/SET_INVENTORY_FILTER';
export const CLEAR_INVENTORY_ERROR = 'inventory/CLEAR_INVENTORY_ERROR';

// ==================== 액션 생성자 ====================
export const fetchInventoryStatus = createAsyncActions(FETCH_INVENTORY_STATUS);
export const fetchInventoryMovements = createAsyncActions(FETCH_INVENTORY_MOVEMENTS);
export const fetchWarehouseUtilization = createAsyncActions(FETCH_WAREHOUSE_UTILIZATION);
export const fetchInventoryAlerts = createAsyncActions(FETCH_INVENTORY_ALERTS);
export const updateTemperature = createAsyncActions(UPDATE_TEMPERATURE);
export const fetchTemperatureHistory = createAsyncActions(FETCH_TEMPERATURE_HISTORY);

// UI 액션 생성자
export const setInventoryFilter = (filter) => ({
  type: SET_INVENTORY_FILTER,
  payload: filter,
});

export const clearInventoryError = () => ({
  type: CLEAR_INVENTORY_ERROR,
});
