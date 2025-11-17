import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_APPROVAL_INBOX,
  FETCH_APPROVAL_DETAIL,
  APPROVE_REQUEST,
  REJECT_REQUEST,
  CREATE_APPROVAL_DOCUMENT,
  SET_APPROVAL_FILTER,
  CLEAR_APPROVAL_ERROR,
  RESET_APPROVAL_STATE,
} from './actions';

const initialState = {
  // 결재함 목록
  inbox: createAsyncState([]),

  // 결재 상세 정보
  detail: createAsyncState(null),

  // 승인 처리
  approveOperation: createAsyncState(null),

  // 반려 처리
  rejectOperation: createAsyncState(null),

  // 문서 생성
  createDocument: createAsyncState(null),

  // 필터 상태
  filter: {
    status: '', // pending, approved, rejected
    type: '', // 결재 유형
    startDate: '',
    endDate: '',
    searchText: '',
  },
};

const approvalReducer = (state = initialState, action) => {
  switch (action.type) {
    // 결재함 목록 조회
    case FETCH_APPROVAL_INBOX.REQUEST:
      return { 
        ...state, 
        inbox: { ...state.inbox, loading: true, error: null } 
      };
    case FETCH_APPROVAL_INBOX.SUCCESS:
      return { 
        ...state, 
        inbox: { data: action.payload, loading: false, error: null } 
      };
    case FETCH_APPROVAL_INBOX.FAILURE:
      return { 
        ...state, 
        inbox: { ...state.inbox, loading: false, error: action.error } 
      };

    // 결재 상세 조회
    case FETCH_APPROVAL_DETAIL.REQUEST:
      return { 
        ...state, 
        detail: { ...state.detail, loading: true, error: null } 
      };
    case FETCH_APPROVAL_DETAIL.SUCCESS:
      return { 
        ...state, 
        detail: { data: action.payload, loading: false, error: null } 
      };
    case FETCH_APPROVAL_DETAIL.FAILURE:
      return { 
        ...state, 
        detail: { ...state.detail, loading: false, error: action.error } 
      };

    // 결재 승인
    case APPROVE_REQUEST.REQUEST:
      return { 
        ...state, 
        approveOperation: { ...state.approveOperation, loading: true, error: null } 
      };
    case APPROVE_REQUEST.SUCCESS:
      return { 
        ...state, 
        approveOperation: { data: action.payload, loading: false, error: null },
        // 승인 후 상세 정보 업데이트
        detail: state.detail.data 
          ? { 
              ...state.detail, 
              data: { ...state.detail.data, status: 'approved' } 
            }
          : state.detail,
      };
    case APPROVE_REQUEST.FAILURE:
      return { 
        ...state, 
        approveOperation: { ...state.approveOperation, loading: false, error: action.error } 
      };

    // 결재 반려
    case REJECT_REQUEST.REQUEST:
      return {
        ...state,
        rejectOperation: { ...state.rejectOperation, loading: true, error: null }
      };
    case REJECT_REQUEST.SUCCESS:
      return {
        ...state,
        rejectOperation: { data: action.payload, loading: false, error: null },
        // 반려 후 상세 정보 업데이트
        detail: state.detail.data
          ? {
              ...state.detail,
              data: { ...state.detail.data, status: 'rejected' }
            }
          : state.detail,
      };
    case REJECT_REQUEST.FAILURE:
      return {
        ...state,
        rejectOperation: { ...state.rejectOperation, loading: false, error: action.error }
      };

    // 결재 문서 생성
    case CREATE_APPROVAL_DOCUMENT.REQUEST:
      return {
        ...state,
        createDocument: { ...state.createDocument, loading: true, error: null }
      };
    case CREATE_APPROVAL_DOCUMENT.SUCCESS:
      return {
        ...state,
        createDocument: { data: action.payload, loading: false, error: null }
      };
    case CREATE_APPROVAL_DOCUMENT.FAILURE:
      return {
        ...state,
        createDocument: { ...state.createDocument, loading: false, error: action.error }
      };

    // UI 상태 관리
    case SET_APPROVAL_FILTER:
      return { 
        ...state, 
        filter: { ...state.filter, ...action.payload } 
      };

    case CLEAR_APPROVAL_ERROR:
      return {
        ...state,
        inbox: { ...state.inbox, error: null },
        detail: { ...state.detail, error: null },
        approveOperation: { ...state.approveOperation, error: null },
        rejectOperation: { ...state.rejectOperation, error: null },
        createDocument: { ...state.createDocument, error: null },
      };

    case RESET_APPROVAL_STATE:
      return initialState;

    default:
      return state;
  }
};

export default approvalReducer;