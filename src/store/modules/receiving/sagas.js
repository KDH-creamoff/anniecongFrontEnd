import { call, put, takeLatest } from 'redux-saga/effects';
import { plannedTransactionsAPI, inventoryTransactionsAPI, inventoryAPI, labelAPI } from '../../../api';
import {
  FETCH_RECEIVING_LIST,
  CREATE_RECEIVING,
  UPDATE_RECEIVING,
  DELETE_RECEIVING,
  CONFIRM_RECEIVING,
  PRINT_LABEL,
  fetchReceivingList,
  createReceiving,
  updateReceiving,
  deleteReceiving,
  confirmReceiving,
  printLabel,
} from './actions';

// ==================== 입고 목록 조회 ====================
function* fetchReceivingListSaga(action) {
  try {
    console.log('🔵 fetchReceivingListSaga 시작:', action.payload);
    const { status } = action.payload || {};
    let response;
    let itemsArray = [];
    
    if (status === 'PENDING' || status === 'pending' || !status) {
      // 대기 목록: 예정 트랜잭션에서 조회
      const params = {
        transactionType: 'RECEIVE',
        status: 'PENDING',
      };
      // action.payload에서 status 제외하고 나머지 파라미터만 추가
      Object.keys(action.payload || {}).forEach(key => {
        if (key !== 'status') {
          params[key] = action.payload[key];
        }
      });
      console.log('입고 대기 목록 조회 파라미터:', params);
      response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
      console.log('입고 대기 목록 응답:', response.data);
      
      // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
      const plannedData = response.data?.data || response.data || [];
      itemsArray = Array.isArray(plannedData) ? plannedData : [];
    } else if (status === 'COMPLETED' || status === 'completed') {
      // 완료 목록: 예정 트랜잭션에서 COMPLETED 상태로 조회
      const params = {
        transactionType: 'RECEIVE',
        status: 'COMPLETED',
      };
      // action.payload에서 status 제외하고 나머지 파라미터만 추가
      Object.keys(action.payload || {}).forEach(key => {
        if (key !== 'status') {
          params[key] = action.payload[key];
        }
      });
      console.log('입고 완료 목록 조회 파라미터:', params);
      response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
      console.log('입고 완료 목록 응답:', response.data);
      
      // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
      const completedData = response.data?.data || response.data || [];
      itemsArray = Array.isArray(completedData) ? completedData : [];
    } else {
      // 전체 목록: 예정 트랜잭션에서 모든 상태 조회
      const params = {
        transactionType: 'RECEIVE',
      };
      // action.payload에서 status 제외하고 나머지 파라미터만 추가
      Object.keys(action.payload || {}).forEach(key => {
        if (key !== 'status') {
          params[key] = action.payload[key];
        }
      });
      const response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
      const allData = response.data?.data || response.data || [];
      itemsArray = Array.isArray(allData) ? allData : [];
    }
    
    // 백엔드 데이터를 프론트엔드 형식으로 변환
    const transformedItems = itemsArray.map((item) => {
      // API 응답 구조: { id, transactionType, status, statusName, item: {...}, factory: {...}, quantity, unit, scheduledDate, completedAt, ... }
      const itemData = item.item || {};
      const factoryData = item.factory || {};
      
      // status 변환: "PENDING" -> "PENDING", "COMPLETED" -> "COMPLETED", "CANCELLED" -> "CANCELLED"
      const itemStatus = item.status || 'PENDING';
      
      return {
        id: item.id,
        itemId: itemData.id || item.itemId,
        itemCode: itemData.code || item.itemCode || '',
        itemName: itemData.name || item.itemName || '',
        factoryId: factoryData.id || item.factoryId,
        factoryName: factoryData.name || item.factoryName || '',
        expectedQuantity: item.quantity || 0,
        quantity: item.quantity || 0,
        unit: item.unit || '',
        expectedDate: item.scheduledDate || item.scheduled_date || '',
        scheduledDate: item.scheduledDate || item.scheduled_date || '',
        receivedQuantity: item.quantity || 0,
        receivedDate: item.completedAt || item.completed_at || '',
        status: itemStatus, // "PENDING", "COMPLETED", "CANCELLED"
        statusName: item.statusName || (itemStatus === 'PENDING' ? '대기' : itemStatus === 'COMPLETED' ? '완료' : '취소'),
        receivedAt: item.completedAt || item.completed_at || '',
        supplierName: item.supplierName || '',
        notes: item.notes || '',
        transactionType: item.transactionType || 'RECEIVE',
      };
    });
    
    console.log('🟢 변환된 데이터:', transformedItems.length, '개');
    console.log('🟢 변환된 데이터 샘플:', transformedItems.slice(0, 2));
    
    yield put(fetchReceivingList.success(transformedItems));
    console.log('✅ fetchReceivingList.success 액션 디스패치 완료');
  } catch (error) {
    console.error('❌ 입고 목록 조회 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data || error.message);
    console.error('❌ 에러 스택:', error.stack);
    yield put(fetchReceivingList.failure(error.response?.data?.message || error.message || '입고 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 입고 생성 ====================
function* createReceivingSaga(action) {
  try {
    // plannedTransactionsAPI.createPlannedTransaction 사용
    const payload = action.payload;
    const transactionData = {
      transactionType: 'RECEIVE',
      itemId: payload.itemId,
      itemCode: payload.itemCode,
      factoryId: payload.factoryId,
      quantity: payload.quantity || payload.expectedQuantity,
      unit: payload.unit,
      scheduledDate: payload.scheduledDate || payload.expectedDate,
      supplierName: payload.supplierName || '',
      notes: payload.notes || payload.note || '',
    };
    
    const response = yield call(plannedTransactionsAPI.createPlannedTransaction, transactionData);
    
    // 백엔드 응답 형식: { ok: true, data: { planned: {...} } }
    const newTransaction = response.data?.data?.planned || response.data?.data || response.data;
    
    yield put(createReceiving.success(newTransaction));
    
    // 목록 새로고침
    yield put(fetchReceivingList.request({ status: 'PENDING' }));
  } catch (error) {
    yield put(createReceiving.failure(error.response?.data?.message || '입고 생성에 실패했습니다.'));
  }
}

// ==================== 입고 수정 ====================
function* updateReceivingSaga(action) {
  try {
    // TODO: 백엔드에 해당 API 없음 - 임시 목데이터 사용
    yield delay(500);
    yield put(updateReceiving.success({ id: action.payload.id, ...action.payload.data }));
  } catch (error) {
    yield put(updateReceiving.failure(error.response?.data?.message || '입고 수정에 실패했습니다.'));
  }
}

// ==================== 입고 삭제 ====================
function* deleteReceivingSaga(action) {
  try {
    // plannedTransactionsAPI.deletePlannedTransaction 사용
    yield call(plannedTransactionsAPI.deletePlannedTransaction, action.payload);
    yield put(deleteReceiving.success(action.payload));
    
    // 목록 새로고침
    yield put(fetchReceivingList.request({ status: 'PENDING' }));
    yield put(fetchReceivingList.request({ status: 'COMPLETED' }));
  } catch (error) {
    yield put(deleteReceiving.failure(error.response?.data?.message || '입고 삭제에 실패했습니다.'));
  }
}

// ==================== 입고 확정 ====================
function* confirmReceivingSaga(action) {
  try {
    const { id, data } = action.payload;
    
    // 예정 트랜잭션이면 completeReceive 사용, 아니면 직접 receive 호출
    let response;
    
    // 먼저 예정 트랜잭션 완료 시도
    try {
      const completeData = {
        actualQuantity: data.actualQuantity || data.quantity,
        receivedAt: data.receivedAt || new Date().toISOString().split('T')[0],
        note: data.note || '',
        labelSize: data.labelSize,
        labelQuantity: data.labelQuantity,
      };
      
      response = yield call(plannedTransactionsAPI.completeReceive, id, completeData);
    } catch (plannedError) {
      // 예정 트랜잭션이 아니면 직접 receive 호출
      console.log('예정 트랜잭션 완료 실패, 직접 입고 처리 시도:', plannedError);
      
      // data에서 필요한 정보 추출
      const receiveData = {
        itemId: data.itemId || id,
        factoryId: data.factoryId || 1,
        storageConditionId: data.storageConditionId,
        wholesalePrice: data.wholesalePrice,
        quantity: data.actualQuantity || data.quantity,
        receivedAt: data.receivedAt || new Date().toISOString().split('T')[0],
        firstReceivedAt: data.firstReceivedAt || data.receivedAt || new Date().toISOString().split('T')[0],
        unit: data.unit || 'EA',
        note: data.note || '',
        printLabel: data.printLabel !== false,
        labelSize: data.labelSize || 'medium',
        labelQuantity: data.labelQuantity || 1,
        barcode: data.barcode,
      };
      
      response = yield call(inventoryTransactionsAPI.receive, receiveData);
    }
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(confirmReceiving.success(response.data?.data || response.data));
    
    // 목록 새로고침
    yield put(fetchReceivingList.request({ status: 'PENDING' }));
    yield put(fetchReceivingList.request({ status: 'COMPLETED' }));
  } catch (error) {
    console.error('입고 확정 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    yield put(confirmReceiving.failure(error.response?.data?.message || error.message || '입고 확정에 실패했습니다.'));
  }
}

// ==================== 라벨 출력 ====================
function* printLabelSaga(action) {
  try {
    // labelAPI.printLabel 사용
    const response = yield call(labelAPI.printLabel, action.payload);
    yield put(printLabel.success(response.data));
  } catch (error) {
    yield put(printLabel.failure(error.response?.data?.message || '라벨 출력에 실패했습니다.'));
  }
}

// ==================== Root Saga ====================
export default function* receivingSaga() {
  yield takeLatest(FETCH_RECEIVING_LIST.REQUEST, fetchReceivingListSaga);
  yield takeLatest(CREATE_RECEIVING.REQUEST, createReceivingSaga);
  yield takeLatest(UPDATE_RECEIVING.REQUEST, updateReceivingSaga);
  yield takeLatest(DELETE_RECEIVING.REQUEST, deleteReceivingSaga);
  yield takeLatest(CONFIRM_RECEIVING.REQUEST, confirmReceivingSaga);
  yield takeLatest(PRINT_LABEL.REQUEST, printLabelSaga);
}
