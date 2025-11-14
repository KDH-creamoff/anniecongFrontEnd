// ==================== 품목 관리 셀렉터 ====================
// 품목 목록 데이터 조회 (배열)
export const selectItems = (state) => state.basic.items.data;
// 품목 목록 로딩 상태
export const selectItemsLoading = (state) => state.basic.items.loading;
// 품목 목록 에러 정보
export const selectItemsError = (state) => state.basic.items.error;

// 품목 상세 정보 조회 (단일 객체)
export const selectItemDetail = (state) => state.basic.itemDetail.data;
// 품목 상세 정보 로딩 상태
export const selectItemDetailLoading = (state) => state.basic.itemDetail.loading;
// 품목 상세 정보 에러
export const selectItemDetailError = (state) => state.basic.itemDetail.error;

// 품목 등록/수정/삭제 작업 결과 데이터
export const selectItemOperation = (state) => state.basic.itemOperation.data;
// 품목 등록/수정/삭제 작업 로딩 상태
export const selectItemOperationLoading = (state) => state.basic.itemOperation.loading;
// 품목 등록/수정/삭제 작업 에러
export const selectItemOperationError = (state) => state.basic.itemOperation.error;

// ==================== BOM 관리 셀렉터 ====================
// BOM 목록 데이터 조회 (배열)
export const selectBoms = (state) => state.basic.boms.data;
// BOM 목록 로딩 상태
export const selectBomsLoading = (state) => state.basic.boms.loading;
// BOM 목록 에러 정보
export const selectBomsError = (state) => state.basic.boms.error;

// BOM 상세 정보 조회 (단일 객체)
export const selectBomDetail = (state) => state.basic.bomDetail.data;
// BOM 상세 정보 로딩 상태
export const selectBomDetailLoading = (state) => state.basic.bomDetail.loading;
// BOM 상세 정보 에러
export const selectBomDetailError = (state) => state.basic.bomDetail.error;

// BOM 등록/수정/삭제 작업 결과 데이터
export const selectBomOperation = (state) => state.basic.bomOperation.data;
// BOM 등록/수정/삭제 작업 로딩 상태
export const selectBomOperationLoading = (state) => state.basic.bomOperation.loading;
// BOM 등록/수정/삭제 작업 에러
export const selectBomOperationError = (state) => state.basic.bomOperation.error;

// ==================== 보관 조건 관리 셀렉터 ====================
// 보관 조건 목록 데이터 조회 (배열)
export const selectStorageConditions = (state) => state.basic.storageConditions.data;
// 보관 조건 목록 로딩 상태
export const selectStorageConditionsLoading = (state) => state.basic.storageConditions.loading;
// 보관 조건 목록 에러 정보
export const selectStorageConditionsError = (state) => state.basic.storageConditions.error;

// 보관 조건 상세 정보 조회 (단일 객체)
export const selectStorageConditionDetail = (state) => state.basic.storageConditionDetail.data;
// 보관 조건 상세 정보 로딩 상태
export const selectStorageConditionDetailLoading = (state) => state.basic.storageConditionDetail.loading;
// 보관 조건 상세 정보 에러
export const selectStorageConditionDetailError = (state) => state.basic.storageConditionDetail.error;

// 보관 조건 등록/수정 작업 결과 데이터
export const selectStorageOperation = (state) => state.basic.storageOperation.data;
// 보관 조건 등록/수정 작업 로딩 상태
export const selectStorageOperationLoading = (state) => state.basic.storageOperation.loading;
// 보관 조건 등록/수정 작업 에러
export const selectStorageOperationError = (state) => state.basic.storageOperation.error;

// ==================== 공장 정보 관리 셀렉터 ====================
// 공장 목록 데이터 조회 (배열)
export const selectFactories = (state) => state.basic.factories.data;
// 공장 목록 로딩 상태
export const selectFactoriesLoading = (state) => state.basic.factories.loading;
// 공장 목록 에러 정보
export const selectFactoriesError = (state) => state.basic.factories.error;

// 공장 상세 정보 조회 (단일 객체)
export const selectFactoryDetail = (state) => state.basic.factoryDetail.data;
// 공장 상세 정보 로딩 상태
export const selectFactoryDetailLoading = (state) => state.basic.factoryDetail.loading;
// 공장 상세 정보 에러
export const selectFactoryDetailError = (state) => state.basic.factoryDetail.error;

// 공장 등록/수정/삭제 작업 결과 데이터
export const selectFactoryOperation = (state) => state.basic.factoryOperation.data;
// 공장 등록/수정/삭제 작업 로딩 상태
export const selectFactoryOperationLoading = (state) => state.basic.factoryOperation.loading;
// 공장 등록/수정/삭제 작업 에러
export const selectFactoryOperationError = (state) => state.basic.factoryOperation.error;

// ==================== UI 상태 셀렉터 ====================
// 필터링 상태 (검색 조건 등)
export const selectBasicFilter = (state) => state.basic.filter;
