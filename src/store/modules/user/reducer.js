import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_USERS,
  DELETE_USER,
} from './actions';

// 초기 상태
const initialState = {
  // 사용자 목록
  users: createAsyncState([]),

  // 삭제 상태
  deleteStatus: createAsyncState(null),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==================== 사용자 목록 조회 ====================
    case FETCH_USERS.REQUEST:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: null,
        },
      };
    case FETCH_USERS.SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload.data || action.payload,
          loading: false,
          error: null,
        },
      };
    case FETCH_USERS.FAILURE:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: action.error,
        },
      };

    // ==================== 사용자 삭제 ====================
    case DELETE_USER.REQUEST:
      return {
        ...state,
        deleteStatus: {
          ...state.deleteStatus,
          loading: true,
          error: null,
        },
      };
    case DELETE_USER.SUCCESS:
      return {
        ...state,
        deleteStatus: {
          data: action.payload,
          loading: false,
          error: null,
        },
        users: {
          ...state.users,
          data: state.users.data.filter((user) => user.id !== action.payload.id),
        },
      };
    case DELETE_USER.FAILURE:
      return {
        ...state,
        deleteStatus: {
          ...state.deleteStatus,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
