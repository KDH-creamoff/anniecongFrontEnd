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
    // index.js의 getTemplate 사용
    const response = yield call(labelAPI.getTemplate, action.payload);
    // 배열 정규화
    const template = response.data?.data || response.data;
    yield put(fetchLabelTemplate.success(template));
  } catch (error) {
    yield put(fetchLabelTemplate.failure(error.response?.data?.message || '라벨 템플릿을 불러오지 못했습니다.'));
  }
}

// ==================== 라벨 목록 조회 ====================
function* fetchAllLabelsSaga(action) {
  try {
    // index.js의 getTemplates 사용 (전체 라벨/템플릿 목록)
    const response = yield call(labelAPI.getTemplates, action.payload);
    // 배열 정규화
    const labels = Array.isArray(response.data) 
      ? response.data 
      : (response.data?.data || response.data?.templates || []);
    yield put(fetchAllLabels.success(labels));
  } catch (error) {
    yield put(fetchAllLabels.failure(error.response?.data?.message || '라벨 목록을 불러오지 못했습니다.'));
  }
}

function* fetchLabelsByBarcodeSaga(action) {
  try {
    // ⚠️ 백엔드 미구현: 임시로 빈 배열 반환
    // TODO: 백엔드에 GET /label/labels/barcode/:barcode 구현 필요
    // 구현 시: const response = yield call(labelAPI.getLabelsByBarcode, action.payload);
    console.warn('fetchLabelsByBarcode: 백엔드 API 미구현, 빈 배열 반환');
    yield put(fetchLabelsByBarcode.success([]));
  } catch (error) {
    yield put(fetchLabelsByBarcode.failure(error.response?.data?.message || '바코드로 라벨을 조회하지 못했습니다.'));
  }
}

function* fetchLabelsByInventorySaga(action) {
  try {
    // ⚠️ 백엔드 미구현: 임시로 빈 배열 반환
    // TODO: 백엔드에 GET /label/labels/inventory/:inventoryId 구현 필요
    // 구현 시: const response = yield call(labelAPI.getLabelsByInventory, action.payload);
    console.warn('fetchLabelsByInventory: 백엔드 API 미구현, 빈 배열 반환');
    yield put(fetchLabelsByInventory.success([]));
  } catch (error) {
    yield put(fetchLabelsByInventory.failure(error.response?.data?.message || '재고ID로 라벨을 조회하지 못했습니다.'));
  }
}

// ==================== 라벨 출력 ====================
function* printSavedLabelSaga(action) {
  try {
    // index.js의 printLabel 사용
    const response = yield call(labelAPI.printLabel, action.payload);
    yield put(printSavedLabel.success(response.data));
  } catch (error) {
    yield put(printSavedLabel.failure(error.response?.data?.message || '라벨 출력에 실패했습니다.'));
  }
}

// ==================== 바코드 생성 ====================
function* generateBarcodeSaga(action) {
  try {
    // ⚠️ 백엔드 미구현: 임시로 더미 바코드 반환
    // TODO: 백엔드에 POST /label/barcode/generate 구현 필요
    // 구현 시: const response = yield call(labelAPI.generateBarcode, action.payload);
    console.warn('generateBarcode: 백엔드 API 미구현, 더미 데이터 반환');
    const dummyBarcode = `BARCODE${Date.now()}`;
    yield put(generateBarcode.success({ barcode: dummyBarcode }));
  } catch (error) {
    yield put(generateBarcode.failure(error.response?.data?.message || '바코드 생성에 실패했습니다.'));
  }
}

function* generateIssueLabelSaga(action) {
  try {
    // ⚠️ 백엔드 미구현: 임시로 saveTemplate 사용
    // TODO: 백엔드에 POST /label/issue/generate 구현 필요
    // 구현 시: const response = yield call(labelAPI.generateIssueLabel, action.payload);
    console.warn('generateIssueLabel: 백엔드 API 미구현, saveTemplate으로 대체');
    const response = yield call(labelAPI.saveTemplate, action.payload);
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
