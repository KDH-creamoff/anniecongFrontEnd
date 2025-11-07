import { put, takeLatest, delay } from 'redux-saga/effects';
// import { inventoryAPI } from '../../../api'; // TODO: 백엔드 준비 시 주석 해제
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

// ==================== 목데이터 ====================
const mockInventoryMovements = [
  {
    time: '2025-11-05 14:30',
    type: '입고',
    category: '사료A',
    lotNumber: 'LOT20251105001',
    quantity: '+500kg',
    fromLocation: '외부 공급사',
    toLocation: '1공장 창고A',
    manager: '김철수',
  },
  {
    time: '2025-11-05 13:15',
    type: '소모',
    category: '사료B',
    lotNumber: 'LOT20251104002',
    quantity: '-200kg',
    fromLocation: '1공장 창고A',
    toLocation: '생산라인1',
    manager: '이영희',
    note: '생산 사용',
  },
  {
    time: '2025-11-05 11:20',
    type: '생산',
    category: '완제품A',
    code: 'PROD-001',
    lotNumber: 'LOT20251105003',
    quantity: '+300kg',
    fromLocation: '생산라인1',
    toLocation: '1공장 창고B',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-05 10:00',
    type: '이동',
    category: '사료C',
    lotNumber: 'LOT20251103004',
    quantity: '+150kg',
    fromLocation: '1공장 창고A',
    toLocation: '2공장 창고',
    manager: '최동욱',
    note: '공장 간 이동',
  },
  {
    time: '2025-11-04 16:45',
    type: '입고',
    category: '원료D',
    code: 'RAW-001',
    lotNumber: 'LOT20251104005',
    quantity: '+800kg',
    fromLocation: '외부 공급사',
    toLocation: '1공장 창고A',
    manager: '김철수',
    note: '긴급 입고',
  },
  {
    time: '2025-11-04 14:30',
    type: '소모',
    category: '사료A',
    lotNumber: 'LOT20251102006',
    quantity: '-350kg',
    fromLocation: '1공장 창고A',
    toLocation: '생산라인2',
    manager: '이영희',
    note: '생산 사용',
  }
];

const mockInventoryAlerts = {
  totalItems: 127,
  lowStock: 8,
  expiringSoon: 12,
  expired: 2,
  warehouseCount: 4  // 의성자재창고, 상주자재창고, 상주생산창고, 의성생산창고
};

const mockWarehouseUtilization = [
  {
    factory: { code: '1공장', name: '1공장' },
    percentage: 78,
    itemCount: 45,
    note: '정상 운영 중'
  },
  {
    factory: { code: '2공장', name: '2공장' },
    percentage: 92,
    itemCount: 38,
    note: '창고 공간 부족 경고'
  },
  {
    factory: { code: '외부창고', name: '외부창고' },
    percentage: 65,
    itemCount: 44,
    note: '여유 공간 있음'
  }
];

const mockInventoryStatus = [
  {
    id: 1,
    item: '연필',
    category: '소모품',
    quantity: 1500,
    unit: 'kg',
    factory: '의성자재창고',
    lotNumber: 'ANC20251105001',
    expirationDate: '2025-12-31',
    daysLeft: 55,
    status: '정상'
  },
  {
    id: 2,
    item: '닭가슴살',
    category: '원재료',
    quantity: 850,
    unit: 'kg',
    factory: '상주자재창고',
    lotNumber: 'ANC20251104002',
    expirationDate: '2025-11-20',
    daysLeft: 14,
    status: '임박'
  },
  {
    id: 3,
    code: 'PROD-001',
    item: '콩부장쿠키',
    category: '완제품',
    quantity: 2200,
    unit: 'kg',
    factory: '상주생산창고',
    lotNumber: 'ANC0251105003',
    expirationDate: '2026-03-15',
    daysLeft: 494,
    status: '정상'
  },
  {
    id: 4,
    code: 'RAW-001',
    item: '밀가루',
    category: '원재료',
    quantity: 3000,
    unit: 'kg',
    factory: '의성생산창고',
    lotNumber: 'ANC20251101004',
    expirationDate: '2025-12-15',
    daysLeft: 39,
    status: '정상'
  },
  {
    id: 5,
    code: 'SEMI-001',
    item: '반죽',
    category: '반재료',
    quantity: 150,
    unit: 'kg',
    factory: '상주생산창고',
    lotNumber: 'ANC20251105005',
    expirationDate: '2025-11-10',
    daysLeft: 4,
    status: '재고부족'
  }
];

let mockTemperatureHistory = [
  {
    id: 1,
    date: '2025-11-05 00:20',
    time: '14:00',
    storageType: '냉장고',
    location: '1공장 창고A',
    temperature: 18.5,
    humidity: 55,
    inspector: '김철수'
  },
  {
    id: 2,
    date: '2025-11-05 06:35',
    time: '10:00',
    storageType: '냉동고',
    location: '1공장 창고A',
    temperature: 17.8,
    humidity: 58,
    inspector: '이영희'
  },
  {
    id: 3,
    date: '2025-11-04 12:05',
    time: '14:00',
    storageType: '상온',
    location: '1공장 창고A',
    temperature: 19.2,
    humidity: 52,
    inspector: '김철수'
  }
];

function* fetchInventoryStatusSaga(/* action */) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getInventoryStatus, action.payload);
    // yield put(fetchInventoryStatus.success(response.data));

    // 임시 목데이터 사용
    yield delay(500); 
    yield put(fetchInventoryStatus.success(mockInventoryStatus));
  } catch (error) {
    yield put(fetchInventoryStatus.failure(error.response?.data?.message || '재고 현황을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryMovementsSaga(/* action */) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getInventoryMovements, action.payload);
    // yield put(fetchInventoryMovements.success(response.data));

    // 임시 목데이터 사용
    yield delay(500); 
    yield put(fetchInventoryMovements.success(mockInventoryMovements));
  } catch (error) {
    yield put(fetchInventoryMovements.failure(error.response?.data?.message || '재고 이동 내역을 불러오는데 실패했습니다.'));
  }
}

function* fetchWarehouseUtilizationSaga() {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getWarehouseUtilization);
    // yield put(fetchWarehouseUtilization.success(response.data));

    // 임시 목데이터 사용
    yield delay(500); 
    yield put(fetchWarehouseUtilization.success(mockWarehouseUtilization));
  } catch (error) {
    yield put(fetchWarehouseUtilization.failure(error.response?.data?.message || '창고 가용률을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryAlertsSaga() {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getAlerts);
    // yield put(fetchInventoryAlerts.success(response.data));

    // 임시 목데이터 사용
    yield delay(500); 
    yield put(fetchInventoryAlerts.success(mockInventoryAlerts));
  } catch (error) {
    yield put(fetchInventoryAlerts.failure(error.response?.data?.message || '재고 알림을 불러오는데 실패했습니다.'));
  }
}

function* updateTemperatureSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.updateTemperature, action.payload);
    // yield put(updateTemperature.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);

    const newRecord = {
      id: mockTemperatureHistory.length + 1,
      ...action.payload,
    };
    mockTemperatureHistory = [newRecord, ...mockTemperatureHistory];

    yield put(updateTemperature.success({ message: '온도가 기록되었습니다.' }));
    yield put(fetchTemperatureHistory.success(mockTemperatureHistory));
  } catch (error) {
    yield put(updateTemperature.failure(error.response?.data?.message || '온도 기록 업데이트에 실패했습니다.'));
  }
}

function* fetchTemperatureHistorySaga(/* action */) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getTemperatureHistory, action.payload);
    // yield put(fetchTemperatureHistory.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchTemperatureHistory.success(mockTemperatureHistory));
  } catch (error) {
    yield put(fetchTemperatureHistory.failure(error.response?.data?.message || '온도 이력을 불러오는데 실패했습니다.'));
  }
}

function* deleteTemperatureSaga(action) {
  try {
    yield delay(500);
    mockTemperatureHistory = mockTemperatureHistory.filter(
      (record) => record.id !== action.payload.id
    );
    yield put(deleteTemperature.success({ id: action.payload.id }));
    yield put(fetchTemperatureHistory.success(mockTemperatureHistory));
  } catch (error) {
    yield put(deleteTemperature.failure('온도 기록 삭제 실패'));
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
