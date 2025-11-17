import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { inventoryAPI, labelAPI } from '../../../api';
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
    // inventoryAPI.getMovements 사용 (type: 'RECEIVE' 필터)
    const response = yield call(inventoryAPI.getMovements, {
      ...action.payload,
      type: 'RECEIVE',
    });
    yield put(fetchReceivingList.success(response.data));
  } catch (error) {
    yield put(fetchReceivingList.failure(error.response?.data?.message || '입고 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 입고 생성 ====================
function* createReceivingSaga(action) {
  try {
    // inventoryAPI.receive 사용
    const response = yield call(inventoryAPI.receive, action.payload);
    yield put(createReceiving.success(response.data));
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
    // inventoryAPI.deleteInventory 사용
    yield call(inventoryAPI.deleteInventory, action.payload);
    yield put(deleteReceiving.success(action.payload));
  } catch (error) {
    yield put(deleteReceiving.failure(error.response?.data?.message || '입고 삭제에 실패했습니다.'));
  }
}

// ==================== 입고 확정 ====================
function* confirmReceivingSaga(action) {
  try {
    // TODO: 백엔드에 해당 API 없음 - 임시 목데이터 사용
    yield delay(500);
    yield put(confirmReceiving.success({ id: action.payload, status: 'confirmed' }));
  } catch (error) {
    yield put(confirmReceiving.failure(error.response?.data?.message || '입고 확정에 실패했습니다.'));
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
