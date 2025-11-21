import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_WORK_ORDERS,
  FETCH_WORK_ORDER_BY_ID,
  CREATE_WORK_ORDER,
  UPDATE_WORK_ORDER,
  DELETE_WORK_ORDER,
  UPDATE_WORK_ORDER_STATUS,
  FETCH_MANUFACTURING_HISTORY,
  FETCH_HISTORY_BY_DATE,
  CREATE_MANUFACTURING_RECORD,
  FETCH_TRANSFERS,
  FETCH_TRANSFER_BY_ID,
  CREATE_TRANSFER,
  UPDATE_TRANSFER_STATUS,
  CANCEL_TRANSFER,
  FETCH_AVAILABLE_PRODUCTS,
  FETCH_FACTORY2_WORKS,
  FETCH_FACTORY2_ORDERS,
  UPDATE_FACTORY2_WORK_STATUS,
  FETCH_WORK_STATISTICS,
  FETCH_CALENDAR_SUMMARY,
  SET_MANUFACTURING_FILTER,
  CLEAR_MANUFACTURING_ERROR,
  RESET_MANUFACTURING_STATE,
} from './action';

// 초기 상태 정의
const initialState = {
  // 작업 지시서 관련 상태
  workOrders: createAsyncState([]), // 작업 지시서 목록
  workOrderDetail: createAsyncState(null), // 작업 지시서 상세 정보
  workOrderOperation: createAsyncState(null), // 작업 지시서 등록/수정/삭제 결과

  // 제조 이력 관련 상태
  manufacturingHistory: createAsyncState({}), // 제조 이력 목록 (날짜별 객체 구조)
  historyByDate: createAsyncState({ pending: [], completed: [] }), // 날짜별 제조 이력 (pending과 completed 배열)
  manufacturingRecord: createAsyncState(null), // 제조 기록 생성 결과

  // 공장간 이동 관련 상태
  transfers: createAsyncState([]), // 이송 목록
  transferDetail: createAsyncState(null), // 이송 상세 정보
  transferOperation: createAsyncState(null), // 이송 등록/상태변경/취소 결과
  availableProducts: createAsyncState([]), // 출고가능품목 목록

  // 2공장 제조 관련 상태
  factory2Works: createAsyncState([]), // 2공장 작업 목록
  factory2Orders: createAsyncState([]), // 2공장 주문 목록
  factory2Operation: createAsyncState(null), // 2공장 작업 상태 변경 결과

  // 통계 정보
  workStatistics: createAsyncState({
    inProgress: 0, // 진행중 작업 수
    waiting: 0, // 대기 작업 수
    completed: 0, // 완료 작업 수
    workers: 0, // 작업자 수
  }),

  // 캘린더 데이터
  calendarSummary: createAsyncState({}), // 날짜별 작업 요약 데이터 { 'YYYY-MM-DD': { pending: 0, completed: 0 } }

  // UI 필터 상태
  filter: {
    status: '', // 작업 상태 필터 (전체, 진행중, 대기, 완료)
    factoryId: '', // 공장 필터
    dateRange: { start: '', end: '' }, // 날짜 범위 필터
    workType: '', // 작업 유형 필터
  },
};

const manufacturingReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==================== 작업 지시서 목록 조회 ====================
    case FETCH_WORK_ORDERS.REQUEST:
      return { ...state, workOrders: { ...state.workOrders, loading: true, error: null } };
    case FETCH_WORK_ORDERS.SUCCESS:
      return { ...state, workOrders: { data: action.payload, loading: false, error: null } };
    case FETCH_WORK_ORDERS.FAILURE:
      return { ...state, workOrders: { ...state.workOrders, loading: false, error: action.error } };

    // ==================== 작업 지시서 상세 조회 ====================
    case FETCH_WORK_ORDER_BY_ID.REQUEST:
      return { ...state, workOrderDetail: { ...state.workOrderDetail, loading: true, error: null } };
    case FETCH_WORK_ORDER_BY_ID.SUCCESS:
      return { ...state, workOrderDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_WORK_ORDER_BY_ID.FAILURE:
      return { ...state, workOrderDetail: { ...state.workOrderDetail, loading: false, error: action.error } };

    // ==================== 작업 지시서 등록 ====================
    case CREATE_WORK_ORDER.REQUEST:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: true, error: null } };
    case CREATE_WORK_ORDER.SUCCESS:
      return { ...state, workOrderOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_WORK_ORDER.FAILURE:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: false, error: action.error } };

    // ==================== 작업 지시서 수정 ====================
    case UPDATE_WORK_ORDER.REQUEST:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: true, error: null } };
    case UPDATE_WORK_ORDER.SUCCESS:
      return {
        ...state,
        workOrders: {
          ...state.workOrders,
          data: state.workOrders.data.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        },
        workOrderOperation: { data: action.payload, loading: false, error: null },
      };
    case UPDATE_WORK_ORDER.FAILURE:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: false, error: action.error } };

    // ==================== 작업 지시서 삭제 ====================
    case DELETE_WORK_ORDER.REQUEST:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: true, error: null } };
    case DELETE_WORK_ORDER.SUCCESS:
      return {
        ...state,
        workOrders: {
          ...state.workOrders,
          data: state.workOrders.data.filter((order) => order.id !== action.payload.id),
        },
        workOrderOperation: { data: action.payload, loading: false, error: null },
      };
    case DELETE_WORK_ORDER.FAILURE:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: false, error: action.error } };

    // ==================== 작업 지시서 상태 변경 ====================
    case UPDATE_WORK_ORDER_STATUS.REQUEST:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: true, error: null } };
    case UPDATE_WORK_ORDER_STATUS.SUCCESS:
      return {
        ...state,
        workOrders: {
          ...state.workOrders,
          data: state.workOrders.data.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        },
        workOrderOperation: { data: action.payload, loading: false, error: null },
      };
    case UPDATE_WORK_ORDER_STATUS.FAILURE:
      return { ...state, workOrderOperation: { ...state.workOrderOperation, loading: false, error: action.error } };

    // ==================== 제조 이력 조회 ====================
    case FETCH_MANUFACTURING_HISTORY.REQUEST:
      return { ...state, manufacturingHistory: { ...state.manufacturingHistory, loading: true, error: null } };
    case FETCH_MANUFACTURING_HISTORY.SUCCESS:
      return { ...state, manufacturingHistory: { data: action.payload, loading: false, error: null } };
    case FETCH_MANUFACTURING_HISTORY.FAILURE:
      return { ...state, manufacturingHistory: { ...state.manufacturingHistory, loading: false, error: action.error } };

    // ==================== 날짜별 제조 이력 조회 ====================
    case FETCH_HISTORY_BY_DATE.REQUEST:
      return { ...state, historyByDate: { ...state.historyByDate, loading: true, error: null } };
    case FETCH_HISTORY_BY_DATE.SUCCESS:
      return { ...state, historyByDate: { data: action.payload, loading: false, error: null } };
    case FETCH_HISTORY_BY_DATE.FAILURE:
      return { ...state, historyByDate: { ...state.historyByDate, loading: false, error: action.error } };

    // ==================== 제조 기록 생성 ====================
    case CREATE_MANUFACTURING_RECORD.REQUEST:
      return { ...state, manufacturingRecord: { ...state.manufacturingRecord, loading: true, error: null } };
    case CREATE_MANUFACTURING_RECORD.SUCCESS:
      return { ...state, manufacturingRecord: { data: action.payload, loading: false, error: null } };
    case CREATE_MANUFACTURING_RECORD.FAILURE:
      return { ...state, manufacturingRecord: { ...state.manufacturingRecord, loading: false, error: action.error } };

    // ==================== 이송 목록 조회 ====================
    case FETCH_TRANSFERS.REQUEST:
      return { ...state, transfers: { ...state.transfers, loading: true, error: null } };
    case FETCH_TRANSFERS.SUCCESS:
      return { ...state, transfers: { data: action.payload, loading: false, error: null } };
    case FETCH_TRANSFERS.FAILURE:
      return { ...state, transfers: { ...state.transfers, loading: false, error: action.error } };

    // ==================== 이송 상세 조회 ====================
    case FETCH_TRANSFER_BY_ID.REQUEST:
      return { ...state, transferDetail: { ...state.transferDetail, loading: true, error: null } };
    case FETCH_TRANSFER_BY_ID.SUCCESS:
      return { ...state, transferDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_TRANSFER_BY_ID.FAILURE:
      return { ...state, transferDetail: { ...state.transferDetail, loading: false, error: action.error } };

    // ==================== 이송 등록 ====================
    case CREATE_TRANSFER.REQUEST:
      return { ...state, transferOperation: { ...state.transferOperation, loading: true, error: null } };
    case CREATE_TRANSFER.SUCCESS:
      return { ...state, transferOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_TRANSFER.FAILURE:
      return { ...state, transferOperation: { ...state.transferOperation, loading: false, error: action.error } };

    // ==================== 이송 상태 변경 ====================
    case UPDATE_TRANSFER_STATUS.REQUEST:
      return { ...state, transferOperation: { ...state.transferOperation, loading: true, error: null } };
    case UPDATE_TRANSFER_STATUS.SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          data: state.transfers.data.map((transfer) =>
            transfer.id === action.payload.id ? { ...transfer, status: action.payload.status } : transfer
          ),
        },
        transferOperation: { data: action.payload, loading: false, error: null },
      };
    case UPDATE_TRANSFER_STATUS.FAILURE:
      return { ...state, transferOperation: { ...state.transferOperation, loading: false, error: action.error } };

    // ==================== 이송 취소 ====================
    case CANCEL_TRANSFER.REQUEST:
      return { ...state, transferOperation: { ...state.transferOperation, loading: true, error: null } };
    case CANCEL_TRANSFER.SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          data: state.transfers.data.map((transfer) =>
            transfer.id === action.payload.id ? { ...transfer, status: 'cancelled' } : transfer
          ),
        },
        transferOperation: { data: action.payload, loading: false, error: null },
      };
    case CANCEL_TRANSFER.FAILURE:
      return { ...state, transferOperation: { ...state.transferOperation, loading: false, error: action.error } };

    // ==================== 출고가능품목 조회 ====================
    case FETCH_AVAILABLE_PRODUCTS.REQUEST:
      return { ...state, availableProducts: { ...state.availableProducts, loading: true, error: null } };
    case FETCH_AVAILABLE_PRODUCTS.SUCCESS:
      return { ...state, availableProducts: { data: action.payload, loading: false, error: null } };
    case FETCH_AVAILABLE_PRODUCTS.FAILURE:
      return { ...state, availableProducts: { ...state.availableProducts, loading: false, error: action.error } };

    // ==================== 2공장 작업 목록 조회 ====================
    case FETCH_FACTORY2_WORKS.REQUEST:
      return { ...state, factory2Works: { ...state.factory2Works, loading: true, error: null } };
    case FETCH_FACTORY2_WORKS.SUCCESS:
      return { ...state, factory2Works: { data: action.payload, loading: false, error: null } };
    case FETCH_FACTORY2_WORKS.FAILURE:
      return { ...state, factory2Works: { ...state.factory2Works, loading: false, error: action.error } };

    // ==================== 2공장 주문 목록 조회 ====================
    case FETCH_FACTORY2_ORDERS.REQUEST:
      return { ...state, factory2Orders: { ...state.factory2Orders, loading: true, error: null } };
    case FETCH_FACTORY2_ORDERS.SUCCESS:
      return { ...state, factory2Orders: { data: action.payload, loading: false, error: null } };
    case FETCH_FACTORY2_ORDERS.FAILURE:
      return { ...state, factory2Orders: { ...state.factory2Orders, loading: false, error: action.error } };

    // ==================== 2공장 작업 상태 변경 ====================
    case UPDATE_FACTORY2_WORK_STATUS.REQUEST:
      return { ...state, factory2Operation: { ...state.factory2Operation, loading: true, error: null } };
    case UPDATE_FACTORY2_WORK_STATUS.SUCCESS:
      return {
        ...state,
        factory2Works: {
          ...state.factory2Works,
          data: state.factory2Works.data.map((work) =>
            work.id === action.payload.id ? action.payload : work
          ),
        },
        factory2Orders: {
          ...state.factory2Orders,
          data: state.factory2Orders.data.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        },
        factory2Operation: { data: action.payload, loading: false, error: null },
      };
    case UPDATE_FACTORY2_WORK_STATUS.FAILURE:
      return { ...state, factory2Operation: { ...state.factory2Operation, loading: false, error: action.error } };

    // ==================== 작업 통계 조회 ====================
    case FETCH_WORK_STATISTICS.REQUEST:
      return { ...state, workStatistics: { ...state.workStatistics, loading: true, error: null } };
    case FETCH_WORK_STATISTICS.SUCCESS:
      return { ...state, workStatistics: { data: action.payload, loading: false, error: null } };
    case FETCH_WORK_STATISTICS.FAILURE:
      return { ...state, workStatistics: { ...state.workStatistics, loading: false, error: action.error } };

    // ==================== 캘린더 요약 데이터 조회 ====================
    case FETCH_CALENDAR_SUMMARY.REQUEST:
      return { ...state, calendarSummary: { ...state.calendarSummary, loading: true, error: null } };
    case FETCH_CALENDAR_SUMMARY.SUCCESS:
      return { ...state, calendarSummary: { data: action.payload, loading: false, error: null } };
    case FETCH_CALENDAR_SUMMARY.FAILURE:
      return { ...state, calendarSummary: { ...state.calendarSummary, loading: false, error: action.error } };

    // ==================== UI 상태 관리 ====================
    case SET_MANUFACTURING_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case CLEAR_MANUFACTURING_ERROR:
      return {
        ...state,
        workOrders: { ...state.workOrders, error: null },
        workOrderDetail: { ...state.workOrderDetail, error: null },
        workOrderOperation: { ...state.workOrderOperation, error: null },
        manufacturingHistory: { ...state.manufacturingHistory, error: null },
        historyByDate: { ...state.historyByDate, error: null },
        manufacturingRecord: { ...state.manufacturingRecord, error: null },
        transfers: { ...state.transfers, error: null },
        transferDetail: { ...state.transferDetail, error: null },
        transferOperation: { ...state.transferOperation, error: null },
        factory2Works: { ...state.factory2Works, error: null },
        factory2Orders: { ...state.factory2Orders, error: null },
        factory2Operation: { ...state.factory2Operation, error: null },
        workStatistics: { ...state.workStatistics, error: null },
        calendarSummary: { ...state.calendarSummary, error: null },
      };

    case RESET_MANUFACTURING_STATE:
      return initialState;

    default:
      return state;
  }
};

export default manufacturingReducer;
