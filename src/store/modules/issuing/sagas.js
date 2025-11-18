import { call, put, takeLatest } from 'redux-saga/effects';
import { plannedTransactionsAPI, inventoryTransactionsAPI, inventoryAPI } from '../../../api';
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

// 목데이터 제거됨 - 모든 데이터는 백엔드 API에서 가져옴

// ==================== 출고 목록 조회 ====================
function* fetchIssuingListSaga(action) {
  try {
    const { status } = action.payload || {};

    let response;
    let itemsArray = [];
    
    if (status === '대기' || status === 'PENDING' || status === 'pending' || !status) {
      // 대기 목록: 예정 트랜잭션에서 조회
      const params = {
        transactionType: 'ISSUE',
        status: 'PENDING',
      };
      // action.payload에서 status 제외하고 나머지 파라미터만 추가
      Object.keys(action.payload || {}).forEach(key => {
        if (key !== 'status') {
          params[key] = action.payload[key];
        }
      });
      console.log('출고 대기 목록 조회 파라미터:', params);
      response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
      console.log('출고 대기 목록 응답:', response.data);
      
      // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
      const plannedData = response.data?.data || response.data || [];
      itemsArray = Array.isArray(plannedData) ? plannedData : [];
    } else if (status === '완료' || status === 'COMPLETED' || status === 'completed') {
      // 완료 목록: 예정 트랜잭션에서 COMPLETED 상태로 조회
      const params = {
        transactionType: 'ISSUE',
        status: 'COMPLETED',
      };
      // action.payload에서 status 제외하고 나머지 파라미터만 추가
      Object.keys(action.payload || {}).forEach(key => {
        if (key !== 'status') {
          params[key] = action.payload[key];
        }
      });
      console.log('출고 완료 목록 조회 파라미터:', params);
      response = yield call(plannedTransactionsAPI.getPlannedTransactions, params);
      console.log('출고 완료 목록 응답:', response.data);
      
      // 백엔드 응답 형식: { ok: true, data: [...], meta: {...} }
      const completedData = response.data?.data || response.data || [];
      itemsArray = Array.isArray(completedData) ? completedData : [];
    } else {
      // 전체 목록: 예정 트랜잭션에서 모든 상태 조회
      const params = {
        transactionType: 'ISSUE',
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
      // API 응답 구조: { id, transactionType, status, statusName, item: {...}, factory: {...}, quantity, unit, scheduledDate, completedAt, customerName, ... }
      const itemData = item.item || {};
      const factoryData = item.factory || {};
      
      // status 변환: "PENDING" -> "대기", "COMPLETED" -> "완료", "CANCELLED" -> "취소"
      const itemStatus = item.status || 'PENDING';
      const statusKorean = item.statusName || (itemStatus === 'PENDING' ? '대기' : itemStatus === 'COMPLETED' ? '완료' : itemStatus === 'CANCELLED' ? '취소' : '대기');
      
      return {
        id: item.id,
        itemId: itemData.id || item.itemId,
        itemCode: itemData.code || item.itemCode || '',
        itemName: itemData.name || item.itemName || '',
        category: itemData.category || item.category || '',
        orderQuantity: item.quantity || 0,
        issuedQuantity: item.quantity || 0,
        availableQuantity: 0,
        scheduledDate: item.scheduledDate || item.scheduled_date || '',
        completedDate: item.completedAt || item.completed_at || '',
        unit: item.unit || '',
        unitCount: item.labelQuantity || item.label_quantity || 0,
        factory: factoryData.name || item.factoryName || '',
        factoryId: factoryData.id || item.factoryId || '',
        toCustomer: item.customerName || item.customer_name || '',
        status: statusKorean, // "대기", "완료", "취소"
        statusName: statusKorean,
        transactionNumber: item.transactionNumber || item.transaction_number || item.id?.toString() || '',
        manager: item.requestedBy?.name || item.manager || item.manager_name || '',
        note: item.notes || item.note || '',
        transactionType: item.transactionType || 'ISSUE',
      };
    });
    
    yield put(fetchIssuingList.success(transformedItems));
  } catch (error) {
    console.error('출고 목록 조회 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    yield put(fetchIssuingList.failure(error.response?.data?.message || error.message || '출고 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 출고 생성 (대기 목록에 추가) ====================
function* createIssuingSaga(action) {
  try {
    // plannedTransactionsAPI.createPlannedTransaction 사용
    const payload = action.payload;
    const transactionData = {
      transactionType: 'ISSUE',
      itemId: payload.itemId,
      itemCode: payload.itemCode,
      factoryId: payload.factoryId,
      quantity: payload.orderQuantity || payload.quantity,
      unit: payload.unit,
      scheduledDate: payload.scheduledDate,
      customerName: payload.toCustomer || payload.customerName,
      issueType: payload.issueType || 'SHIPPING',
      notes: payload.note || payload.notes || '',
    };
    
    const response = yield call(plannedTransactionsAPI.createPlannedTransaction, transactionData);
    
    // 백엔드 응답 형식: { ok: true, data: { planned: {...} } }
    const newTransaction = response.data?.data?.planned || response.data?.data || response.data;
    
    yield put(createIssuing.success(newTransaction));
    
    // 목록 새로고침
    yield put(fetchIssuingList.request({ status: '대기' }));
  } catch (error) {
    yield put(createIssuing.failure(error.response?.data?.message || '출고 생성에 실패했습니다.'));
  }
}

// ==================== 출고 수정 ====================
function* updateIssuingSaga(action) {
  try {
    // plannedTransactionsAPI.updatePlannedTransaction 사용
    const { id, data } = action.payload;
    const response = yield call(plannedTransactionsAPI.updatePlannedTransaction, id, data);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(updateIssuing.success(response.data?.data || response.data));
    
    // 목록 새로고침
    yield put(fetchIssuingList.request({ status: '대기' }));
    yield put(fetchIssuingList.request({ status: '완료' }));
  } catch (error) {
    yield put(updateIssuing.failure(error.response?.data?.message || '출고 수정에 실패했습니다.'));
  }
}

// ==================== 출고 삭제 ====================
function* deleteIssuingSaga(action) {
  try {
    // plannedTransactionsAPI.deletePlannedTransaction 사용
    yield call(plannedTransactionsAPI.deletePlannedTransaction, action.payload);
    yield put(deleteIssuing.success(action.payload));
    
    // 목록 새로고침
    yield put(fetchIssuingList.request({ status: '대기' }));
    yield put(fetchIssuingList.request({ status: '완료' }));
  } catch (error) {
    yield put(deleteIssuing.failure(error.response?.data?.message || '출고 삭제에 실패했습니다.'));
  }
}

// ==================== 일괄 출고 (대기 → 완료 전환) ====================
function* batchIssueSaga(action) {
  try {
    const { ids, data } = action.payload; // 출고 처리할 ID 배열
    
    // 일괄 출고 API 사용
    if (ids.length > 1 || data?.useBatch) {
      const transactions = ids.map((id) => {
        const item = data?.items?.find(i => i.id === id) || data;
        return {
          itemId: item.itemId || id,
          factoryId: item.factoryId || data?.factoryId || 1,
          quantity: item.quantity || data?.actualQuantity || data?.quantity,
          unit: item.unit || data?.unit || 'EA',
          recipientName: item.receiver || item.recipientName || data?.receiver || data?.recipientName || '',
          recipientPhone: item.recipientPhone || data?.recipientPhone || '',
          recipientAddress: item.address || item.recipientAddress || data?.address || data?.recipientAddress || '',
          shippingCompany: item.shippingCompany || data?.shippingCompany || '',
          trackingNumber: item.trackingNumber || data?.trackingNumber || '',
          note: item.note || data?.note || '',
        };
      });
      
      const response = yield call(inventoryTransactionsAPI.batchIssue, { transactions });
      yield put(batchIssue.success(response.data?.data || response.data));
    } else {
      // 단일 출고 처리
      const processedItems = [];
      for (const id of ids) {
        try {
          // 먼저 예정 트랜잭션 완료 시도
          try {
            const completeData = {
              actualQuantity: data?.actualQuantity || data?.quantity,
              transferType: data?.transferType || 'CUSTOMER',
              shippingInfo: data?.shippingInfo || {
                recipientName: data?.receiver || data?.recipientName,
                recipientAddress: data?.address || data?.recipientAddress,
              },
              note: data?.note || '',
              labelSize: data?.labelSize,
              labelQuantity: data?.labelQuantity,
            };
            
            const response = yield call(plannedTransactionsAPI.completeIssue, id, completeData);
            const completedItem = response.data?.data || response.data;
            processedItems.push(completedItem);
          } catch (plannedError) {
            // 예정 트랜잭션이 아니면 직접 issue 호출
            console.log('예정 트랜잭션 완료 실패, 직접 출고 처리 시도:', plannedError);
            
            const issueData = {
              itemId: data?.itemId || id,
              factoryId: data?.factoryId || 1,
              quantity: data?.actualQuantity || data?.quantity,
              unit: data?.unit || 'EA',
              issueType: data?.issueType || 'SHIPPING',
              shippingInfo: data?.shippingInfo || {
                recipientName: data?.receiver || data?.recipientName || '',
                recipientPhone: data?.recipientPhone || '',
                recipientAddress: data?.address || data?.recipientAddress || '',
                shippingCompany: data?.shippingCompany || '',
                trackingNumber: data?.trackingNumber || '',
              },
              note: data?.note || '',
            };
            
            const response = yield call(inventoryTransactionsAPI.issue, issueData);
            const completedItem = response.data?.data || response.data;
            processedItems.push(completedItem);
          }
        } catch (error) {
          console.error(`출고 처리 실패 (ID: ${id}):`, error);
          console.error('에러 상세:', error.response?.data || error.message);
        }
      }
      
      yield put(batchIssue.success({ count: processedItems.length, items: processedItems }));
    }
    
    // 목록 새로고침
    yield put(fetchIssuingList.request({ status: '대기' }));
    yield put(fetchIssuingList.request({ status: '완료' }));
  } catch (error) {
    console.error('일괄 출고 실패:', error);
    console.error('에러 상세:', error.response?.data || error.message);
    yield put(batchIssue.failure(error.response?.data?.message || error.message || '일괄 출고에 실패했습니다.'));
  }
}

// ==================== 출고 통계 ====================
function* fetchIssuingStatsSaga(action) {
  try {
    // plannedTransactionsAPI.getStats 사용
    const params = {
      transactionType: 'ISSUE',
      ...action.payload,
    };
    const response = yield call(plannedTransactionsAPI.getStats, params);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    yield put(fetchIssuingStats.success(response.data?.data || response.data));
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
