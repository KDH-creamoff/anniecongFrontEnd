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
    type: '출고',
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
    type: '출고',
    category: '사료A',
    lotNumber: 'LOT20251102006',
    quantity: '-350kg',
    fromLocation: '1공장 창고A',
    toLocation: '생산라인2',
    manager: '이영희',
    note: '생산 사용',
  }
];

// 창고별 이용률 계산을 위한 함수
const calculateWarehouseUtilization = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // 해당 월의 입고 및 제조된 품목 (분모)
  // 입고: mockInventoryMovements에서 type === '입고' 또는 '생산'
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

// 재고 목데이터에 동적으로 상태를 계산하는 함수
const getMockInventoryStatusWithCalculatedDays = () => {
  const baseData = [
    {
      id: 1,
      code: 'PROD-901',
      item: '연필',
      category: '소모품',
      quantity: 1500,
      unit: 'kg',
      factory: '의성자재창고',
      lotNumber: 'ANC20251105001',
      expirationDate: '2025-12-31'
    },
    {
      id: 2,
      code: 'RAW-021',
      item: '닭가슴살',
      category: '원재료',
      quantity: 850,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251104002',
      expirationDate: '2025-11-20'
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
      expirationDate: '2026-03-15'
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
      expirationDate: '2025-12-15'
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
      expirationDate: '2025-11-10'
    }
  ];

  // 각 항목에 대해 오늘 날짜 기준으로 daysLeft와 status 계산
  return baseData.map(item => {
    const daysLeft = calculateExpirationStatus(item.expirationDate);

    let status = '정상';
    if (daysLeft < 0) {
      status = '만료';
    } else if (daysLeft <= 7) {
      status = '임박';
    } else if (item.quantity < 200) {
      status = '재고부족';
    }

    return {
      ...item,
      daysLeft,
      status
    };
  });
};

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

    // 임시 목데이터 사용 - 오늘 날짜 기준으로 동적 계산
    yield delay(500);
    const inventoryStatus = getMockInventoryStatusWithCalculatedDays();
    yield put(fetchInventoryStatus.success(inventoryStatus));
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

    // 임시 목데이터 사용 - 동적 계산
    yield delay(500);
    const utilization = calculateWarehouseUtilization();
    yield put(fetchWarehouseUtilization.success(utilization));
  } catch (error) {
    yield put(fetchWarehouseUtilization.failure(error.response?.data?.message || '창고 가용률을 불러오는데 실패했습니다.'));
  }
}

function* fetchInventoryAlertsSaga() {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(inventoryAPI.getAlerts);
    // yield put(fetchInventoryAlerts.success(response.data));

    // 임시 목데이터 사용 - 재고 현황 데이터 기반으로 동적 계산
    yield delay(500);

    // 오늘 날짜 기준으로 계산된 재고 데이터 가져오기
    const inventoryStatus = getMockInventoryStatusWithCalculatedDays();

    const lowStockCount = inventoryStatus.filter(item => item.status === '재고부족').length;
    const expiringSoonCount = inventoryStatus.filter(item => item.status === '임박' || item.status === '만료').length;
    const uniqueItems = [...new Set(inventoryStatus.map(item => item.item))];
    const uniqueWarehouses = [...new Set(inventoryStatus.map(item => item.factory))];

    const calculatedAlerts = {
      totalItems: uniqueItems.length,
      lowStock: lowStockCount,
      expiringSoon: expiringSoonCount,
      warehouseCount: uniqueWarehouses.length
    };

    yield put(fetchInventoryAlerts.success(calculatedAlerts));
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
