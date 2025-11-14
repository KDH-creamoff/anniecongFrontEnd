import { /* call, */ put, takeLatest, delay } from 'redux-saga/effects';
import { inventoryAPI } from '../../../api'; 
// API: POST /inventories/issue, GET /inventory-transactions?type=ISSUE
import {
  FETCH_ISSUING_LIST,
  CREATE_ISSUING,
  UPDATE_ISSUING,
  DELETE_ISSUING,
  BATCH_ISSUE,
  FETCH_ISSUING_STATS,
  fetchIssuingList,
  createIssuing,
  updateIssuing,
  deleteIssuing,
  batchIssue,
  fetchIssuingStats,
} from './actions';

// ==================== 목데이터 ====================
// 출고 대기 목록 (출고 예정)
let mockPendingIssuings = [
  {
    id: 1,
    itemCode: 'PROD-001',
    itemName: '콩부장 쿠키',
    orderQuantity: 500,
    issuedQuantity: 0,
    availableQuantity: 600,
    scheduledDate: '2025-11-15',
    unit: 'kg',
    unitCount: 50,
    factory: '상주생산창고',
    factoryId: 'fac_P2',
    toCustomer: '강아지 쿠키 주식회사',
    status: '대기',
    note: '긴급 출고 요청',
  },
  {
    id: 2,
    itemCode: 'PROD-002',
    itemName: '참치 츄르',
    orderQuantity: 300,
    issuedQuantity: 0,
    availableQuantity: 350,
    scheduledDate: '2025-11-14',
    unit: 'kg',
    unitCount: 30,
    factory: '상주생산창고',
    factoryId: 'fac_P2',
    toCustomer: '고양이 간식 유통',
    status: '대기',
    note: '',
  },
  {
    id: 3,
    itemCode: 'RAW-001',
    itemName: '밀가루',
    orderQuantity: 200,
    issuedQuantity: 0,
    availableQuantity: 3000,
    scheduledDate: '2025-11-13',
    unit: 'kg',
    unitCount: 20,
    factory: '의성생산창고',
    factoryId: 'fac_P1',
    toCustomer: '생산라인1',
    status: '대기',
    note: '생산 투입 예정',
  },
];

// 출고 완료 목록
let mockCompletedIssuings = [
  {
    id: 101,
    itemCode: 'PROD-003',
    itemName: '강아지 사료 A',
    orderQuantity: 1000,
    issuedQuantity: 1000,
    availableQuantity: 1200,
    scheduledDate: '2025-11-12',
    completedDate: '2025-11-12',
    unit: 'kg',
    unitCount: 100,
    factory: '상주생산창고',
    factoryId: 'fac_P2',
    toCustomer: '펫푸드 마켓',
    transactionNumber: 'ISSUE-20251112-001',
    manager: '김철수',
    status: '완료',
    note: '정상 출고 완료',
  },
  {
    id: 102,
    itemCode: 'PROD-004',
    itemName: '닭가슴살 져키',
    orderQuantity: 200,
    issuedQuantity: 200,
    availableQuantity: 850,
    scheduledDate: '2025-11-11',
    completedDate: '2025-11-11',
    unit: 'kg',
    unitCount: 20,
    factory: '상주자재창고',
    factoryId: 'fac_P2',
    toCustomer: '애견용품 도매',
    transactionNumber: 'ISSUE-20251111-001',
    manager: '이영희',
    status: '완료',
    note: '',
  },
  {
    id: 103,
    itemCode: 'SEMI-001',
    itemName: '반죽',
    orderQuantity: 150,
    issuedQuantity: 150,
    availableQuantity: 150,
    scheduledDate: '2025-11-10',
    completedDate: '2025-11-10',
    unit: 'kg',
    unitCount: 15,
    factory: '상주생산창고',
    factoryId: 'fac_P2',
    toCustomer: '생산라인2',
    transactionNumber: 'ISSUE-20251110-001',
    manager: '박민수',
    status: '완료',
    note: '생산 투입 완료',
  },
  {
    id: 104,
    itemCode: 'PROD-005',
    itemName: '고양이 간식 세트',
    orderQuantity: 150,
    issuedQuantity: 150,
    availableQuantity: 150,
    scheduledDate: '2025-11-09',
    completedDate: '2025-11-09',
    unit: 'kg',
    unitCount: 15,
    factory: '상주생산창고',
    factoryId: 'fac_P2',
    toCustomer: '펫샵 체인본부',
    transactionNumber: 'ISSUE-20251109-001',
    manager: '최동욱',
    status: '완료',
    note: '신규 거래처',
  },
];

const mockIssuingStats = {
  totalPending: 3,
  totalCompleted: 4,
  pendingQuantity: 1000,
  completedQuantity: 1500,
  byFactory: {
    '상주생산창고': 1200,
    '의성생산창고': 200,
    '상주자재창고': 200,
  },
};

// ==================== 출고 목록 조회 ====================
function* fetchIssuingListSaga(action) {
  try {
    // const response = yield call(inventoryAPI.getMovements, {
    //   ...action.payload,
    //   type: 'ISSUE'
    // });
    // yield put(fetchIssuingList.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const { status } = action.payload || {};

    if (status === '대기') {
      yield put(fetchIssuingList.success(mockPendingIssuings));
    } else if (status === '완료') {
      yield put(fetchIssuingList.success(mockCompletedIssuings));
    } else {
      // 전체 목록
      yield put(fetchIssuingList.success([...mockPendingIssuings, ...mockCompletedIssuings]));
    }
  } catch (error) {
    yield put(fetchIssuingList.failure(error.response?.data?.message || '출고 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 출고 생성 (대기 목록에 추가) ====================
function* createIssuingSaga(action) {
  try {
    // const response = yield call(inventoryAPI.issueInventory, action.payload);
    // yield put(createIssuing.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const newIssuing = {
      id: mockPendingIssuings.length + 1,
      issuedQuantity: 0,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: '대기',
      ...action.payload,
    };
    mockPendingIssuings = [newIssuing, ...mockPendingIssuings];
    yield put(createIssuing.success(newIssuing));
  } catch (error) {
    yield put(createIssuing.failure(error.response?.data?.message || '출고 생성에 실패했습니다.'));
  }
}

// ==================== 출고 수정 ====================
function* updateIssuingSaga(action) {
  try {
    // const response = yield call(inventoryAPI.updateInventory, action.payload.id, action.payload.data);
    // yield put(updateIssuing.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);

    // 대기 목록에서 찾기
    let foundInPending = false;
    mockPendingIssuings = mockPendingIssuings.map(item => {
      if (item.id === action.payload.id) {
        foundInPending = true;
        return { ...item, ...action.payload.data };
      }
      return item;
    });

    // 완료 목록에서 찾기
    if (!foundInPending) {
      mockCompletedIssuings = mockCompletedIssuings.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload.data } : item
      );
    }

    yield put(updateIssuing.success({ ...action.payload.data, id: action.payload.id }));
  } catch (error) {
    yield put(updateIssuing.failure(error.response?.data?.message || '출고 수정에 실패했습니다.'));
  }
}

// ==================== 출고 삭제 ====================
function* deleteIssuingSaga(action) {
  try {
    // yield call(inventoryAPI.deleteInventory, action.payload);
    // yield put(deleteIssuing.success(action.payload));

    // 임시 목데이터 사용
    yield delay(500);
    mockPendingIssuings = mockPendingIssuings.filter(item => item.id !== action.payload);
    mockCompletedIssuings = mockCompletedIssuings.filter(item => item.id !== action.payload);
    yield put(deleteIssuing.success(action.payload));
  } catch (error) {
    yield put(deleteIssuing.failure(error.response?.data?.message || '출고 삭제에 실패했습니다.'));
  }
}

// ==================== 일괄 출고 (대기 → 완료 전환) ====================
function* batchIssueSaga(action) {
  try {
    // const response = yield call(inventoryAPI.batchIssue, action.payload);
    // yield put(batchIssue.success(response.data));

    // 임시 목데이터 사용
    yield delay(1000); // 일괄 처리는 시간이 더 걸림
    const { ids } = action.payload; // 출고 처리할 ID 배열

    // 대기 목록에서 제거하고 완료 목록으로 이동
    const processedItems = [];
    mockPendingIssuings = mockPendingIssuings.filter(item => {
      if (ids.includes(item.id)) {
        const completedItem = {
          ...item,
          id: mockCompletedIssuings.length + processedItems.length + 101,
          issuedQuantity: item.orderQuantity,
          completedDate: new Date().toISOString().split('T')[0],
          transactionNumber: `ISSUE-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(processedItems.length + 1).padStart(3, '0')}`,
          status: '완료',
          manager: '시스템',
        };
        processedItems.push(completedItem);
        return false;
      }
      return true;
    });

    mockCompletedIssuings = [...processedItems, ...mockCompletedIssuings];
    yield put(batchIssue.success({ count: processedItems.length, items: processedItems }));
  } catch (error) {
    yield put(batchIssue.failure(error.response?.data?.message || '일괄 출고에 실패했습니다.'));
  }
}

// ==================== 출고 통계 ====================
function* fetchIssuingStatsSaga(action) {
  try {
    // const response = yield call(inventoryAPI.getTransactionStats, {
    //   ...action.payload,
    //   type: 'ISSUE'
    // });
    // yield put(fetchIssuingStats.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchIssuingStats.success(mockIssuingStats));
  } catch (error) {
    yield put(fetchIssuingStats.failure(error.response?.data?.message || '출고 통계를 불러오지 못했습니다.'));
  }
}

// ==================== Root Saga ====================
export default function* issuingSaga() {
  yield takeLatest(FETCH_ISSUING_LIST.REQUEST, fetchIssuingListSaga);
  yield takeLatest(CREATE_ISSUING.REQUEST, createIssuingSaga);
  yield takeLatest(UPDATE_ISSUING.REQUEST, updateIssuingSaga);
  yield takeLatest(DELETE_ISSUING.REQUEST, deleteIssuingSaga);
  yield takeLatest(BATCH_ISSUE.REQUEST, batchIssueSaga);
  yield takeLatest(FETCH_ISSUING_STATS.REQUEST, fetchIssuingStatsSaga);
}
