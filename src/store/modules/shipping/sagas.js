import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { shippingAPI } from '../../../api';
import {
  FETCH_SHIPPING_LIST,
  CREATE_SHIPPING,
  UPDATE_SHIPPING,
  DELETE_SHIPPING,
  CONFIRM_SHIPPING,
  FETCH_B2B_SHIPPINGS,
  FETCH_BC2_SHIPPINGS,
  fetchShippingList,
  createShipping,
  updateShipping,
  deleteShipping,
  confirmShipping,
  fetchB2BShippings,
  fetchBC2Shippings,
} from './actions';

// B2B 배송 목록 (대량 거래처 배송)
const mockB2BShippings = [
  {
    id: 101,
    orderNumber: 'B2B-20251112-001',
    orderDate: '2025-11-12',
    issueType: 'B2B',
    product: '프리미엄 강아지 사료 대용량',
    productCode: 'PROD-B2B-001',
    receiver: '강아지 쿠키 주식회사',
    contact: '담당자: 이사장',
    phone: '02-1234-5678',
    postalCode: '05551',
    address: '서울특별시 송파구 올림픽로 400',
    deliveryMessage: '정기 계약 건 - 1층 하역장 배송',
    quantity: 200,
    unit: 'box',
    status: '배송대기',
    carrier: null,
    trackingNumber: null,
    contractNumber: 'CT-2025-001',
  },
  {
    id: 102,
    orderNumber: 'B2B-20251111-002',
    orderDate: '2025-11-11',
    issueType: 'B2B',
    product: '고양이 간식 세트',
    productCode: 'PROD-B2B-002',
    receiver: '온라인몰 유통센터',
    contact: '담당자: 김부장',
    phone: '031-1234-5678',
    postalCode: '17379',
    address: '경기도 이천시 부발읍 물류단지로 100',
    deliveryMessage: '물류센터 A동',
    quantity: 150,
    unit: 'box',
    status: '배송중',
    carrier: 'CJ대한통운',
    trackingNumber: 'B2B123456789',
    contractNumber: 'CT-2025-002',
    shippedDate: '2025-11-11',
  },
  {
    id: 103,
    orderNumber: 'B2B-20251110-003',
    orderDate: '2025-11-10',
    issueType: 'B2B',
    product: '애니콩 초코칩 쿠키 벌크',
    productCode: 'PROD-B2B-003',
    receiver: '대형마트 본사 물류센터',
    contact: '담당자: 박과장',
    phone: '02-9876-5432',
    postalCode: '13494',
    address: '경기도 성남시 분당구 황새울로 200',
    deliveryMessage: '납품 계약서 동봉 필수',
    quantity: 300,
    unit: 'box',
    status: '배송완료',
    carrier: '한진택배',
    trackingNumber: 'B2B987654321',
    contractNumber: 'CT-2025-003',
    shippedDate: '2025-11-10',
    deliveredDate: '2025-11-11',
  },
  {
    id: 104,
    orderNumber: 'B2B-20251109-004',
    orderDate: '2025-11-09',
    issueType: 'B2B',
    product: '프리미엄 수제 쿠키 믹스',
    productCode: 'PROD-B2B-004',
    receiver: '베이커리 체인점 본사',
    contact: '담당자: 최대리',
    phone: '042-123-4567',
    postalCode: '34126',
    address: '대전광역시 유성구 테크노2로 187',
    deliveryMessage: '베이커리 센터 뒷문으로 입고',
    quantity: 180,
    unit: 'box',
    status: '배송중',
    carrier: '로젠택배',
    trackingNumber: 'B2B555666777',
    contractNumber: 'CT-2025-004',
    shippedDate: '2025-11-09',
  },
  {
    id: 105,
    orderNumber: 'B2B-20251108-005',
    orderDate: '2025-11-08',
    issueType: 'B2B',
    product: '애니콩 건강 간식 패키지',
    productCode: 'PROD-B2B-005',
    receiver: '펫샵 프랜차이즈 본사',
    contact: '담당자: 정차장',
    phone: '051-234-5678',
    postalCode: '48058',
    address: '부산광역시 해운대구 센텀중앙로 78',
    deliveryMessage: '재고 관리팀 직접 인수',
    quantity: 250,
    unit: 'box',
    status: '배송대기',
    carrier: null,
    trackingNumber: null,
    contractNumber: 'CT-2025-005',
  },
];

// BC2 배송 목록 
const mockBC2Shippings = [
  {
    id: 201,
    orderNumber: 'BC2-20251112-001',
    orderDate: '2025-11-12',
    issueType: 'BC2',
    product: '반제품 - 쿠키 반죽',
    productCode: 'SEMI-001',
    fromFactory: '1공장 (의성)',
    toFactory: '2공장 (상주)',
    quantity: 800,
    unit: 'kg',
    status: '운송대기',
    driver: null,
    vehicleNumber: null,
    scheduledDate: '2025-11-13',
    deliveryMessage: '생산 계획에 따른 이동',
  },
  {
    id: 202,
    orderNumber: 'BC2-20251111-002',
    orderDate: '2025-11-11',
    issueType: 'BC2',
    product: '원재료 - 닭가슴살',
    productCode: 'RAW-021',
    fromFactory: '1공장 (의성)',
    toFactory: '2공장 (상주)',
    quantity: 500,
    unit: 'kg',
    status: '운송완료',
    driver: '김기사',
    vehicleNumber: '12가3456',
    scheduledDate: '2025-11-11',
    completedDate: '2025-11-11',
    deliveryMessage: '',
  },
  {
    id: 203,
    orderNumber: 'BC2-20251110-003',
    orderDate: '2025-11-10',
    issueType: 'BC2',
    product: '원재료 - 유기농 밀가루',
    productCode: 'RAW-005',
    fromFactory: '1공장 (의성)',
    toFactory: '2공장 (상주)',
    quantity: 1200,
    unit: 'kg',
    status: '운송중',
    driver: '이기사',
    vehicleNumber: '34나5678',
    scheduledDate: '2025-11-10',
    deliveryMessage: '긴급 생산 건',
  },
  {
    id: 204,
    orderNumber: 'BC2-20251109-004',
    orderDate: '2025-11-09',
    issueType: 'BC2',
    product: '반제품 - 초코칩 도우',
    productCode: 'SEMI-002',
    fromFactory: '2공장 (상주)',
    toFactory: '1공장 (의성)',
    quantity: 600,
    unit: 'kg',
    status: '운송완료',
    driver: '박기사',
    vehicleNumber: '56다7890',
    scheduledDate: '2025-11-09',
    completedDate: '2025-11-09',
    deliveryMessage: '역방향 이동',
  },
  {
    id: 205,
    orderNumber: 'BC2-20251108-005',
    orderDate: '2025-11-08',
    issueType: 'BC2',
    product: '원재료 - 고구마',
    productCode: 'RAW-012',
    fromFactory: '1공장 (의성)',
    toFactory: '2공장 (상주)',
    quantity: 950,
    unit: 'kg',
    status: '운송대기',
    driver: null,
    vehicleNumber: null,
    scheduledDate: '2025-11-13',
    deliveryMessage: '냉장 보관 필수',
  },
];

// 배송 주문 목록 조회
function* fetchShippingListSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.getOrders, action.payload);
    // yield put(fetchShippingList.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchShippingList.success(mockShippingList));
  } catch (error) {
    yield put(fetchShippingList.failure(error.response?.data?.message || '배송 목록을 불러오지 못했습니다.'));
  }
}

// 배송 주문 생성
function* createShippingSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.createOrder, action.payload);
    // yield put(createShipping.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const newShipping = {
      id: mockShippingList.length + 1,
      orderDate: new Date().toISOString().split('T')[0],
      orderNumber: `SHP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(mockShippingList.length + 1).padStart(3, '0')}`,
      status: '배송대기',
      carrier: null,
      trackingNumber: null,
      shippedDate: null,
      ...action.payload,
    };
    mockShippingList = [newShipping, ...mockShippingList];
    yield put(createShipping.success(newShipping));
  } catch (error) {
    yield put(createShipping.failure(error.response?.data?.message || '배송 주문 생성에 실패했습니다.'));
  }
}

// 배송 정보 수정
function* updateShippingSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.updateOrder, action.payload.id, action.payload.data);
    // yield put(updateShipping.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const updatedShipping = {
      ...mockShippingList.find(item => item.id === action.payload.id),
      ...action.payload.data,
    };
    mockShippingList = mockShippingList.map(item =>
      item.id === action.payload.id ? updatedShipping : item
    );
    yield put(updateShipping.success(updatedShipping));
  } catch (error) {
    yield put(updateShipping.failure(error.response?.data?.message || '배송 정보 수정에 실패했습니다.'));
  }
}

// 배송 주문 삭제
function* deleteShippingSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // yield call(shippingAPI.deleteOrder, action.payload);
    // yield put(deleteShipping.success(action.payload));

    // 임시 목데이터 사용
    yield delay(500);
    mockShippingList = mockShippingList.filter(item => item.id !== action.payload);
    yield put(deleteShipping.success(action.payload));
  } catch (error) {
    yield put(deleteShipping.failure(error.response?.data?.message || '배송 주문 삭제에 실패했습니다.'));
  }
}

// 배송 확정 (배송 시작)
function* confirmShippingSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.confirmShipping, action.payload);
    // yield put(confirmShipping.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const confirmedShipping = {
      ...mockShippingList.find(item => item.id === action.payload.id),
      status: '배송중',
      carrier: action.payload.carrier || 'CJ대한통운',
      trackingNumber: action.payload.trackingNumber || Math.random().toString().substring(2, 14),
      shippedDate: new Date().toISOString().split('T')[0],
    };
    mockShippingList = mockShippingList.map(item =>
      item.id === action.payload.id ? confirmedShipping : item
    );
    yield put(confirmShipping.success(confirmedShipping));
  } catch (error) {
    yield put(confirmShipping.failure(error.response?.data?.message || '배송 확정에 실패했습니다.'));
  }
}

// B2B 배송 목록 조회
function* fetchB2BShippingsSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.getOrders, { ...action.payload, issueType: 'B2B' });
    // yield put(fetchB2BShippings.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchB2BShippings.success(mockB2BShippings));
  } catch (error) {
    yield put(fetchB2BShippings.failure(error.response?.data?.message || 'B2B 배송 목록을 불러오지 못했습니다.'));
  }
}

// BC2 공장간 운송 목록 조회
function* fetchBC2ShippingsSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(shippingAPI.getOrders, { ...action.payload, issueType: 'BC2' });
    // yield put(fetchBC2Shippings.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchBC2Shippings.success(mockBC2Shippings));
  } catch (error) {
    yield put(fetchBC2Shippings.failure(error.response?.data?.message || '공장간 운송 목록을 불러오지 못했습니다.'));
  }
}

// Root Saga
export default function* shippingSaga() {
  yield takeLatest(FETCH_SHIPPING_LIST.REQUEST, fetchShippingListSaga);
  yield takeLatest(CREATE_SHIPPING.REQUEST, createShippingSaga);
  yield takeLatest(UPDATE_SHIPPING.REQUEST, updateShippingSaga);
  yield takeLatest(DELETE_SHIPPING.REQUEST, deleteShippingSaga);
  yield takeLatest(CONFIRM_SHIPPING.REQUEST, confirmShippingSaga);
  yield takeLatest(FETCH_B2B_SHIPPINGS.REQUEST, fetchB2BShippingsSaga);
  yield takeLatest(FETCH_BC2_SHIPPINGS.REQUEST, fetchBC2ShippingsSaga);
}
