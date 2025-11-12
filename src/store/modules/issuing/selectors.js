// ==================== 출고 관리 셀렉터 ====================

// 출고 목록
export const selectIssuingList = (state) => state.issuing.issuingList;
export const selectIssuingListLoading = (state) => state.issuing.issuingListLoading;
export const selectIssuingListError = (state) => state.issuing.issuingListError;

// 출고 통계
export const selectIssuingStats = (state) => state.issuing.issuingStats;
export const selectIssuingStatsLoading = (state) => state.issuing.issuingStatsLoading;
export const selectIssuingStatsError = (state) => state.issuing.issuingStatsError;

// 출고 생성
export const selectCreateLoading = (state) => state.issuing.createLoading;
export const selectCreateError = (state) => state.issuing.createError;

// 출고 수정
export const selectUpdateLoading = (state) => state.issuing.updateLoading;
export const selectUpdateError = (state) => state.issuing.updateError;

// 출고 삭제
export const selectDeleteLoading = (state) => state.issuing.deleteLoading;
export const selectDeleteError = (state) => state.issuing.deleteError;

// 일괄 출고
export const selectBatchLoading = (state) => state.issuing.batchLoading;
export const selectBatchError = (state) => state.issuing.batchError;

// ==================== 파생 셀렉터 ====================

// 상태별 출고 목록
export const selectPendingIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.status === '대기');

export const selectCompletedIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.status === '완료');

// 카테고리별 출고 목록
export const selectIssuingsByCategory = (state, category) =>
  state.issuing.issuingList.filter(item => item.category === category);

// 원재료 출고 목록
export const selectRawMaterialIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.category === '원재료');

// 완제품 출고 목록
export const selectFinishedProductIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.category === '완제품');

// 사유별 출고 목록
export const selectIssuingsByReason = (state, reason) =>
  state.issuing.issuingList.filter(item => item.reason === reason);

// B2B 판매 출고 목록
export const selectB2BIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.reason === 'B2B 판매');

// B2C 판매 출고 목록
export const selectB2CIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.reason === 'B2C 판매');

// 생산 투입 출고 목록
export const selectProductionIssuings = (state) =>
  state.issuing.issuingList.filter(item => item.reason === '생산 투입');

// 특정 날짜의 출고 목록
export const selectIssuingsByDate = (state, date) =>
  state.issuing.issuingList.filter(item => item.date === date);

// 특정 공장의 출고 목록
export const selectIssuingsByFactory = (state, factoryId) =>
  state.issuing.issuingList.filter(item => item.factoryId === factoryId);

// 특정 품목의 출고 목록
export const selectIssuingsByItem = (state, itemCode) =>
  state.issuing.issuingList.filter(item => item.itemCode === itemCode);

// 특정 고객의 출고 목록
export const selectIssuingsByCustomer = (state, customer) =>
  state.issuing.issuingList.filter(item => item.toCustomer === customer);

// ID로 특정 출고 조회
export const selectIssuingById = (state, id) =>
  state.issuing.issuingList.find(item => item.id === id);

// 전체 로딩 상태 (하나라도 로딩 중이면 true)
export const selectIsAnyLoading = (state) =>
  state.issuing.issuingListLoading ||
  state.issuing.issuingStatsLoading ||
  state.issuing.createLoading ||
  state.issuing.updateLoading ||
  state.issuing.deleteLoading ||
  state.issuing.batchLoading;

// 오늘 출고 건수
export const selectTodayIssuingCount = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.issuing.issuingList.filter(item => item.date === today).length;
};

// 오늘 출고 수량 합계
export const selectTodayIssuingTotal = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.issuing.issuingList
    .filter(item => item.date === today)
    .reduce((sum, item) => sum + item.quantity, 0);
};
