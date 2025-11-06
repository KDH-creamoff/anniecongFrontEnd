// 품목 관리
export const selectItems = (state) => state.basic.items.data;
export const selectItemsLoading = (state) => state.basic.items.loading;
export const selectItemsError = (state) => state.basic.items.error;

export const selectItemDetail = (state) => state.basic.itemDetail.data;
export const selectItemDetailLoading = (state) => state.basic.itemDetail.loading;
export const selectItemDetailError = (state) => state.basic.itemDetail.error;

export const selectItemOperation = (state) => state.basic.itemOperation.data;
export const selectItemOperationLoading = (state) => state.basic.itemOperation.loading;
export const selectItemOperationError = (state) => state.basic.itemOperation.error;

// BOM 관리
export const selectBoms = (state) => state.basic.boms.data;
export const selectBomsLoading = (state) => state.basic.boms.loading;
export const selectBomsError = (state) => state.basic.boms.error;

export const selectBomDetail = (state) => state.basic.bomDetail.data;
export const selectBomDetailLoading = (state) => state.basic.bomDetail.loading;
export const selectBomDetailError = (state) => state.basic.bomDetail.error;

export const selectBomOperation = (state) => state.basic.bomOperation.data;
export const selectBomOperationLoading = (state) => state.basic.bomOperation.loading;
export const selectBomOperationError = (state) => state.basic.bomOperation.error;

// 보관 조건 관리
export const selectStorageConditions = (state) => state.basic.storageConditions.data;
export const selectStorageConditionsLoading = (state) => state.basic.storageConditions.loading;
export const selectStorageConditionsError = (state) => state.basic.storageConditions.error;

export const selectStorageConditionDetail = (state) => state.basic.storageConditionDetail.data;
export const selectStorageConditionDetailLoading = (state) => state.basic.storageConditionDetail.loading;
export const selectStorageConditionDetailError = (state) => state.basic.storageConditionDetail.error;

export const selectStorageOperation = (state) => state.basic.storageOperation.data;
export const selectStorageOperationLoading = (state) => state.basic.storageOperation.loading;
export const selectStorageOperationError = (state) => state.basic.storageOperation.error;

// UI 상태
export const selectBasicFilter = (state) => state.basic.filter;
