// 배송 관리 셀렉터

// 배송 목록
export const selectShippingList = (state) => state.shipping.shippingList;
export const selectShippingListLoading = (state) => state.shipping.shippingListLoading;
export const selectShippingListError = (state) => state.shipping.shippingListError;

// B2B 배송 목록
export const selectB2BShippings = (state) => state.shipping.b2bShippings;
export const selectB2BShippingsLoading = (state) => state.shipping.b2bShippingsLoading;
export const selectB2BShippingsError = (state) => state.shipping.b2bShippingsError;

// BC2 배송 목록
export const selectBC2Shippings = (state) => state.shipping.bc2Shippings;
export const selectBC2ShippingsLoading = (state) => state.shipping.bc2ShippingsLoading;
export const selectBC2ShippingsError = (state) => state.shipping.bc2ShippingsError;

// 배송 생성
export const selectCreateLoading = (state) => state.shipping.createLoading;
export const selectCreateError = (state) => state.shipping.createError;

// 배송 수정
export const selectUpdateLoading = (state) => state.shipping.updateLoading;
export const selectUpdateError = (state) => state.shipping.updateError;

// 배송 삭제
export const selectDeleteLoading = (state) => state.shipping.deleteLoading;
export const selectDeleteError = (state) => state.shipping.deleteError;

// 배송 확정
export const selectConfirmLoading = (state) => state.shipping.confirmLoading;
export const selectConfirmError = (state) => state.shipping.confirmError;

// 파생 셀렉터

// 상태별 배송 목록
export const selectShippingsByStatus = (state, status) =>
  state.shipping.shippingList.filter(item => item.status === status);

// 대기 중인 배송 목록
export const selectPendingShippings = (state) =>
  state.shipping.shippingList.filter(item => item.status === '배송대기');

// 확정된 배송 목록
export const selectConfirmedShippings = (state) =>
  state.shipping.shippingList.filter(item => item.status === '배송중');

// 완료된 배송 목록
export const selectCompletedShippings = (state) =>
  state.shipping.shippingList.filter(item => item.status === '배송완료');

// 특정 날짜의 배송 목록
export const selectShippingsByDate = (state, date) =>
  state.shipping.shippingList.filter(item => item.orderDate === date);

// 특정 고객의 배송 목록
export const selectShippingsByCustomer = (state, customer) =>
  state.shipping.shippingList.filter(item => item.receiver === customer);

// ID로 특정 배송 조회
export const selectShippingById = (state, id) =>
  state.shipping.shippingList.find(item => item.id === id);

// 전체 로딩 상태 (하나라도 로딩 중이면 true)
export const selectIsAnyLoading = (state) =>
  state.shipping.shippingListLoading ||
  state.shipping.b2bShippingsLoading ||
  state.shipping.bc2ShippingsLoading ||
  state.shipping.createLoading ||
  state.shipping.updateLoading ||
  state.shipping.deleteLoading ||
  state.shipping.confirmLoading;
