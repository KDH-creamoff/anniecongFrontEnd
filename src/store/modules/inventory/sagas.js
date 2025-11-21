import { call, put, takeLatest } from 'redux-saga/effects';
import { inventoryAPI, notificationsAPI, temperatureAPI } from '../../../api';
import {
  FETCH_INVENTORY_STATUS,
  FETCH_INVENTORY_MOVEMENTS,
  FETCH_WAREHOUSE_UTILIZATION,
  FETCH_INVENTORY_ALERTS,
  UPDATE_TEMPERATURE,
  DELETE_TEMPERATURE,
  FETCH_TEMPERATURE_HISTORY,
  fetchInventoryStatus,
  fetchInventoryMovements,
  fetchWarehouseUtilization,
  fetchInventoryAlerts,
  updateTemperature,
  fetchTemperatureHistory,
  deleteTemperature,
} from './actions';

// 창고별 이용률 계산을 위한 함수
const calculateWarehouseUtilization = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // 해당 월의 입고 및 제조된 품목 (분모)
  const receivedItems = mockInventoryMovements.filter(movement => {
    const movementDate = new Date(movement.time);
    const isCurrentMonth = movementDate.getFullYear() === currentYear &&
                          (movementDate.getMonth() + 1) === currentMonth;
    return isCurrentMonth && (movement.type === '입고' || movement.type === '생산');
  });

  // 해당 월의 출고 및 공장 이동이 발생한 품목 (분자)
  const issuedItems = mockInventoryMovements.filter(movement => {
    const movementDate = new Date(movement.time);
    const isCurrentMonth = movementDate.getFullYear() === currentYear &&
                          (movementDate.getMonth() + 1) === currentMonth;
    return isCurrentMonth && (movement.type === '출고' || movement.type === '이동');
  });

  // 공장별로 그룹화
  const factories = ['1공장 창고A', '1공장 창고B', '2공장 창고'];

  return factories.map(factory => {
    // 해당 공장의 입고/제조 품목 수
    const receivedCount = receivedItems.filter(item =>
      item.toLocation?.includes(factory.split(' ')[0])
    ).length;

    // 해당 공장의 출고/이동 품목 수
    const issuedCount = issuedItems.filter(item =>
      item.fromLocation?.includes(factory.split(' ')[0])
    ).length;

    // 이용률 계산: (출고+이동) / (입고+제조) * 100
    const percentage = receivedCount > 0
      ? Math.round((issuedCount / receivedCount) * 100)
      : 0;

    let note = '';
    if (percentage >= 90) {
      note = '높은 이용률 - 재고 회전이 빠름';
    } else if (percentage >= 60) {
      note = '정상 운영 중';
    } else if (percentage > 0) {
      note = '재고 회전 느림 - 재고 확인 필요';
    } else {
      note = '해당 월 이동 내역 없음';
    }

    return {
      factory: {
        code: factory,
        name: factory
      },
      percentage,
      itemCount: receivedCount,
      issuedCount,
      note
    };
  });
};

// 유통기한 상태를 계산하는 함수
const calculateExpirationStatus = (expirationDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expDate = new Date(expirationDate);
  expDate.setHours(0, 0, 0, 0);

  const diffTime = expDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

function* fetchInventoryStatusSaga(action) {
  try {
    // 백엔드 API 사용
    const params = action.payload || {};
    const response = yield call(inventoryAPI.getInventories, params);
    
    // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
    const inventories = response.data?.data || response.data || [];
    const inventoriesArray = Array.isArray(inventories) ? inventories : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedInventories = inventoriesArray.map((inv) => {
      const item = inv.item || inv.Item || {};
      const factory = inv.factory || inv.Factory || {};
      
      // 백엔드에서 이미 계산된 값 사용
      const daysLeft = inv.daysLeft !== undefined ? inv.daysLeft : null;
      const status = inv.statusLabel || inv.status || '정상';
      const expirationDate = inv.expirationDate || inv.expiration_date;
      
      return {
        id: inv.id,
        code: item.code || inv.item_code || '',
        item: item.name || inv.item_name || '',
        category: item.categoryLabel || item.category || inv.category || '',
        quantity: inv.quantity || 0,
        unit: inv.unit || item.unit || '',
        factory: factory.name || inv.factory_name || '',
        lotNumber: inv.barcode || inv.lot_number || '',
        expirationDate: expirationDate,
        daysLeft: daysLeft,
        status: status,
      };
    });
    
    yield put(fetchInventoryStatus.success(transformedInventories));
  } catch (error) {
    yield put(fetchInventoryStatus.failure(error.response?.data?.message || '재고 현황을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryMovementsSaga(action) {
  try {
    // 백엔드 API 사용
    const params = action.payload || {};
    const response = yield call(inventoryAPI.getMovements, params);
    
    // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
    const movements = response.data?.data || response.data || [];
    const movementsArray = Array.isArray(movements) ? movements : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    // 실제 백엔드 응답: {time, type, category, code, quantity, fromLocation, toLocation, manager, note}
    const transformedMovements = movementsArray.map((mov) => {
      // 백엔드에서 이미 변환된 형식이므로 그대로 사용
      return {
        time: mov.time || '',
        type: mov.type || '',
        category: mov.category || '',
        lotNumber: mov.code || mov.lotNumber || '',
        quantity: mov.quantity || '',
        fromLocation: mov.fromLocation || '',
        toLocation: mov.toLocation || '',
        manager: mov.manager || '',
        note: mov.note || '',
      };
    });
    
    yield put(fetchInventoryMovements.success(transformedMovements));
  } catch (error) {
    yield put(fetchInventoryMovements.failure(error.response?.data?.message || '재고 이동 내역을 불러오는데 실패했습니다.'));
  }
}

function* fetchWarehouseUtilizationSaga() {
  try {
    // 백엔드 API 사용
    const response = yield call(inventoryAPI.getUtilization);
    
    // 백엔드 응답 형식: { ok: true, data: { byFactory: [...] } }
    const utilizationData = response.data?.data || response.data || {};
    const byFactory = utilizationData.byFactory || [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedUtilization = byFactory.map((factory) => {
      const utilizationRate = factory.utilizationRate || factory.utilization_rate || 0;
      
      return {
        factory: {
          code: factory.factoryName || factory.factory_name || factory.factory?.name || '',
          name: factory.factoryName || factory.factory_name || factory.factory?.name || '',
        },
        percentage: utilizationRate,
        itemCount: factory.usedCapacity || factory.used_capacity || 0,
        issuedCount: factory.totalCapacity || factory.total_capacity || 0,
        note: utilizationRate >= 90 
          ? '높은 이용률 - 재고 회전이 빠름'
          : utilizationRate >= 60
          ? '정상 운영 중'
          : utilizationRate > 0
          ? '재고 회전 느림 - 재고 확인 필요'
          : '해당 월 이동 내역 없음',
      };
    });
    
    yield put(fetchWarehouseUtilization.success(transformedUtilization));
  } catch (error) {
    yield put(fetchWarehouseUtilization.failure(error.response?.data?.message || '창고 가용률을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryAlertsSaga(action) {
  try {
    // 백엔드 API 사용
    const params = action.payload || {};
    
    // 재고 부족 알림
    const lowStockResponse = yield call(notificationsAPI.getLowStock, params);
    const lowStockItems = lowStockResponse.data?.data || lowStockResponse.data || [];
    
    // 유통기한 임박 알림
    const expiringResponse = yield call(notificationsAPI.getExpiring, params);
    const expiringItems = expiringResponse.data?.data || expiringResponse.data || [];
    
    // 만료된 재고
    const expiredResponse = yield call(notificationsAPI.getExpired, params);
    const expiredItems = expiredResponse.data?.data || expiredResponse.data || [];
    
    // 알림 요약 계산
    const calculatedAlerts = {
      totalItems: [...new Set([...lowStockItems, ...expiringItems, ...expiredItems].map(item => item.itemId || item.item_id))].length,
      lowStock: Array.isArray(lowStockItems) ? lowStockItems.length : 0,
      expiringSoon: Array.isArray(expiringItems) ? expiringItems.length : 0,
      expired: Array.isArray(expiredItems) ? expiredItems.length : 0,
      warehouseCount: [...new Set([...lowStockItems, ...expiringItems, ...expiredItems].map(item => item.factory?.id || item.factory_id))].length,
    };

    yield put(fetchInventoryAlerts.success(calculatedAlerts));
  } catch (error) {
    yield put(fetchInventoryAlerts.failure(error.response?.data?.message || '재고 알림을 불러오는데 실패했습니다.'));
  }
}

function* updateTemperatureSaga(action) {
  try {
    // 백엔드 API 호출 - POST /api/temperatures
    // { factoryId, location?, celsius, recordedAt?, deviceId?, note? }
    const response = yield call(temperatureAPI.createTemperature, action.payload);
    yield put(updateTemperature.success(response.data?.data || response.data));

    // 온도 이력 다시 조회하여 최신 데이터 반영
    yield put(fetchTemperatureHistory.request());
  } catch (error) {
    yield put(updateTemperature.failure(error.response?.data?.message || '온도 기록 업데이트에 실패했습니다.'));
  }
}

function* fetchTemperatureHistorySaga(action) {
  try {
    // 백엔드 API 호출 - GET /api/temperatures
    const params = action.payload || {};
    const response = yield call(temperatureAPI.getTemperatures, params);
    
    // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
    const temperatureHistory = response.data?.data || response.data || [];
    const historyArray = Array.isArray(temperatureHistory) ? temperatureHistory : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedHistory = historyArray.map((record) => ({
      id: record.id,
      date: record.recordedAt || record.recorded_at || record.createdAt || record.created_at,
      time: record.time || '',
      storageType: record.location || record.storageType || '',
      location: record.location || '',
      temperature: record.celsius || record.temperature,
      humidity: record.humidity,
      inspector: record.note?.includes('검수자:') ? record.note.replace('검수자: ', '') : '',
    }));
    
    yield put(fetchTemperatureHistory.success(transformedHistory));
  } catch (error) {
    yield put(fetchTemperatureHistory.failure(error.response?.data?.message || '온도 이력을 불러오는데 실패했습니다.'));
  }
}

function* deleteTemperatureSaga(action) {
  try {
    // 백엔드 API 호출 - DELETE /api/temperatures/:id
    const response = yield call(temperatureAPI.deleteTemperature, action.payload.id);
    yield put(deleteTemperature.success(response.data?.data || { id: action.payload.id }));
    
    // 온도 이력 다시 조회하여 최신 데이터 반영
    yield put(fetchTemperatureHistory.request());
  } catch (error) {
    yield put(deleteTemperature.failure(error.response?.data?.message || '온도 기록 삭제에 실패했습니다.'));
  }
}

export default function* inventorySaga() {
  yield takeLatest(FETCH_INVENTORY_STATUS.REQUEST, fetchInventoryStatusSaga);
  yield takeLatest(FETCH_INVENTORY_MOVEMENTS.REQUEST, fetchInventoryMovementsSaga);
  yield takeLatest(FETCH_WAREHOUSE_UTILIZATION.REQUEST, fetchWarehouseUtilizationSaga);
  yield takeLatest(FETCH_INVENTORY_ALERTS.REQUEST, fetchInventoryAlertsSaga);
  yield takeLatest(UPDATE_TEMPERATURE.REQUEST, updateTemperatureSaga);
  yield takeLatest(FETCH_TEMPERATURE_HISTORY.REQUEST, fetchTemperatureHistorySaga);
  yield takeLatest(DELETE_TEMPERATURE.REQUEST, deleteTemperatureSaga);
}
