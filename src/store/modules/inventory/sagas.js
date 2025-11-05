import { call, put, takeLatest } from 'redux-saga/effects';
import { inventoryAPI } from '../../../api';
import {
  FETCH_INVENTORY_STATUS,
  FETCH_INVENTORY_MOVEMENTS,
  FETCH_WAREHOUSE_UTILIZATION,
  FETCH_INVENTORY_ALERTS,
  UPDATE_TEMPERATURE,
  FETCH_TEMPERATURE_HISTORY,
  fetchInventoryStatus,
  fetchInventoryMovements,
  fetchWarehouseUtilization,
  fetchInventoryAlerts,
  updateTemperature,
  fetchTemperatureHistory,
} from './actions';

function* fetchInventoryStatusSaga(action) {
  try {
    const response = yield call(inventoryAPI.getInventoryStatus, action.payload);
    yield put(fetchInventoryStatus.success(response.data));
  } catch (error) {
    yield put(fetchInventoryStatus.failure(error.response?.data?.message || '재고 현황을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryMovementsSaga(action) {
  try {
    const response = yield call(inventoryAPI.getInventoryMovements, action.payload);
    yield put(fetchInventoryMovements.success(response.data));
  } catch (error) {
    yield put(fetchInventoryMovements.failure(error.response?.data?.message || '재고 이동 내역을 불러오는데 실패했습니다.'));
  }
}

function* fetchWarehouseUtilizationSaga() {
  try {
    const response = yield call(inventoryAPI.getWarehouseUtilization);
    yield put(fetchWarehouseUtilization.success(response.data));
  } catch (error) {
    yield put(fetchWarehouseUtilization.failure(error.response?.data?.message || '창고 가용률을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryAlertsSaga() {
  try {
    const response = yield call(inventoryAPI.getAlerts);
    yield put(fetchInventoryAlerts.success(response.data));
  } catch (error) {
    yield put(fetchInventoryAlerts.failure(error.response?.data?.message || '재고 알림을 불러오는데 실패했습니다.'));
  }
}

function* updateTemperatureSaga(action) {
  try {
    const response = yield call(inventoryAPI.updateTemperature, action.payload);
    yield put(updateTemperature.success(response.data));
    yield put(fetchTemperatureHistory.request());
  } catch (error) {
    yield put(updateTemperature.failure(error.response?.data?.message || '온도 기록 업데이트에 실패했습니다.'));
  }
}

function* fetchTemperatureHistorySaga(action) {
  try {
    const response = yield call(inventoryAPI.getTemperatureHistory, action.payload);
    yield put(fetchTemperatureHistory.success(response.data));
  } catch (error) {
    yield put(fetchTemperatureHistory.failure(error.response?.data?.message || '온도 이력을 불러오는데 실패했습니다.'));
  }
}

export default function* inventorySaga() {
  yield takeLatest(FETCH_INVENTORY_STATUS.REQUEST, fetchInventoryStatusSaga);
  yield takeLatest(FETCH_INVENTORY_MOVEMENTS.REQUEST, fetchInventoryMovementsSaga);
  yield takeLatest(FETCH_WAREHOUSE_UTILIZATION.REQUEST, fetchWarehouseUtilizationSaga);
  yield takeLatest(FETCH_INVENTORY_ALERTS.REQUEST, fetchInventoryAlertsSaga);
  yield takeLatest(UPDATE_TEMPERATURE.REQUEST, updateTemperatureSaga);
  yield takeLatest(FETCH_TEMPERATURE_HISTORY.REQUEST, fetchTemperatureHistorySaga);
}
