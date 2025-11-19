import {
  GET_MANUFACTURING_STATS,
  GET_RECEIVING_STATS,
  GET_PRODUCTION_STATS,
  GET_SHIPPING_STATS,
  GET_INVENTORY_ALERTS,
  GET_EXPIRY_ALERTS,
  GET_PENDING_APPROVALS,
  GET_RECENT_ACTIVITIES,
  CLEAR_STATS_ERROR
} from './actions';

const initialState = {
  // 제조관리 통계 (입고완료, 제조완료, 출고완료, 재고알람 등)
  manufacturingStats: {
    data: null,
    loading: false,
    error: null
  },

  // 입고 통계 상세
  receivingStats: {
    data: null,
    loading: false,
    error: null
  },

  // 제조 통계 상세
  productionStats: {
    data: null,
    loading: false,
    error: null
  },

  // 출고 통계 상세
  shippingStats: {
    data: null,
    loading: false,
    error: null
  },

  // 재고 알람 목록
  inventoryAlerts: {
    data: null,
    loading: false,
    error: null
  },

  // 유통기한 임박 목록
  expiryAlerts: {
    data: null,
    loading: false,
    error: null
  },

  // 승인 대기 목록
  pendingApprovals: {
    data: null,
    loading: false,
    error: null
  },

  // 최근 활동 내역
  recentActivities: {
    data: null,
    loading: false,
    error: null
  }
};

const dashReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==================== 제조관리 통계 조회 ====================
    case GET_MANUFACTURING_STATS.REQUEST:
      // API 호출 시작: loading을 true로 변경
      return {
        ...state,
        manufacturingStats: {
          ...state.manufacturingStats,
          loading: true,
          error: null
        }
      };

    case GET_MANUFACTURING_STATS.SUCCESS:
      // API 호출 성공: 데이터 저장, loading 종료
      return {
        ...state,
        manufacturingStats: {
          data: action.payload.data,
          loading: false,
          error: null
        }
      };

    case GET_MANUFACTURING_STATS.FAILURE:
      // API 호출 실패: 에러 메시지 저장, loading 종료
      return {
        ...state,
        manufacturingStats: {
          ...state.manufacturingStats,
          loading: false,
          error: action.error
        }
      };

    // ==================== 입고 통계 상세 조회 ====================
    case GET_RECEIVING_STATS.REQUEST:
      return {
        ...state,
        receivingStats: {
          ...state.receivingStats,
          loading: true,
          error: null
        }
      };

    case GET_RECEIVING_STATS.SUCCESS:
      return {
        ...state,
        receivingStats: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_RECEIVING_STATS.FAILURE:
      return {
        ...state,
        receivingStats: {
          ...state.receivingStats,
          loading: false,
          error: action.error
        }
      };

    // ==================== 제조 통계 상세 조회 ====================
    case GET_PRODUCTION_STATS.REQUEST:
      return {
        ...state,
        productionStats: {
          ...state.productionStats,
          loading: true,
          error: null
        }
      };

    case GET_PRODUCTION_STATS.SUCCESS:
      return {
        ...state,
        productionStats: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_PRODUCTION_STATS.FAILURE:
      return {
        ...state,
        productionStats: {
          ...state.productionStats,
          loading: false,
          error: action.error
        }
      };

    // ==================== 출고 통계 상세 조회 ====================
    case GET_SHIPPING_STATS.REQUEST:
      return {
        ...state,
        shippingStats: {
          ...state.shippingStats,
          loading: true,
          error: null
        }
      };

    case GET_SHIPPING_STATS.SUCCESS:
      return {
        ...state,
        shippingStats: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_SHIPPING_STATS.FAILURE:
      return {
        ...state,
        shippingStats: {
          ...state.shippingStats,
          loading: false,
          error: action.error
        }
      };

    // ==================== 재고 알람 목록 조회 ====================
    case GET_INVENTORY_ALERTS.REQUEST:
      return {
        ...state,
        inventoryAlerts: {
          ...state.inventoryAlerts,
          loading: true,
          error: null
        }
      };

    case GET_INVENTORY_ALERTS.SUCCESS:
      return {
        ...state,
        inventoryAlerts: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_INVENTORY_ALERTS.FAILURE:
      return {
        ...state,
        inventoryAlerts: {
          ...state.inventoryAlerts,
          loading: false,
          error: action.error
        }
      };

    // ==================== 유통기한 임박 목록 조회 ====================
    case GET_EXPIRY_ALERTS.REQUEST:
      return {
        ...state,
        expiryAlerts: {
          ...state.expiryAlerts,
          loading: true,
          error: null
        }
      };

    case GET_EXPIRY_ALERTS.SUCCESS:
      return {
        ...state,
        expiryAlerts: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_EXPIRY_ALERTS.FAILURE:
      return {
        ...state,
        expiryAlerts: {
          ...state.expiryAlerts,
          loading: false,
          error: action.error
        }
      };

    // ==================== 승인 대기 목록 조회 ====================
    case GET_PENDING_APPROVALS.REQUEST:
      return {
        ...state,
        pendingApprovals: {
          ...state.pendingApprovals,
          loading: true,
          error: null
        }
      };

    case GET_PENDING_APPROVALS.SUCCESS:
      return {
        ...state,
        pendingApprovals: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_PENDING_APPROVALS.FAILURE:
      return {
        ...state,
        pendingApprovals: {
          ...state.pendingApprovals,
          loading: false,
          error: action.error
        }
      };

    // ==================== 최근 활동 내역 조회 ====================
    case GET_RECENT_ACTIVITIES.REQUEST:
      return {
        ...state,
        recentActivities: {
          ...state.recentActivities,
          loading: true,
          error: null
        }
      };

    case GET_RECENT_ACTIVITIES.SUCCESS:
      return {
        ...state,
        recentActivities: {
          data: action.payload,
          loading: false,
          error: null
        }
      };

    case GET_RECENT_ACTIVITIES.FAILURE:
      return {
        ...state,
        recentActivities: {
          ...state.recentActivities,
          loading: false,
          error: action.error
        }
      };

    // ==================== 에러 메시지 초기화 ====================
    case CLEAR_STATS_ERROR:
      // 모든 통계의 에러 메시지를 초기화
      return {
        ...state,
        manufacturingStats: { ...state.manufacturingStats, error: null },
        receivingStats: { ...state.receivingStats, error: null },
        productionStats: { ...state.productionStats, error: null },
        shippingStats: { ...state.shippingStats, error: null },
        inventoryAlerts: { ...state.inventoryAlerts, error: null },
        expiryAlerts: { ...state.expiryAlerts, error: null },
        pendingApprovals: { ...state.pendingApprovals, error: null },
        recentActivities: { ...state.recentActivities, error: null }
      };

    // ==================== 기본 케이스 ====================
    default:
      return state;
  }
};

export default dashReducer;
