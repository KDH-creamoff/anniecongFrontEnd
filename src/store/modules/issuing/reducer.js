import {
  FETCH_ISSUING_LIST,
  CREATE_ISSUING,
  UPDATE_ISSUING,
  DELETE_ISSUING,
  BATCH_ISSUE,
  FETCH_ISSUING_STATS,
} from './actions';

// ==================== 초기 상태 ====================
const initialState = {
  // 출고 목록
  issuingList: [],
  issuingListLoading: false,
  issuingListError: null,

  // 출고 통계
  issuingStats: null,
  issuingStatsLoading: false,
  issuingStatsError: null,

  // 출고 생성
  createLoading: false,
  createError: null,

  // 출고 수정
  updateLoading: false,
  updateError: null,

  // 출고 삭제
  deleteLoading: false,
  deleteError: null,

  // 일괄 출고
  batchLoading: false,
  batchError: null,
};

// ==================== 리듀서 ====================
export default function issuingReducer(state = initialState, action) {
  switch (action.type) {
    // ==================== 출고 목록 조회 ====================
    case FETCH_ISSUING_LIST.REQUEST:
      return {
        ...state,
        issuingListLoading: true,
        issuingListError: null,
      };
    case FETCH_ISSUING_LIST.SUCCESS:
      return {
        ...state,
        issuingListLoading: false,
        issuingList: action.payload,
        issuingListError: null,
      };
    case FETCH_ISSUING_LIST.FAILURE:
      return {
        ...state,
        issuingListLoading: false,
        issuingListError: action.payload,
      };

    // ==================== 출고 생성 ====================
    case CREATE_ISSUING.REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    case CREATE_ISSUING.SUCCESS:
      return {
        ...state,
        createLoading: false,
        issuingList: [action.payload, ...state.issuingList],
        createError: null,
      };
    case CREATE_ISSUING.FAILURE:
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
      };

    // ==================== 출고 수정 ====================
    case UPDATE_ISSUING.REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    case UPDATE_ISSUING.SUCCESS:
      return {
        ...state,
        updateLoading: false,
        issuingList: state.issuingList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        updateError: null,
      };
    case UPDATE_ISSUING.FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };

    // ==================== 출고 삭제 ====================
    case DELETE_ISSUING.REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    case DELETE_ISSUING.SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        issuingList: state.issuingList.filter((item) => item.id !== action.payload),
        deleteError: null,
      };
    case DELETE_ISSUING.FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };

    // ==================== 일괄 출고 ====================
    case BATCH_ISSUE.REQUEST:
      return {
        ...state,
        batchLoading: true,
        batchError: null,
      };
    case BATCH_ISSUE.SUCCESS:
      return {
        ...state,
        batchLoading: false,
        batchError: null,
      };
    case BATCH_ISSUE.FAILURE:
      return {
        ...state,
        batchLoading: false,
        batchError: action.payload,
      };

    // ==================== 출고 통계 ====================
    case FETCH_ISSUING_STATS.REQUEST:
      return {
        ...state,
        issuingStatsLoading: true,
        issuingStatsError: null,
      };
    case FETCH_ISSUING_STATS.SUCCESS:
      return {
        ...state,
        issuingStatsLoading: false,
        issuingStats: action.payload,
        issuingStatsError: null,
      };
    case FETCH_ISSUING_STATS.FAILURE:
      return {
        ...state,
        issuingStatsLoading: false,
        issuingStatsError: action.payload,
      };

    default:
      return state;
  }
}
