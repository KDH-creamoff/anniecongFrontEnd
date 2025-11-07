// ==================== 입고 목록 셀렉터 ====================
// 입고 목록 데이터 (배열)
export const selectReceivingList = (state) => state.receiving.receivingList.data;
// 입고 목록 로딩 상태
export const selectReceivingListLoading = (state) => state.receiving.receivingList.loading;
// 입고 목록 에러
export const selectReceivingListError = (state) => state.receiving.receivingList.error;

// ==================== 입고 작업 셀렉터 ====================
// 입고 생성/수정 작업 결과 데이터
export const selectReceivingOperation = (state) => state.receiving.receivingOperation.data;
// 입고 생성/수정 작업 로딩 상태
export const selectReceivingOperationLoading = (state) => state.receiving.receivingOperation.loading;
// 입고 생성/수정 작업 에러
export const selectReceivingOperationError = (state) => state.receiving.receivingOperation.error;

// ==================== 입고 확정 셀렉터 ====================
// 입고 확정 작업 결과 데이터
export const selectConfirmOperation = (state) => state.receiving.confirmOperation.data;
// 입고 확정 작업 로딩 상태
export const selectConfirmOperationLoading = (state) => state.receiving.confirmOperation.loading;
// 입고 확정 작업 에러
export const selectConfirmOperationError = (state) => state.receiving.confirmOperation.error;

// ==================== 라벨 출력 셀렉터 ====================
// 라벨 출력 작업 결과 데이터
export const selectLabelPrint = (state) => state.receiving.labelPrint.data;
// 라벨 출력 작업 로딩 상태
export const selectLabelPrintLoading = (state) => state.receiving.labelPrint.loading;
// 라벨 출력 작업 에러
export const selectLabelPrintError = (state) => state.receiving.labelPrint.error;

// ==================== UI 상태 셀렉터 ====================
// 필터 상태 (검색 조건 등)
export const selectReceivingFilter = (state) => state.receiving.filter;
