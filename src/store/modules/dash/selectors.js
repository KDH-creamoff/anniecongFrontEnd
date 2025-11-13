// ==================== Dash Selectors ====================

// 제조관리 통계
export const selectManufacturingStats = (state) => state.dash.manufacturingStats;
export const selectManufacturingStatsData = (state) => state.dash.manufacturingStats.data;
export const selectManufacturingStatsLoading = (state) => state.dash.manufacturingStats.loading;
export const selectManufacturingStatsError = (state) => state.dash.manufacturingStats.error;

// 입고 통계
export const selectReceivingStats = (state) => state.dash.receivingStats;
export const selectReceivingStatsData = (state) => state.dash.receivingStats.data;
export const selectReceivingStatsLoading = (state) => state.dash.receivingStats.loading;

// 제조 통계
export const selectProductionStats = (state) => state.dash.productionStats;
export const selectProductionStatsData = (state) => state.dash.productionStats.data;
export const selectProductionStatsLoading = (state) => state.dash.productionStats.loading;

// 출고 통계
export const selectShippingStats = (state) => state.dash.shippingStats;
export const selectShippingStatsData = (state) => state.dash.shippingStats.data;
export const selectShippingStatsLoading = (state) => state.dash.shippingStats.loading;

// 재고 알람
export const selectInventoryAlerts = (state) => state.dash.inventoryAlerts;
export const selectInventoryAlertsData = (state) => state.dash.inventoryAlerts.data;
export const selectInventoryAlertsCount = (state) => {
  const data = state.dash.inventoryAlerts.data;
  return data?.alerts?.length || 0;
};
export const selectInventoryAlertsLoading = (state) => state.dash.inventoryAlerts.loading;

// 유통기한 임박 알람
export const selectExpiryAlerts = (state) => state.dash.expiryAlerts;
export const selectExpiryAlertsData = (state) => state.dash.expiryAlerts.data;
export const selectExpiryAlertsCount = (state) => {
  const data = state.dash.expiryAlerts.data;
  return data?.alerts?.length || 0;
};
export const selectExpiryAlertsLoading = (state) => state.dash.expiryAlerts.loading;

// 승인 대기
export const selectPendingApprovals = (state) => state.dash.pendingApprovals;
export const selectPendingApprovalsData = (state) => state.dash.pendingApprovals.data;
export const selectPendingApprovalsCount = (state) => {
  const data = state.dash.pendingApprovals.data;
  return data?.approvals?.length || 0;
};
export const selectPendingApprovalsLoading = (state) => state.dash.pendingApprovals.loading;

// 최근 활동 내역
export const selectRecentActivities = (state) => state.dash.recentActivities;
export const selectRecentActivitiesData = (state) => state.dash.recentActivities.data;
export const selectRecentActivitiesLoading = (state) => state.dash.recentActivities.loading;

// 복합 Selector
export const selectTotalAlertsCount = (state) => {
  const inventoryCount = selectInventoryAlertsCount(state);
  const expiryCount = selectExpiryAlertsCount(state);
  const pendingCount = selectPendingApprovalsCount(state);
  return inventoryCount + expiryCount + pendingCount;
};

export const selectIsDashboardLoading = (state) => {
  return state.dash.manufacturingStats.loading ||
         state.dash.inventoryAlerts.loading ||
         state.dash.expiryAlerts.loading ||
         state.dash.pendingApprovals.loading;
};

export const selectHasDashboardError = (state) => {
  return !!state.dash.manufacturingStats.error ||
         !!state.dash.inventoryAlerts.error ||
         !!state.dash.expiryAlerts.error ||
         !!state.dash.pendingApprovals.error;
};
