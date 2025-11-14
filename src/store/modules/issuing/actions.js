// 출고 목록 조회
export const FETCH_ISSUING_LIST = {
  REQUEST: 'issuing/FETCH_ISSUING_LIST_REQUEST',
  SUCCESS: 'issuing/FETCH_ISSUING_LIST_SUCCESS',
  FAILURE: 'issuing/FETCH_ISSUING_LIST_FAILURE',
};

// 출고 생성
export const CREATE_ISSUING = {
  REQUEST: 'issuing/CREATE_ISSUING_REQUEST',
  SUCCESS: 'issuing/CREATE_ISSUING_SUCCESS',
  FAILURE: 'issuing/CREATE_ISSUING_FAILURE',
};

// 출고 수정
export const UPDATE_ISSUING = {
  REQUEST: 'issuing/UPDATE_ISSUING_REQUEST',
  SUCCESS: 'issuing/UPDATE_ISSUING_SUCCESS',
  FAILURE: 'issuing/UPDATE_ISSUING_FAILURE',
};

// 출고 삭제
export const DELETE_ISSUING = {
  REQUEST: 'issuing/DELETE_ISSUING_REQUEST',
  SUCCESS: 'issuing/DELETE_ISSUING_SUCCESS',
  FAILURE: 'issuing/DELETE_ISSUING_FAILURE',
};

// 일괄 출고
export const BATCH_ISSUE = {
  REQUEST: 'issuing/BATCH_ISSUE_REQUEST',
  SUCCESS: 'issuing/BATCH_ISSUE_SUCCESS',
  FAILURE: 'issuing/BATCH_ISSUE_FAILURE',
};

// 출고 통계
export const FETCH_ISSUING_STATS = {
  REQUEST: 'issuing/FETCH_ISSUING_STATS_REQUEST',
  SUCCESS: 'issuing/FETCH_ISSUING_STATS_SUCCESS',
  FAILURE: 'issuing/FETCH_ISSUING_STATS_FAILURE',
};

// ==================== 액션 생성자 ====================

// 출고 목록 조회
export const fetchIssuingList = {
  request: (payload) => ({ type: FETCH_ISSUING_LIST.REQUEST, payload }),
  success: (data) => ({ type: FETCH_ISSUING_LIST.SUCCESS, payload: data }),
  failure: (error) => ({ type: FETCH_ISSUING_LIST.FAILURE, payload: error }),
};

// 출고 생성
export const createIssuing = {
  request: (payload) => ({ type: CREATE_ISSUING.REQUEST, payload }),
  success: (data) => ({ type: CREATE_ISSUING.SUCCESS, payload: data }),
  failure: (error) => ({ type: CREATE_ISSUING.FAILURE, payload: error }),
};

// 출고 수정
export const updateIssuing = {
  request: (payload) => ({ type: UPDATE_ISSUING.REQUEST, payload }),
  success: (data) => ({ type: UPDATE_ISSUING.SUCCESS, payload: data }),
  failure: (error) => ({ type: UPDATE_ISSUING.FAILURE, payload: error }),
};

// 출고 삭제
export const deleteIssuing = {
  request: (payload) => ({ type: DELETE_ISSUING.REQUEST, payload }),
  success: (data) => ({ type: DELETE_ISSUING.SUCCESS, payload: data }),
  failure: (error) => ({ type: DELETE_ISSUING.FAILURE, payload: error }),
};

// 일괄 출고
export const batchIssue = {
  request: (payload) => ({ type: BATCH_ISSUE.REQUEST, payload }),
  success: (data) => ({ type: BATCH_ISSUE.SUCCESS, payload: data }),
  failure: (error) => ({ type: BATCH_ISSUE.FAILURE, payload: error }),
};

// 출고 통계
export const fetchIssuingStats = {
  request: (payload) => ({ type: FETCH_ISSUING_STATS.REQUEST, payload }),
  success: (data) => ({ type: FETCH_ISSUING_STATS.SUCCESS, payload: data }),
  failure: (error) => ({ type: FETCH_ISSUING_STATS.FAILURE, payload: error }),
};
