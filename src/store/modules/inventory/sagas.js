import { call, put, takeLatest } from 'redux-saga/effects';
import { inventoryAPI, notificationsAPI } from '../../../api';
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
    time: '2025-11-13 14:30',
    type: '입고',
    category: '밀가루',
    lotNumber: 'ANC20251113001',
    quantity: '+500kg',
    fromLocation: '외부 공급사',
    toLocation: '의성생산창고',
    manager: '김철수',
  },
  {
    time: '2025-11-13 13:15',
    type: '출고',
    category: '콩부장쿠키',
    lotNumber: 'ANC20251105003',
    quantity: '-200kg',
    fromLocation: '상주생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-13 11:20',
    type: '생산',
    category: '치즈케이크',
    lotNumber: 'ANC20251113002',
    quantity: '+300kg',
    fromLocation: '생산라인1',
    toLocation: '상주생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-13 10:00',
    type: '이동',
    category: '설탕',
    lotNumber: 'ANC20251103006',
    quantity: '+150kg',
    fromLocation: '의성자재창고',
    toLocation: '상주생산창고',
    manager: '최동욱',
    note: '공장 간 이동',
  },
  {
    time: '2025-11-12 16:45',
    type: '입고',
    category: '버터',
    lotNumber: 'ANC20251112003',
    quantity: '+800kg',
    fromLocation: '외부 공급사',
    toLocation: '의성생산창고',
    manager: '김철수',
    note: '정기 입고',
  },
  {
    time: '2025-11-12 14:30',
    type: '출고',
    category: '초코칩쿠키',
    lotNumber: 'ANC20251105011',
    quantity: '-350kg',
    fromLocation: '의성생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-12 11:50',
    type: '생산',
    category: '바닐라케이크',
    lotNumber: 'ANC20251112004',
    quantity: '+250kg',
    fromLocation: '생산라인2',
    toLocation: '상주생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-12 09:30',
    type: '입고',
    category: '계란',
    lotNumber: 'ANC20251112005',
    quantity: '+600kg',
    fromLocation: '외부 공급사',
    toLocation: '의성생산창고',
    manager: '김철수',
  },
  {
    time: '2025-11-11 15:20',
    type: '이동',
    category: '초콜릿칩',
    lotNumber: 'ANC20251101012',
    quantity: '+200kg',
    fromLocation: '상주자재창고',
    toLocation: '의성생산창고',
    manager: '최동욱',
  },
  {
    time: '2025-11-11 13:40',
    type: '출고',
    category: '녹차쿠키',
    lotNumber: 'ANC20251106018',
    quantity: '-180kg',
    fromLocation: '의성생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-11 11:10',
    type: '생산',
    category: '딸기케이크',
    lotNumber: 'ANC20251111006',
    quantity: '+280kg',
    fromLocation: '생산라인1',
    toLocation: '상주생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-11 09:00',
    type: '입고',
    category: '생크림',
    lotNumber: 'ANC20251111007',
    quantity: '+400kg',
    fromLocation: '외부 공급사',
    toLocation: '상주자재창고',
    manager: '김철수',
  },
  {
    time: '2025-11-10 16:30',
    type: '이동',
    category: '소금',
    lotNumber: 'ANC20251102007',
    quantity: '+120kg',
    fromLocation: '상주자재창고',
    toLocation: '의성생산창고',
    manager: '최동욱',
  },
  {
    time: '2025-11-10 14:50',
    type: '출고',
    category: '마카롱',
    lotNumber: 'ANC20251107025',
    quantity: '-220kg',
    fromLocation: '의성생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-10 12:20',
    type: '생산',
    category: '콩부장쿠키',
    lotNumber: 'ANC20251110008',
    quantity: '+320kg',
    fromLocation: '생산라인3',
    toLocation: '상주생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-10 10:15',
    type: '입고',
    category: '우유',
    lotNumber: 'ANC20251110009',
    quantity: '+550kg',
    fromLocation: '외부 공급사',
    toLocation: '상주자재창고',
    manager: '김철수',
  },
  {
    time: '2025-11-09 15:40',
    type: '이동',
    category: '녹차가루',
    lotNumber: 'ANC20251103019',
    quantity: '+100kg',
    fromLocation: '상주자재창고',
    toLocation: '의성생산창고',
    manager: '최동욱',
  },
  {
    time: '2025-11-09 13:25',
    type: '출고',
    category: '치즈케이크',
    lotNumber: 'ANC20251106008',
    quantity: '-190kg',
    fromLocation: '상주생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-09 11:00',
    type: '생산',
    category: '초코칩쿠키',
    lotNumber: 'ANC20251109010',
    quantity: '+400kg',
    fromLocation: '생산라인1',
    toLocation: '의성생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-09 09:30',
    type: '입고',
    category: '딸기잼',
    lotNumber: 'ANC20251109011',
    quantity: '+300kg',
    fromLocation: '외부 공급사',
    toLocation: '의성생산창고',
    manager: '김철수',
  },
  {
    time: '2025-11-08 16:10',
    type: '이동',
    category: '밀가루',
    lotNumber: 'ANC20251101004',
    quantity: '+250kg',
    fromLocation: '의성생산창고',
    toLocation: '상주생산창고',
    manager: '최동욱',
    note: '공장 간 이동',
  },
  {
    time: '2025-11-08 14:20',
    type: '출고',
    category: '바닐라케이크',
    lotNumber: 'ANC20251108015',
    quantity: '-240kg',
    fromLocation: '상주생산창고',
    toLocation: '배송센터',
    manager: '이영희',
    note: '출하',
  },
  {
    time: '2025-11-08 11:45',
    type: '생산',
    category: '녹차쿠키',
    lotNumber: 'ANC20251108012',
    quantity: '+360kg',
    fromLocation: '생산라인2',
    toLocation: '의성생산창고',
    manager: '박민수',
    note: '정상 생산',
  },
  {
    time: '2025-11-08 09:15',
    type: '입고',
    category: '연필',
    lotNumber: 'ANC20251108013',
    quantity: '+50kg',
    fromLocation: '외부 공급사',
    toLocation: '의성자재창고',
    manager: '김철수',
    note: '소모품 입고',
  },
  {
    time: '2025-11-07 15:30',
    type: '이동',
    category: '휘핑크림',
    lotNumber: 'ANC20251108024',
    quantity: '+80kg',
    fromLocation: '상주생산창고',
    toLocation: '의성생산창고',
    manager: '최동욱',
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
    },
    {
      id: 6,
      code: 'RAW-002',
      item: '설탕',
      category: '원재료',
      quantity: 2500,
      unit: 'kg',
      factory: '의성자재창고',
      lotNumber: 'ANC20251103006',
      expirationDate: '2026-01-30'
    },
    {
      id: 7,
      code: 'RAW-003',
      item: '소금',
      category: '원재료',
      quantity: 1800,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251102007',
      expirationDate: '2026-02-28'
    },
    {
      id: 8,
      code: 'PROD-002',
      item: '치즈케이크',
      category: '완제품',
      quantity: 1200,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251106008',
      expirationDate: '2025-12-20'
    },
    {
      id: 9,
      code: 'RAW-004',
      item: '버터',
      category: '원재료',
      quantity: 950,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251104009',
      expirationDate: '2025-11-25'
    },
    {
      id: 10,
      code: 'SEMI-002',
      item: '크림',
      category: '반재료',
      quantity: 180,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251107010',
      expirationDate: '2025-11-15'
    },
    {
      id: 11,
      code: 'PROD-003',
      item: '초코칩쿠키',
      category: '완제품',
      quantity: 3200,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251105011',
      expirationDate: '2026-04-10'
    },
    {
      id: 12,
      code: 'RAW-005',
      item: '초콜릿칩',
      category: '원재료',
      quantity: 1400,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251101012',
      expirationDate: '2026-05-15'
    },
    {
      id: 13,
      code: 'PROD-902',
      item: '지우개',
      category: '소모품',
      quantity: 120,
      unit: 'kg',
      factory: '의성자재창고',
      lotNumber: 'ANC20251106013',
      expirationDate: '2026-12-31'
    },
    {
      id: 14,
      code: 'RAW-006',
      item: '생크림',
      category: '원재료',
      quantity: 600,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251105014',
      expirationDate: '2025-11-18'
    },
    {
      id: 15,
      code: 'PROD-004',
      item: '바닐라케이크',
      category: '완제품',
      quantity: 1850,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251108015',
      expirationDate: '2025-12-25'
    },
    {
      id: 16,
      code: 'RAW-007',
      item: '계란',
      category: '원재료',
      quantity: 2100,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251104016',
      expirationDate: '2025-11-22'
    },
    {
      id: 17,
      code: 'SEMI-003',
      item: '시럽',
      category: '반재료',
      quantity: 450,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251107017',
      expirationDate: '2026-03-01'
    },
    {
      id: 18,
      code: 'PROD-005',
      item: '녹차쿠키',
      category: '완제품',
      quantity: 2800,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251106018',
      expirationDate: '2026-02-20'
    },
    {
      id: 19,
      code: 'RAW-008',
      item: '녹차가루',
      category: '원재료',
      quantity: 890,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251103019',
      expirationDate: '2026-06-30'
    },
    {
      id: 20,
      code: 'PROD-903',
      item: '볼펜',
      category: '소모품',
      quantity: 95,
      unit: 'kg',
      factory: '의성자재창고',
      lotNumber: 'ANC20251107020',
      expirationDate: '2027-01-15'
    },
    {
      id: 21,
      code: 'RAW-009',
      item: '우유',
      category: '원재료',
      quantity: 1650,
      unit: 'kg',
      factory: '상주자재창고',
      lotNumber: 'ANC20251106021',
      expirationDate: '2025-11-16'
    },
    {
      id: 22,
      code: 'PROD-006',
      item: '딸기케이크',
      category: '완제품',
      quantity: 1550,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251109022',
      expirationDate: '2025-11-28'
    },
    {
      id: 23,
      code: 'RAW-010',
      item: '딸기잼',
      category: '원재료',
      quantity: 720,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251105023',
      expirationDate: '2026-01-20'
    },
    {
      id: 24,
      code: 'SEMI-004',
      item: '휘핑크림',
      category: '반재료',
      quantity: 165,
      unit: 'kg',
      factory: '상주생산창고',
      lotNumber: 'ANC20251108024',
      expirationDate: '2025-11-12'
    },
    {
      id: 25,
      code: 'PROD-007',
      item: '마카롱',
      category: '완제품',
      quantity: 980,
      unit: 'kg',
      factory: '의성생산창고',
      lotNumber: 'ANC20251107025',
      expirationDate: '2025-12-10'
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
