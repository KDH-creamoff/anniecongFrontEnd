import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_MANUFACTURING_STATS,
  GET_RECEIVING_STATS,
  GET_PRODUCTION_STATS,
  GET_SHIPPING_STATS,
  GET_INVENTORY_ALERTS,
  GET_EXPIRY_ALERTS,
  GET_PENDING_APPROVALS,
  GET_RECENT_ACTIVITIES,
  REFRESH_STATS,
  getManufacturingStats,
  getReceivingStats,
  getProductionStats,
  getShippingStats,
  getInventoryAlerts,
  getExpiryAlerts,
  getPendingApprovals,
  getRecentActivities
} from './actions';

// ==================== Mock API (백엔드 배포 전 임시) ====================
const mockAPI = {
  // 제조관리 통계 조회
  getManufacturingStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            receivingCompleted: {
              value: 24,
              change: 12, // 증감률 (%)
              isPositive: true
            },
            productionCompleted: {
              value: 15,
              change: 8,
              isPositive: true
            },
            shippingCompleted: {
              value: 18,
              change: 5,
              isPositive: true
            },
            inventoryAlerts: {
              value: 3,
              change: -2, // 감소는 긍정적
              isPositive: true
            },
            expiryAlerts: {
              value: 3,
              change: -2,
              isPositive: true
            },
            pendingApprovals: {
              value: 3,
              change: -2,
              isPositive: true
            }
          }
        });
      }, 500);
    });
  },

  // 입고 통계 상세 조회
  getReceivingStats: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalCount: 24,
            items: [
              { date: '2025-01-10', count: 5, supplier: '공급업체A' },
              { date: '2025-01-09', count: 3, supplier: '공급업체B' },
              { date: '2025-01-08', count: 4, supplier: '공급업체C' }
            ]
          }
        });
      }, 500);
    });
  },

  // 제조 통계 상세 조회
  getProductionStats: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalCount: 15,
            items: [
              { date: '2025-01-10', count: 3, plant: '1공장' },
              { date: '2025-01-09', count: 5, plant: '2공장' },
              { date: '2025-01-08', count: 2, plant: '1공장' }
            ]
          }
        });
      }, 500);
    });
  },

  // 출고 통계 상세 조회
  getShippingStats: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalCount: 18,
            items: [
              { date: '2025-01-10', count: 4, type: 'B2B' },
              { date: '2025-01-09', count: 3, type: 'B2C' },
              { date: '2025-01-08', count: 5, type: 'B2B' }
            ]
          }
        });
      }, 500);
    });
  },

  // 재고 알람 목록 조회
  getInventoryAlerts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            alerts: [
              { id: 1, itemName: '닭가슴살', currentStock: 5, minStock: 10, status: 'low' },
              { id: 2, itemName: '고구마', currentStock: 3, minStock: 15, status: 'critical' },
              { id: 3, itemName: '연어', currentStock: 8, minStock: 10, status: 'low' }
            ]
          }
        });
      }, 500);
    });
  },

  // 유통기한 임박 목록 조회
  getExpiryAlerts: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            alerts: [
              { id: 1, itemName: '닭가슴살', lotNo: 'LOT-2025-001', expiryDate: '2025-01-15', daysLeft: 2 },
              { id: 2, itemName: '고구마', lotNo: 'LOT-2025-002', expiryDate: '2025-01-16', daysLeft: 3 },
              { id: 3, itemName: '연어', lotNo: 'LOT-2025-003', expiryDate: '2025-01-17', daysLeft: 4 }
            ]
          }
        });
      }, 500);
    });
  },

  // 승인 대기 목록 조회
  getPendingApprovals: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            approvals: [
              { id: 1, type: '입고승인', requestor: '김철수', date: '2025-01-10', status: 'pending' },
              { id: 2, type: '제조지시', requestor: '이영희', date: '2025-01-09', status: 'pending' },
              { id: 3, type: '출고승인', requestor: '박민수', date: '2025-01-08', status: 'pending' }
            ]
          }
        });
      }, 500);
    });
  },

  // 최근 활동 내역 조회
  getRecentActivities: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            activities: [
              { id: 1, type: 'receiving', message: '입고 완료: 닭가슴살 50kg', user: '김철수', timestamp: '2025-01-10 14:30' },
              { id: 2, type: 'production', message: '제조 완료: 닭가슴살 트릿 100개', user: '이영희', timestamp: '2025-01-10 13:15' },
              { id: 3, type: 'shipping', message: '출고 완료: 고구마 쿠키 50개', user: '박민수', timestamp: '2025-01-10 12:00' }
            ]
          }
        });
      }, 500);
    });
  }
};

function* getManufacturingStatsSaga() {
  try {
    // 1. API 호출 (yield call)
    const response = yield call(mockAPI.getManufacturingStats);

    // 2. 성공 액션 디스패치 (yield put)
    yield put(getManufacturingStats.success(response.data));

  } catch (error) {
    // 3. 실패 액션 디스패치
    yield put(getManufacturingStats.failure(
      error.response?.data?.message || '통계 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 입고 통계 상세 조회 Saga ====================
 */
function* getReceivingStatsSaga(action) {
  try {
    const response = yield call(mockAPI.getReceivingStats, action.payload);
    yield put(getReceivingStats.success(response.data));
  } catch (error) {
    yield put(getReceivingStats.failure(
      error.response?.data?.message || '입고 통계 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 제조 통계 상세 조회 Saga ====================
 */
function* getProductionStatsSaga(action) {
  try {
    const response = yield call(mockAPI.getProductionStats, action.payload);
    yield put(getProductionStats.success(response.data));
  } catch (error) {
    yield put(getProductionStats.failure(
      error.response?.data?.message || '제조 통계 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 출고 통계 상세 조회 Saga ====================
 */
function* getShippingStatsSaga(action) {
  try {
    const response = yield call(mockAPI.getShippingStats, action.payload);
    yield put(getShippingStats.success(response.data));
  } catch (error) {
    yield put(getShippingStats.failure(
      error.response?.data?.message || '출고 통계 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 재고 알람 목록 조회 Saga ====================
 */
function* getInventoryAlertsSaga() {
  try {
    const response = yield call(mockAPI.getInventoryAlerts);
    yield put(getInventoryAlerts.success(response.data));
  } catch (error) {
    yield put(getInventoryAlerts.failure(
      error.response?.data?.message || '재고 알람 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 유통기한 임박 목록 조회 Saga ====================
 */
function* getExpiryAlertsSaga(action) {
  try {
    const response = yield call(mockAPI.getExpiryAlerts, action.payload);
    yield put(getExpiryAlerts.success(response.data));
  } catch (error) {
    yield put(getExpiryAlerts.failure(
      error.response?.data?.message || '유통기한 알람 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 승인 대기 목록 조회 Saga ====================
 */
function* getPendingApprovalsSaga() {
  try {
    const response = yield call(mockAPI.getPendingApprovals);
    yield put(getPendingApprovals.success(response.data));
  } catch (error) {
    yield put(getPendingApprovals.failure(
      error.response?.data?.message || '승인 대기 목록 조회에 실패했습니다.'
    ));
  }
}

/**
 * ==================== 최근 활동 내역 조회 Saga ====================
 */
function* getRecentActivitiesSaga(action) {
  try {
    const response = yield call(mockAPI.getRecentActivities, action.payload);
    yield put(getRecentActivities.success(response.data));
  } catch (error) {
    yield put(getRecentActivities.failure(
      error.response?.data?.message || '최근 활동 내역 조회에 실패했습니다.'
    ));
  }
}

function* refreshStatsSaga() {
  try {
    // 모든 통계 API를 동시에 호출
    yield all([
      put(getManufacturingStats.request()),
      put(getInventoryAlerts.request()),
      put(getExpiryAlerts.request()),
      put(getPendingApprovals.request())
    ]);
  } catch (error) {
    console.error('통계 새로고침 중 오류 발생:', error);
  }
}

export default function* dashSaga() {
  // 제조관리 통계 조회
  yield takeLatest(GET_MANUFACTURING_STATS.REQUEST, getManufacturingStatsSaga);

  // 입고 통계 상세 조회
  yield takeLatest(GET_RECEIVING_STATS.REQUEST, getReceivingStatsSaga);

  // 제조 통계 상세 조회
  yield takeLatest(GET_PRODUCTION_STATS.REQUEST, getProductionStatsSaga);

  // 출고 통계 상세 조회
  yield takeLatest(GET_SHIPPING_STATS.REQUEST, getShippingStatsSaga);

  // 재고 알람 목록 조회
  yield takeLatest(GET_INVENTORY_ALERTS.REQUEST, getInventoryAlertsSaga);

  // 유통기한 임박 목록 조회
  yield takeLatest(GET_EXPIRY_ALERTS.REQUEST, getExpiryAlertsSaga);

  // 승인 대기 목록 조회
  yield takeLatest(GET_PENDING_APPROVALS.REQUEST, getPendingApprovalsSaga);

  // 최근 활동 내역 조회
  yield takeLatest(GET_RECENT_ACTIVITIES.REQUEST, getRecentActivitiesSaga);

  // 통계 새로고침
  yield takeLatest(REFRESH_STATS, refreshStatsSaga);
}
