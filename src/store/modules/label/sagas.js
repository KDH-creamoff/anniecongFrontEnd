import { call, put, takeLatest } from 'redux-saga/effects';
import { labelAPI } from '../../../api';
import {
  FETCH_PRINTERS,
  SAVE_TEMPLATE,
  FETCH_LABEL_TEMPLATE,
  FETCH_ALL_LABELS,
  FETCH_LABELS_BY_BARCODE,
  FETCH_LABELS_BY_INVENTORY,
  PRINT_SAVED_LABEL,
  GENERATE_BARCODE,
  GENERATE_ISSUE_LABEL,
  fetchPrinters,
  saveTemplate,
  fetchLabelTemplate,
  fetchAllLabels,
  fetchLabelsByBarcode,
  fetchLabelsByInventory,
  printSavedLabel,
  generateBarcode,
  generateIssueLabel,
} from './actions';

// ==================== 프린터 조회 ====================
function* fetchPrintersSaga() {
  try {
    const response = yield call(labelAPI.getPrinters);
    yield put(fetchPrinters.success(response.data));
  } catch (error) {
    yield put(fetchPrinters.failure(error.response?.data?.message || '프린터 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 라벨 템플릿 관리 ====================
function* saveTemplateSaga(action) {
  try {
    const response = yield call(labelAPI.saveTemplate, action.payload);
    yield put(saveTemplate.success(response.data));
  } catch (error) {
    yield put(saveTemplate.failure(error.response?.data?.message || '라벨 템플릿 저장에 실패했습니다.'));
  }
}

function* fetchLabelTemplateSaga(action) {
  try {
    const response = yield call(labelAPI.getLabelTemplate, action.payload);
    yield put(fetchLabelTemplate.success(response.data));
  } catch (error) {
    yield put(fetchLabelTemplate.failure(error.response?.data?.message || '라벨 템플릿을 불러오지 못했습니다.'));
  }
}

// ==================== 라벨 목록 조회 ====================
function* fetchAllLabelsSaga(action) {
  try {
    const response = yield call(labelAPI.getAllLabels, action.payload);
    yield put(fetchAllLabels.success(response.data));
  } catch (error) {
    yield put(fetchAllLabels.failure(error.response?.data?.message || '라벨 목록을 불러오지 못했습니다.'));
  }
}

function* fetchLabelsByBarcodeSaga(action) {
  try {
    const response = yield call(labelAPI.getLabelsByBarcode, action.payload);
    yield put(fetchLabelsByBarcode.success(response.data));
  } catch (error) {
    yield put(fetchLabelsByBarcode.failure(error.response?.data?.message || '바코드로 라벨을 조회하지 못했습니다.'));
  }
}

function* fetchLabelsByInventorySaga(action) {
  try {
    const response = yield call(labelAPI.getLabelsByInventory, action.payload);
    yield put(fetchLabelsByInventory.success(response.data));
  } catch (error) {
    yield put(fetchLabelsByInventory.failure(error.response?.data?.message || '재고ID로 라벨을 조회하지 못했습니다.'));
  }
}

// ==================== 라벨 출력 ====================
function* printSavedLabelSaga(action) {
  try {
    const response = yield call(labelAPI.printSavedLabel, action.payload);
    yield put(printSavedLabel.success(response.data));
  } catch (error) {
    yield put(printSavedLabel.failure(error.response?.data?.message || '라벨 출력에 실패했습니다.'));
  }
}

// ==================== 바코드 생성 ====================
function* generateBarcodeSaga(action) {
  try {
    const response = yield call(labelAPI.generateBarcode, action.payload);
    yield put(generateBarcode.success(response.data));
  } catch (error) {
    yield put(generateBarcode.failure(error.response?.data?.message || '바코드 생성에 실패했습니다.'));
  }
}

function* generateIssueLabelSaga(action) {
  try {
    const response = yield call(labelAPI.generateIssueLabel, action.payload);
    yield put(generateIssueLabel.success(response.data));
  } catch (error) {
    yield put(generateIssueLabel.failure(error.response?.data?.message || '출고 라벨 생성에 실패했습니다.'));
  }
}

// ==================== Root Saga ====================
export default function* labelSaga() {
  yield takeLatest(FETCH_PRINTERS.REQUEST, fetchPrintersSaga);
  yield takeLatest(SAVE_TEMPLATE.REQUEST, saveTemplateSaga);
  yield takeLatest(FETCH_LABEL_TEMPLATE.REQUEST, fetchLabelTemplateSaga);
  yield takeLatest(FETCH_ALL_LABELS.REQUEST, fetchAllLabelsSaga);
  yield takeLatest(FETCH_LABELS_BY_BARCODE.REQUEST, fetchLabelsByBarcodeSaga);
  yield takeLatest(FETCH_LABELS_BY_INVENTORY.REQUEST, fetchLabelsByInventorySaga);
  yield takeLatest(PRINT_SAVED_LABEL.REQUEST, printSavedLabelSaga);
  yield takeLatest(GENERATE_BARCODE.REQUEST, generateBarcodeSaga);
  yield takeLatest(GENERATE_ISSUE_LABEL.REQUEST, generateIssueLabelSaga);
}
