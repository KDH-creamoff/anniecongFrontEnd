// ==================== 작업 지시서 관리 셀렉터 ====================
// 작업 지시서 목록 데이터 조회 (배열)
export const selectWorkOrders = (state) => state.manufacturing.workOrders.data;
// 작업 지시서 목록 로딩 상태
export const selectWorkOrdersLoading = (state) => state.manufacturing.workOrders.loading;
// 작업 지시서 목록 에러 정보
export const selectWorkOrdersError = (state) => state.manufacturing.workOrders.error;

// 작업 지시서 상세 정보 조회 (단일 객체)
export const selectWorkOrderDetail = (state) => state.manufacturing.workOrderDetail.data;
// 작업 지시서 상세 정보 로딩 상태
export const selectWorkOrderDetailLoading = (state) => state.manufacturing.workOrderDetail.loading;
// 작업 지시서 상세 정보 에러
export const selectWorkOrderDetailError = (state) => state.manufacturing.workOrderDetail.error;

// 작업 지시서 등록/수정/삭제 작업 결과 데이터
export const selectWorkOrderOperation = (state) => state.manufacturing.workOrderOperation.data;
// 작업 지시서 등록/수정/삭제 작업 로딩 상태
export const selectWorkOrderOperationLoading = (state) => state.manufacturing.workOrderOperation.loading;
// 작업 지시서 등록/수정/삭제 작업 에러
export const selectWorkOrderOperationError = (state) => state.manufacturing.workOrderOperation.error;

// ==================== 제조 이력 관리 셀렉터 ====================
// 제조 이력 목록 데이터 조회 (배열)
export const selectManufacturingHistory = (state) => state.manufacturing.manufacturingHistory.data;
// 제조 이력 목록 로딩 상태
export const selectManufacturingHistoryLoading = (state) => state.manufacturing.manufacturingHistory.loading;
// 제조 이력 목록 에러 정보
export const selectManufacturingHistoryError = (state) => state.manufacturing.manufacturingHistory.error;

// 날짜별 제조 이력 데이터 조회 (배열)
export const selectHistoryByDate = (state) => state.manufacturing.historyByDate.data;
// 날짜별 제조 이력 로딩 상태
export const selectHistoryByDateLoading = (state) => state.manufacturing.historyByDate.loading;
// 날짜별 제조 이력 에러
export const selectHistoryByDateError = (state) => state.manufacturing.historyByDate.error;

// 제조 기록 생성 결과 데이터
export const selectManufacturingRecord = (state) => state.manufacturing.manufacturingRecord.data;
// 제조 기록 생성 로딩 상태
export const selectManufacturingRecordLoading = (state) => state.manufacturing.manufacturingRecord.loading;
// 제조 기록 생성 에러
export const selectManufacturingRecordError = (state) => state.manufacturing.manufacturingRecord.error;

// ==================== 공장간 이동 관리 셀렉터 ====================
// 이송 목록 데이터 조회 (배열)
export const selectTransfers = (state) => state.manufacturing.transfers.data;
// 이송 목록 로딩 상태
export const selectTransfersLoading = (state) => state.manufacturing.transfers.loading;
// 이송 목록 에러 정보
export const selectTransfersError = (state) => state.manufacturing.transfers.error;

// 이송 상세 정보 조회 (단일 객체)
export const selectTransferDetail = (state) => state.manufacturing.transferDetail.data;
// 이송 상세 정보 로딩 상태
export const selectTransferDetailLoading = (state) => state.manufacturing.transferDetail.loading;
// 이송 상세 정보 에러
export const selectTransferDetailError = (state) => state.manufacturing.transferDetail.error;

// 이송 등록/상태변경/취소 작업 결과 데이터
export const selectTransferOperation = (state) => state.manufacturing.transferOperation.data;
// 이송 등록/상태변경/취소 작업 로딩 상태
export const selectTransferOperationLoading = (state) => state.manufacturing.transferOperation.loading;
// 이송 등록/상태변경/취소 작업 에러
export const selectTransferOperationError = (state) => state.manufacturing.transferOperation.error;

// ==================== 2공장 제조 관리 셀렉터 ====================
// 2공장 작업 목록 데이터 조회 (배열)
export const selectFactory2Works = (state) => state.manufacturing.factory2Works.data;
// 2공장 작업 목록 로딩 상태
export const selectFactory2WorksLoading = (state) => state.manufacturing.factory2Works.loading;
// 2공장 작업 목록 에러 정보
export const selectFactory2WorksError = (state) => state.manufacturing.factory2Works.error;

// 2공장 주문 목록 데이터 조회 (배열)
export const selectFactory2Orders = (state) => state.manufacturing.factory2Orders.data;
// 2공장 주문 목록 로딩 상태
export const selectFactory2OrdersLoading = (state) => state.manufacturing.factory2Orders.loading;
// 2공장 주문 목록 에러 정보
export const selectFactory2OrdersError = (state) => state.manufacturing.factory2Orders.error;

// 2공장 작업 상태 변경 결과 데이터
export const selectFactory2Operation = (state) => state.manufacturing.factory2Operation.data;
// 2공장 작업 상태 변경 로딩 상태
export const selectFactory2OperationLoading = (state) => state.manufacturing.factory2Operation.loading;
// 2공장 작업 상태 변경 에러
export const selectFactory2OperationError = (state) => state.manufacturing.factory2Operation.error;

// ==================== 작업 통계 셀렉터 ====================
// 작업 통계 데이터 (진행중/대기/완료 작업 수, 작업자 수)
export const selectWorkStatistics = (state) => state.manufacturing.workStatistics.data;
// 작업 통계 로딩 상태
export const selectWorkStatisticsLoading = (state) => state.manufacturing.workStatistics.loading;
// 작업 통계 에러
export const selectWorkStatisticsError = (state) => state.manufacturing.workStatistics.error;

// ==================== 캘린더 데이터 셀렉터 ====================
// 캘린더 요약 데이터 (날짜별 작업 요약)
export const selectCalendarSummary = (state) => state.manufacturing.calendarSummary.data;
// 캘린더 요약 데이터 로딩 상태
export const selectCalendarSummaryLoading = (state) => state.manufacturing.calendarSummary.loading;
// 캘린더 요약 데이터 에러
export const selectCalendarSummaryError = (state) => state.manufacturing.calendarSummary.error;

// ==================== UI 상태 셀렉터 ====================
// 필터링 상태 (검색 조건, 작업 상태, 공장, 날짜 범위 등)
export const selectManufacturingFilter = (state) => state.manufacturing.filter;
