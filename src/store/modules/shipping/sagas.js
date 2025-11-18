import { call, put, takeLatest } from 'redux-saga/effects';
import { plannedTransactionsAPI } from '../../../api';
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

// 목데이터 제거됨 - 모든 데이터는 백엔드 API에서 가져옴

// 배송 주문 목록 조회 (출고 목록)
function* fetchShippingListSaga(action) {
  try {
    // plannedTransactionsAPI.getPlannedTransactions 사용 (transactionType: 'ISSUE')
    const params = {
      transactionType: 'ISSUE',
      ...action.payload,
    };
    const response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
    
    // 백엔드 응답 형식: { ok: true, data: { items: [...], meta: {...} } }
    const plannedData = response.data?.data || response.data || {};
    const items = plannedData.items || plannedData.data || [];
    const itemsArray = Array.isArray(items) ? items : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedItems = itemsArray.map((item) => {
      const plannedItem = item.item || item.Item || {};
      const factory = item.factory || item.Factory || {};
      
      return {
        id: item.id,
        orderNumber: `SHP-${item.id}`,
        orderDate: item.scheduledDate || item.scheduled_date || '',
        product: plannedItem.name || item.item_name || '',
        productCode: plannedItem.code || item.item_code || '',
        receiver: item.customerName || item.customer_name || '',
        phone: item.recipientPhone || item.recipient_phone || '',
        postalCode: '',
        address: item.shippingAddress || item.shipping_address || '',
        deliveryMessage: item.notes || item.note || '',
        quantity: item.quantity || 0,
        unit: item.unit || '',
        status: item.status === 'COMPLETED' ? '배송완료' : item.status === 'APPROVED' ? '배송중' : '배송대기',
        carrier: item.shippingCompany || item.shipping_company || null,
        trackingNumber: item.trackingNumber || item.tracking_number || null,
        shippedDate: item.completedAt || item.completed_at || null,
        deliveredDate: null,
      };
    });
    
    yield put(fetchShippingList.success(transformedItems));
  } catch (error) {
    yield put(fetchShippingList.failure(error.response?.data?.message || '배송 목록을 불러오지 못했습니다.'));
  }
}

// 배송 주문 생성 (출고 예정 생성)
function* createShippingSaga(action) {
  try {
    // plannedTransactionsAPI.createPlannedTransaction 사용
    const payload = action.payload;
    const transactionData = {
      transactionType: 'ISSUE',
      itemId: payload.itemId,
      itemCode: payload.itemCode,
      factoryId: payload.factoryId,
      quantity: payload.quantity,
      unit: payload.unit,
      scheduledDate: payload.scheduledDate || payload.orderDate,
      customerName: payload.receiver || payload.customerName,
      issueType: payload.issueType || 'SHIPPING',
      shippingAddress: payload.address || payload.shippingAddress,
      notes: payload.deliveryMessage || payload.notes || '',
    };
    
    const response = yield call(plannedTransactionsAPI.createPlannedTransaction, transactionData);
    
    // 백엔드 응답 형식: { ok: true, data: { planned: {...} } }
    const newTransaction = response.data?.data?.planned || response.data?.data || response.data;
    
    yield put(createShipping.success(newTransaction));
    
    // 목록 새로고침
    yield put(fetchShippingList.request({ status: 'PENDING' }));
  } catch (error) {
    yield put(createShipping.failure(error.response?.data?.message || '배송 주문 생성에 실패했습니다.'));
  }
}

// 배송 정보 수정
function* updateShippingSaga(action) {
  try {
    // plannedTransactionsAPI.updatePlannedTransaction 사용
    const { id, data } = action.payload;
    const response = yield call(plannedTransactionsAPI.updatePlannedTransaction, id, data);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(updateShipping.success(response.data?.data || response.data));
    
    // 목록 새로고침
    yield put(fetchShippingList.request({ status: 'PENDING' }));
    yield put(fetchShippingList.request({ status: 'COMPLETED' }));
  } catch (error) {
    yield put(updateShipping.failure(error.response?.data?.message || '배송 정보 수정에 실패했습니다.'));
  }
}

// 배송 주문 삭제
function* deleteShippingSaga(action) {
  try {
    // plannedTransactionsAPI.deletePlannedTransaction 사용
    yield call(plannedTransactionsAPI.deletePlannedTransaction, action.payload);
    yield put(deleteShipping.success(action.payload));
    
    // 목록 새로고침
    yield put(fetchShippingList.request({ status: 'PENDING' }));
    yield put(fetchShippingList.request({ status: 'COMPLETED' }));
  } catch (error) {
    yield put(deleteShipping.failure(error.response?.data?.message || '배송 주문 삭제에 실패했습니다.'));
  }
}

// 배송 확정 (출고 완료 처리)
function* confirmShippingSaga(action) {
  try {
    // plannedTransactionsAPI.completeIssue 사용
    const { id, data } = action.payload;
    const completeData = {
      actualQuantity: data.actualQuantity || data.quantity,
      transferType: data.transferType || 'CUSTOMER',
      shippingInfo: {
        recipientName: data.receiver || data.recipientName,
        recipientAddress: data.address || data.recipientAddress,
      },
      note: data.note || '',
      labelSize: data.labelSize,
      labelQuantity: data.labelQuantity,
    };
    
    const response = yield call(plannedTransactionsAPI.completeIssue, id, completeData);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(confirmShipping.success(response.data?.data || response.data));
    
    // 목록 새로고침
    yield put(fetchShippingList.request({ status: 'PENDING' }));
    yield put(fetchShippingList.request({ status: 'COMPLETED' }));
  } catch (error) {
    yield put(confirmShipping.failure(error.response?.data?.message || '배송 확정에 실패했습니다.'));
  }
}

// B2B 배송 목록 조회
function* fetchB2BShippingsSaga(action) {
  try {
    // plannedTransactionsAPI.getPlannedTransactions 사용 (transactionType: 'ISSUE', issueType: 'B2B')
    const params = {
      transactionType: 'ISSUE',
      issueType: 'B2B',
      ...action.payload,
    };
    const response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
    
    // 백엔드 응답 형식: { ok: true, data: { items: [...], meta: {...} } }
    const plannedData = response.data?.data || response.data || {};
    const items = plannedData.items || plannedData.data || [];
    const itemsArray = Array.isArray(items) ? items : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedItems = itemsArray.map((item) => {
      const plannedItem = item.item || item.Item || {};
      const factory = item.factory || item.Factory || {};
      
      return {
        id: item.id,
        orderNumber: `B2B-${item.id}`,
        orderDate: item.scheduledDate || item.scheduled_date || '',
        issueType: 'B2B',
        product: plannedItem.name || item.item_name || '',
        productCode: plannedItem.code || item.item_code || '',
        receiver: item.customerName || item.customer_name || '',
        contact: item.contact || '',
        phone: item.recipientPhone || item.recipient_phone || '',
        postalCode: '',
        address: item.shippingAddress || item.shipping_address || '',
        deliveryMessage: item.notes || item.note || '',
        quantity: item.quantity || 0,
        unit: item.unit || '',
        status: item.status === 'COMPLETED' ? '배송완료' : item.status === 'APPROVED' ? '배송중' : '배송대기',
        carrier: item.shippingCompany || item.shipping_company || null,
        trackingNumber: item.trackingNumber || item.tracking_number || null,
        contractNumber: item.contractNumber || item.contract_number || '',
        shippedDate: item.completedAt || item.completed_at || null,
      };
    });
    
    yield put(fetchB2BShippings.success(transformedItems));
  } catch (error) {
    yield put(fetchB2BShippings.failure(error.response?.data?.message || 'B2B 배송 목록을 불러오지 못했습니다.'));
  }
}

// BC2 공장간 운송 목록 조회
function* fetchBC2ShippingsSaga(action) {
  try {
    // plannedTransactionsAPI.getPlannedTransactions 사용 (transactionType: 'ISSUE', issueType: 'BC2')
    const params = {
      transactionType: 'ISSUE',
      issueType: 'BC2',
      ...action.payload,
    };
    const response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
    
    // 백엔드 응답 형식: { ok: true, data: { items: [...], meta: {...} } }
    const plannedData = response.data?.data || response.data || {};
    const items = plannedData.items || plannedData.data || [];
    const itemsArray = Array.isArray(items) ? items : [];
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedItems = itemsArray.map((item) => {
      const plannedItem = item.item || item.Item || {};
      const fromFactory = item.fromFactory || item.FromFactory || {};
      const toFactory = item.toFactory || item.ToFactory || item.factory || item.Factory || {};
      
      return {
        id: item.id,
        orderNumber: `BC2-${item.id}`,
        orderDate: item.scheduledDate || item.scheduled_date || '',
        issueType: 'BC2',
        product: plannedItem.name || item.item_name || '',
        productCode: plannedItem.code || item.item_code || '',
        fromFactory: fromFactory.name || item.from_factory_name || '',
        toFactory: toFactory.name || item.to_factory_name || item.factory_name || '',
        quantity: item.quantity || 0,
        unit: item.unit || '',
        status: item.status === 'COMPLETED' ? '운송완료' : '운송대기',
        driver: item.driver || item.driver_name || null,
        vehicleNumber: item.vehicleNumber || item.vehicle_number || null,
        scheduledDate: item.scheduledDate || item.scheduled_date || '',
        completedDate: item.completedAt || item.completed_at || null,
        deliveryMessage: item.notes || item.note || '',
      };
    });
    
    yield put(fetchBC2Shippings.success(transformedItems));
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
