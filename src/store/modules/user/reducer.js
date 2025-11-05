import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_USERS,
  FETCH_USER_DETAIL,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_ACCESS_LOGS,
  SET_SELECTED_USER,
  CLEAR_USER_ERROR,
  RESET_USER_STATE,
} from './actions';

// 초기 상태
const initialState = {
  // 사용자 목록
  users: createAsyncState([]),

  // 사용자 상세 정보
  userDetail: createAsyncState(null),

  // 접근 로그
  accessLogs: createAsyncState([]),

  // 생성/수정/삭제 상태
  createStatus: createAsyncState(null),
  updateStatus: createAsyncState(null),
  deleteStatus: createAsyncState(null),

  // UI 상태
  selectedUser: null,

  // 페이지네이션
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 10,
  },
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
        pagination: action.payload.pagination || state.pagination,
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

    // ==================== 사용자 상세 조회 ====================
    case FETCH_USER_DETAIL.REQUEST:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          loading: true,
          error: null,
        },
      };
    case FETCH_USER_DETAIL.SUCCESS:
      return {
        ...state,
        userDetail: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case FETCH_USER_DETAIL.FAILURE:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          loading: false,
          error: action.error,
        },
      };

    // ==================== 사용자 생성 ====================
    case CREATE_USER.REQUEST:
      return {
        ...state,
        createStatus: {
          ...state.createStatus,
          loading: true,
          error: null,
        },
      };
    case CREATE_USER.SUCCESS:
      return {
        ...state,
        createStatus: {
          data: action.payload,
          loading: false,
          error: null,
        },
        users: {
          ...state.users,
          data: [action.payload, ...state.users.data],
        },
      };
    case CREATE_USER.FAILURE:
      return {
        ...state,
        createStatus: {
          ...state.createStatus,
          loading: false,
          error: action.error,
        },
      };

    // ==================== 사용자 수정 ====================
    case UPDATE_USER.REQUEST:
      return {
        ...state,
        updateStatus: {
          ...state.updateStatus,
          loading: true,
          error: null,
        },
      };
    case UPDATE_USER.SUCCESS:
      return {
        ...state,
        updateStatus: {
          data: action.payload,
          loading: false,
          error: null,
        },
        users: {
          ...state.users,
          data: state.users.data.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        },
      };
    case UPDATE_USER.FAILURE:
      return {
        ...state,
        updateStatus: {
          ...state.updateStatus,
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

    // ==================== 접근 로그 조회 ====================
    case FETCH_ACCESS_LOGS.REQUEST:
      return {
        ...state,
        accessLogs: {
          ...state.accessLogs,
          loading: true,
          error: null,
        },
      };
    case FETCH_ACCESS_LOGS.SUCCESS:
      return {
        ...state,
        accessLogs: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case FETCH_ACCESS_LOGS.FAILURE:
      return {
        ...state,
        accessLogs: {
          ...state.accessLogs,
          loading: false,
          error: action.error,
        },
      };

    // ==================== UI 상태 ====================
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case CLEAR_USER_ERROR:
      return {
        ...state,
        users: { ...state.users, error: null },
        userDetail: { ...state.userDetail, error: null },
        createStatus: { ...state.createStatus, error: null },
        updateStatus: { ...state.updateStatus, error: null },
        deleteStatus: { ...state.deleteStatus, error: null },
      };

    case RESET_USER_STATE:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
