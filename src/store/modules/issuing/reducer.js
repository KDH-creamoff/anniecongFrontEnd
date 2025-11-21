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
  // 출고 목록 (전체)
  issuingList: [],
  // 출고 대기 목록 (status === '대기')
  pendingIssuings: [],
  // 출고 완료 목록 (status === '완료')
  completedIssuings: [],

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
    case FETCH_ISSUING_LIST.SUCCESS: {
      const newData = action.payload || [];
      const newDataArray = Array.isArray(newData) ? newData : [];
      
      // 데이터의 status를 확인하여 적절한 배열에 저장
      // status가 '대기', 'PENDING', 'pending'인 경우
      const isPending = newDataArray.length > 0 && newDataArray.every(item => 
        item.status === '대기' || item.status === 'PENDING' || item.status === 'pending'
      );
      // status가 '완료', 'COMPLETED', 'completed'인 경우
      const isCompleted = newDataArray.length > 0 && newDataArray.every(item => 
        item.status === '완료' || item.status === 'COMPLETED' || item.status === 'completed'
      );

      // 기존 데이터와 병합 (중복 제거)
      const mergedList = [...state.issuingList];
      newDataArray.forEach((newItem) => {
        const existingIndex = mergedList.findIndex((item) => item.id === newItem.id);
        if (existingIndex >= 0) {
          mergedList[existingIndex] = newItem;
        } else {
          mergedList.push(newItem);
        }
      });

      return {
        ...state,
        issuingListLoading: false,
        issuingList: mergedList,
        // status가 '대기'인 데이터만 들어왔다면 pendingIssuings 업데이트
        pendingIssuings: isPending 
          ? newDataArray 
          : isCompleted 
          ? state.pendingIssuings 
          : mergedList.filter(item => item.status === '대기' || item.status === 'PENDING' || item.status === 'pending'),
        // status가 '완료'인 데이터만 들어왔다면 completedIssuings 업데이트
        completedIssuings: isCompleted 
          ? newDataArray 
          : isPending 
          ? state.completedIssuings 
          : mergedList.filter(item => item.status === '완료' || item.status === 'COMPLETED' || item.status === 'completed'),
        issuingListError: null,
      };
    }
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
    case CREATE_ISSUING.SUCCESS: {
      const newItem = action.payload;
      return {
        ...state,
        createLoading: false,
        issuingList: [newItem, ...state.issuingList],
        // 새로 생성된 항목은 항상 '대기' 상태이므로 pendingIssuings에 추가
        pendingIssuings: [newItem, ...state.pendingIssuings],
        createError: null,
      };
    }
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
    case UPDATE_ISSUING.SUCCESS: {
      const updatedItem = action.payload;
      return {
        ...state,
        updateLoading: false,
        issuingList: state.issuingList.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
        pendingIssuings: state.pendingIssuings.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
        completedIssuings: state.completedIssuings.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
        updateError: null,
      };
    }
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
    case DELETE_ISSUING.SUCCESS: {
      const deletedId = action.payload;
      return {
        ...state,
        deleteLoading: false,
        issuingList: state.issuingList.filter((item) => item.id !== deletedId),
        pendingIssuings: state.pendingIssuings.filter((item) => item.id !== deletedId),
        completedIssuings: state.completedIssuings.filter((item) => item.id !== deletedId),
        deleteError: null,
      };
    }
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
    case BATCH_ISSUE.SUCCESS: {
      const { items } = action.payload; // saga에서 전달하는 완료된 항목 배열
      const completedIds = items.map(item => item.id);

      return {
        ...state,
        batchLoading: false,
        // pendingIssuings에서 완료된 항목들 제거
        pendingIssuings: state.pendingIssuings.filter(
          item => !completedIds.includes(item.id)
        ),
        // completedIssuings에 완료된 항목들 추가
        completedIssuings: [...items, ...state.completedIssuings],
        // issuingList도 업데이트 (대기 항목 제거, 완료 항목 추가)
        issuingList: [
          ...state.issuingList.filter(item => !completedIds.includes(item.id)),
          ...items
        ],
        batchError: null,
      };
    }
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
