import { call, put } from 'redux-saga/effects';

/**
 * API 호출을 위한 공통 Saga 생성 헬퍼
 * @param {Function} apiFunc - API 호출 함수
 * @param {Object} actions - { request, success, failure } 액션 생성자
 */
export function* createApiSaga(apiFunc, actions) {
  return function* (action) {
    try {
      const response = yield call(apiFunc, action.payload);
      yield put(actions.success(response.data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      yield put(actions.failure(errorMessage));
    }
  };
}

/**
 * 액션 타입 생성 헬퍼
 * @param {string} type - 액션 타입 베이스 이름
 * @returns {Object} REQUEST, SUCCESS, FAILURE 액션 타입
 */
export const createRequestTypes = (type) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
});

/**
 * 비동기 액션 생성자 헬퍼
 * @param {Object} actionTypes - REQUEST, SUCCESS, FAILURE 타입
 * @returns {Object} request, success, failure 액션 생성자
 */
export const createAsyncActions = (actionTypes) => ({
  request: (payload) => ({ type: actionTypes.REQUEST, payload }),
  success: (payload) => ({ type: actionTypes.SUCCESS, payload }),
  failure: (error) => ({ type: actionTypes.FAILURE, error }),
});

/**
 * 비동기 상태 초기값 생성
 */
export const createAsyncState = (initialData = null) => ({
  data: initialData,
  loading: false,
  error: null,
});

/**
 * 비동기 리듀서 헬퍼
 * @param {Object} state - 현재 상태
 * @param {string} key - 상태 키 (예: 'users', 'inventoryList')
 * @returns {Object} 리듀서 핸들러 객체
 */
export const createAsyncReducer = (key) => ({
  request: (state) => {
    state[key].loading = true;
    state[key].error = null;
  },
  success: (state, action) => {
    state[key].loading = false;
    state[key].data = action.payload;
  },
  failure: (state, action) => {
    state[key].loading = false;
    state[key].error = action.error;
  },
});

/**
 * API 에러 처리 헬퍼
 */
export const handleApiError = (error) => {
  if (error.response) {
    // 서버에서 응답이 왔지만 에러인 경우
    return {
      status: error.response.status,
      message: error.response.data?.message || '서버 오류가 발생했습니다.',
      data: error.response.data,
    };
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    return {
      message: '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.',
    };
  } else {
    // 요청 설정 중에 오류가 발생한 경우
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
    };
  }
};
