import {
  FETCH_SHIPPING_LIST,
  CREATE_SHIPPING,
  UPDATE_SHIPPING,
  DELETE_SHIPPING,
  CONFIRM_SHIPPING,
  FETCH_B2B_SHIPPINGS,
  FETCH_BC2_SHIPPINGS,
} from './actions';

// 초기 상태
const initialState = {
  // 배송 목록
  shippingList: [],
  shippingListLoading: false,
  shippingListError: null,

  // B2B 배송 목록
  b2bShippings: [],
  b2bShippingsLoading: false,
  b2bShippingsError: null,

  // BC2 배송 목록
  bc2Shippings: [],
  bc2ShippingsLoading: false,
  bc2ShippingsError: null,

  // 배송 생성
  createLoading: false,
  createError: null,

  // 배송 수정
  updateLoading: false,
  updateError: null,

  // 배송 삭제
  deleteLoading: false,
  deleteError: null,

  // 배송 확정
  confirmLoading: false,
  confirmError: null,
};

// 리듀서
export default function shippingReducer(state = initialState, action) {
  switch (action.type) {
    // 배송 목록 조회
    case FETCH_SHIPPING_LIST.REQUEST:
      return {
        ...state,
        shippingListLoading: true,
        shippingListError: null,
      };
    case FETCH_SHIPPING_LIST.SUCCESS:
      return {
        ...state,
        shippingListLoading: false,
        shippingList: action.payload,
        shippingListError: null,
      };
    case FETCH_SHIPPING_LIST.FAILURE:
      return {
        ...state,
        shippingListLoading: false,
        shippingListError: action.payload,
      };

    // 배송 생성
    case CREATE_SHIPPING.REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
      };
    case CREATE_SHIPPING.SUCCESS:
      return {
        ...state,
        createLoading: false,
        shippingList: [action.payload, ...state.shippingList],
        createError: null,
      };
    case CREATE_SHIPPING.FAILURE:
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
      };

    // 배송 수정
    case UPDATE_SHIPPING.REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    case UPDATE_SHIPPING.SUCCESS:
      return {
        ...state,
        updateLoading: false,
        shippingList: state.shippingList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        updateError: null,
      };
    case UPDATE_SHIPPING.FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };

    // 배송 삭제
    case DELETE_SHIPPING.REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      };
    case DELETE_SHIPPING.SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        shippingList: state.shippingList.filter((item) => item.id !== action.payload),
        deleteError: null,
      };
    case DELETE_SHIPPING.FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };

    // 배송 확정
    case CONFIRM_SHIPPING.REQUEST:
      return {
        ...state,
        confirmLoading: true,
        confirmError: null,
      };
    case CONFIRM_SHIPPING.SUCCESS:
      return {
        ...state,
        confirmLoading: false,
        shippingList: state.shippingList.map((item) =>
          item.id === action.payload.id ? { ...item, status: '배송중' } : item
        ),
        confirmError: null,
      };
    case CONFIRM_SHIPPING.FAILURE:
      return {
        ...state,
        confirmLoading: false,
        confirmError: action.payload,
      };

    // B2B 배송 목록 조회
    case FETCH_B2B_SHIPPINGS.REQUEST:
      return {
        ...state,
        b2bShippingsLoading: true,
        b2bShippingsError: null,
      };
    case FETCH_B2B_SHIPPINGS.SUCCESS:
      return {
        ...state,
        b2bShippingsLoading: false,
        b2bShippings: action.payload,
        b2bShippingsError: null,
      };
    case FETCH_B2B_SHIPPINGS.FAILURE:
      return {
        ...state,
        b2bShippingsLoading: false,
        b2bShippingsError: action.payload,
      };

    // BC2 배송 목록 조회
    case FETCH_BC2_SHIPPINGS.REQUEST:
      return {
        ...state,
        bc2ShippingsLoading: true,
        bc2ShippingsError: null,
      };
    case FETCH_BC2_SHIPPINGS.SUCCESS:
      return {
        ...state,
        bc2ShippingsLoading: false,
        bc2Shippings: action.payload,
        bc2ShippingsError: null,
      };
    case FETCH_BC2_SHIPPINGS.FAILURE:
      return {
        ...state,
        bc2ShippingsLoading: false,
        bc2ShippingsError: action.payload,
      };

    default:
      return state;
  }
}
