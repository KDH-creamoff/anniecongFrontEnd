export const selectInventoryStatus = (state) => state.inventory.inventoryStatus.data;
export const selectInventoryStatusLoading = (state) => state.inventory.inventoryStatus.loading;
export const selectInventoryMovements = (state) => state.inventory.inventoryMovements.data;
export const selectWarehouseUtilization = (state) => state.inventory.warehouseUtilization.data;
export const selectInventoryAlerts = (state) => state.inventory.alerts.data;
export const selectTemperatureHistory = (state) => state.inventory.temperatureHistory.data;
export const selectInventoryFilter = (state) => state.inventory.filter;
