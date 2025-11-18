import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_RECEIVING_LIST,
  CREATE_RECEIVING,
  UPDATE_RECEIVING,
  DELETE_RECEIVING,
  CONFIRM_RECEIVING,
  PRINT_LABEL,
  SET_RECEIVING_FILTER,
  CLEAR_RECEIVING_ERROR,
  RESET_RECEIVING_STATE,
} from './actions';

const initialState = {
  receivingList: createAsyncState([]),
  receivingOperation: createAsyncState(null),
  confirmOperation: createAsyncState(null),
  labelPrint: createAsyncState(null),
  filter: {
    status: '',
    startDate: '',
    endDate: '',
  },
};

const receivingReducer = (state = initialState, action) => {
  switch (action.type) {
    // 입고 목록 조회
    case FETCH_RECEIVING_LIST.REQUEST:
      console.log("c")
      return { ...state, receivingList: { ...state.receivingList, loading: true, error: null } };
    case FETCH_RECEIVING_LIST.SUCCESS:
      console.log("b")
      // 기존 데이터와 새 데이터 병합 (중복 제거)
      const existingData = state.receivingList.data || [];
      const newData = action.payload || [];
      const newDataArray = Array.isArray(newData) ? newData : [];
      const mergedData = [...existingData];

      newDataArray.forEach((newItem) => {
        const existingIndex = mergedData.findIndex((item) => item.id === newItem.id);
        if (existingIndex >= 0) {
          // 기존 항목 업데이트
          mergedData[existingIndex] = newItem;
        } else {
          // 새 항목 추가
          mergedData.push(newItem);
        }
      });

      console.log('입고 목록 업데이트:', { 기존: existingData.length, 신규: newDataArray.length, 병합: mergedData.length });

      return { ...state, receivingList: { data: mergedData, loading: false, error: null } };
    case FETCH_RECEIVING_LIST.FAILURE:
      return { ...state, receivingList: { ...state.receivingList, loading: false, error: action.error } };

    // 입고 생성
    case CREATE_RECEIVING.REQUEST:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: true, error: null } };
    case CREATE_RECEIVING.SUCCESS:
      return {
        ...state,
        receivingList: {
          ...state.receivingList,
          data: [...state.receivingList.data, action.payload],
        },
        receivingOperation: { data: action.payload, loading: false, error: null }
      };
    case CREATE_RECEIVING.FAILURE:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: false, error: action.error } };

    // 입고 수정
    case UPDATE_RECEIVING.REQUEST:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: true, error: null } };
    case UPDATE_RECEIVING.SUCCESS:
      return {
        ...state,
        receivingList: {
          ...state.receivingList,
          data: state.receivingList.data.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
        receivingOperation: { data: action.payload, loading: false, error: null }
      };
    case UPDATE_RECEIVING.FAILURE:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: false, error: action.error } };

    // 입고 삭제
    case DELETE_RECEIVING.REQUEST:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: true, error: null } };
    case DELETE_RECEIVING.SUCCESS:
      return {
        ...state,
        receivingList: {
          ...state.receivingList,
          data: state.receivingList.data.filter((item) => item.id !== action.payload),
        },
        receivingOperation: { data: action.payload, loading: false, error: null }
      };
    case DELETE_RECEIVING.FAILURE:
      return { ...state, receivingOperation: { ...state.receivingOperation, loading: false, error: action.error } };

    // 입고 확정
    case CONFIRM_RECEIVING.REQUEST:
      return { ...state, confirmOperation: { ...state.confirmOperation, loading: true, error: null } };
    case CONFIRM_RECEIVING.SUCCESS:
      return {
        ...state,
        receivingList: {
          ...state.receivingList,
          data: state.receivingList.data.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
        confirmOperation: { data: action.payload, loading: false, error: null }
      };
    case CONFIRM_RECEIVING.FAILURE:
      return { ...state, confirmOperation: { ...state.confirmOperation, loading: false, error: action.error } };

    // 라벨 출력
    case PRINT_LABEL.REQUEST:
      return { ...state, labelPrint: { ...state.labelPrint, loading: true, error: null } };
    case PRINT_LABEL.SUCCESS:
      return { ...state, labelPrint: { data: action.payload, loading: false, error: null } };
    case PRINT_LABEL.FAILURE:
      return { ...state, labelPrint: { ...state.labelPrint, loading: false, error: action.error } };

    // UI 상태 관리
    case SET_RECEIVING_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case CLEAR_RECEIVING_ERROR:
      return {
        ...state,
        receivingList: { ...state.receivingList, error: null },
        receivingOperation: { ...state.receivingOperation, error: null },
        confirmOperation: { ...state.confirmOperation, error: null },
        labelPrint: { ...state.labelPrint, error: null },
      };

    case RESET_RECEIVING_STATE:
      return initialState;

    default:
      return state;
  }
};

export default receivingReducer;
