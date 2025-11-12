// 배송 관리 액션 타입 정의

// 배송 목록 조회
export const FETCH_SHIPPING_LIST = {
  REQUEST: 'shipping/FETCH_SHIPPING_LIST_REQUEST',
  SUCCESS: 'shipping/FETCH_SHIPPING_LIST_SUCCESS',
  FAILURE: 'shipping/FETCH_SHIPPING_LIST_FAILURE',
};

// 배송 생성
export const CREATE_SHIPPING = {
  REQUEST: 'shipping/CREATE_SHIPPING_REQUEST',
  SUCCESS: 'shipping/CREATE_SHIPPING_SUCCESS',
  FAILURE: 'shipping/CREATE_SHIPPING_FAILURE',
};

// 배송 수정
export const UPDATE_SHIPPING = {
  REQUEST: 'shipping/UPDATE_SHIPPING_REQUEST',
  SUCCESS: 'shipping/UPDATE_SHIPPING_SUCCESS',
  FAILURE: 'shipping/UPDATE_SHIPPING_FAILURE',
};

// 배송 삭제
export const DELETE_SHIPPING = {
  REQUEST: 'shipping/DELETE_SHIPPING_REQUEST',
  SUCCESS: 'shipping/DELETE_SHIPPING_SUCCESS',
  FAILURE: 'shipping/DELETE_SHIPPING_FAILURE',
};

// 배송 확정
export const CONFIRM_SHIPPING = {
  REQUEST: 'shipping/CONFIRM_SHIPPING_REQUEST',
  SUCCESS: 'shipping/CONFIRM_SHIPPING_SUCCESS',
  FAILURE: 'shipping/CONFIRM_SHIPPING_FAILURE',
};

// B2B 배송 목록 조회
export const FETCH_B2B_SHIPPINGS = {
  REQUEST: 'shipping/FETCH_B2B_SHIPPINGS_REQUEST',
  SUCCESS: 'shipping/FETCH_B2B_SHIPPINGS_SUCCESS',
  FAILURE: 'shipping/FETCH_B2B_SHIPPINGS_FAILURE',
};

// BC2 배송 목록 조회
export const FETCH_BC2_SHIPPINGS = {
  REQUEST: 'shipping/FETCH_BC2_SHIPPINGS_REQUEST',
  SUCCESS: 'shipping/FETCH_BC2_SHIPPINGS_SUCCESS',
  FAILURE: 'shipping/FETCH_BC2_SHIPPINGS_FAILURE',
};

// 액션 생성자

// 배송 목록 조회
export const fetchShippingList = {
  request: (payload) => ({ type: FETCH_SHIPPING_LIST.REQUEST, payload }),
  success: (data) => ({ type: FETCH_SHIPPING_LIST.SUCCESS, payload: data }),
  failure: (error) => ({ type: FETCH_SHIPPING_LIST.FAILURE, payload: error }),
};

// 배송 생성
export const createShipping = {
  request: (payload) => ({ type: CREATE_SHIPPING.REQUEST, payload }),
  success: (data) => ({ type: CREATE_SHIPPING.SUCCESS, payload: data }),
  failure: (error) => ({ type: CREATE_SHIPPING.FAILURE, payload: error }),
};

// 배송 수정
export const updateShipping = {
  request: (payload) => ({ type: UPDATE_SHIPPING.REQUEST, payload }),
  success: (data) => ({ type: UPDATE_SHIPPING.SUCCESS, payload: data }),
  failure: (error) => ({ type: UPDATE_SHIPPING.FAILURE, payload: error }),
};

// 배송 삭제
export const deleteShipping = {
  request: (payload) => ({ type: DELETE_SHIPPING.REQUEST, payload }),
  success: (data) => ({ type: DELETE_SHIPPING.SUCCESS, payload: data }),
  failure: (error) => ({ type: DELETE_SHIPPING.FAILURE, payload: error }),
};

// 배송 확정
export const confirmShipping = {
  request: (payload) => ({ type: CONFIRM_SHIPPING.REQUEST, payload }),
  success: (data) => ({ type: CONFIRM_SHIPPING.SUCCESS, payload: data }),
  failure: (error) => ({ type: CONFIRM_SHIPPING.FAILURE, payload: error }),
};

// B2B 배송 목록 조회
export const fetchB2BShippings = {
  request: (payload) => ({ type: FETCH_B2B_SHIPPINGS.REQUEST, payload }),
  success: (data) => ({ type: FETCH_B2B_SHIPPINGS.SUCCESS, payload: data }),
  failure: (error) => ({ type: FETCH_B2B_SHIPPINGS.FAILURE, payload: error }),
};

// BC2 배송 목록 조회
export const fetchBC2Shippings = {
  request: (payload) => ({ type: FETCH_BC2_SHIPPINGS.REQUEST, payload }),
  success: (data) => ({ type: FETCH_BC2_SHIPPINGS.SUCCESS, payload: data }),
  failure: (error) => ({ type: FETCH_BC2_SHIPPINGS.FAILURE, payload: error }),
};
