import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';


// 배송 목록 조회
export const FETCH_SHIPPING_LIST = createRequestTypes('shipping/FETCH_SHIPPING_LIST');

// 배송 생성
export const CREATE_SHIPPING = createRequestTypes('shipping/CREATE_SHIPPING');

// 배송 수정
export const UPDATE_SHIPPING = createRequestTypes('shipping/UPDATE_SHIPPING');

// 배송 삭제
export const DELETE_SHIPPING = createRequestTypes('shipping/DELETE_SHIPPING');

// 배송 확정
export const CONFIRM_SHIPPING = createRequestTypes('shipping/CONFIRM_SHIPPING');

// B2B 배송 목록 조회
export const FETCH_B2B_SHIPPINGS = createRequestTypes('shipping/FETCH_B2B_SHIPPINGS');

// BC2 배송 목록 조회
export const FETCH_BC2_SHIPPINGS = createRequestTypes('shipping/FETCH_BC2_SHIPPINGS');

// 배송 목록 조회
export const fetchShippingList = createAsyncActions(FETCH_SHIPPING_LIST);

// 배송 생성
export const createShipping = createAsyncActions(CREATE_SHIPPING); 

// 배송 수정
export const updateShipping = createAsyncActions(UPDATE_SHIPPING);

// 배송 삭제
export const deleteShipping = createAsyncActions(DELETE_SHIPPING);

// 배송 확정
export const confirmShipping = createAsyncActions(CONFIRM_SHIPPING);

// B2B 배송 목록 조회
export const fetchB2BShippings = createAsyncActions(FETCH_B2B_SHIPPINGS);

// BC2 배송 목록 조회
export const fetchBC2Shippings = createAsyncActions(FETCH_BC2_SHIPPINGS);