import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 프린터 관리
export const FETCH_PRINTERS = createRequestTypes('label/FETCH_PRINTERS');

// 라벨 템플릿 관리
export const SAVE_TEMPLATE = createRequestTypes('label/SAVE_TEMPLATE');
export const FETCH_LABEL_TEMPLATE = createRequestTypes('label/FETCH_LABEL_TEMPLATE');

// 라벨 목록 조회
export const FETCH_ALL_LABELS = createRequestTypes('label/FETCH_ALL_LABELS');
export const FETCH_LABELS_BY_BARCODE = createRequestTypes('label/FETCH_LABELS_BY_BARCODE');
export const FETCH_LABELS_BY_INVENTORY = createRequestTypes('label/FETCH_LABELS_BY_INVENTORY');

// 라벨 출력
export const PRINT_SAVED_LABEL = createRequestTypes('label/PRINT_SAVED_LABEL');

// 바코드 생성
export const GENERATE_BARCODE = createRequestTypes('label/GENERATE_BARCODE');
export const GENERATE_ISSUE_LABEL = createRequestTypes('label/GENERATE_ISSUE_LABEL');

// UI 상태 관리
export const SET_LABEL_FILTER = 'label/SET_LABEL_FILTER';
export const CLEAR_LABEL_ERROR = 'label/CLEAR_LABEL_ERROR';
export const RESET_LABEL_STATE = 'label/RESET_LABEL_STATE';

// ==================== 액션 생성자 ====================

// 프린터 관리
export const fetchPrinters = createAsyncActions(FETCH_PRINTERS);

// 라벨 템플릿 관리
export const saveTemplate = createAsyncActions(SAVE_TEMPLATE);
export const fetchLabelTemplate = createAsyncActions(FETCH_LABEL_TEMPLATE);

// 라벨 목록 조회
export const fetchAllLabels = createAsyncActions(FETCH_ALL_LABELS);
export const fetchLabelsByBarcode = createAsyncActions(FETCH_LABELS_BY_BARCODE);
export const fetchLabelsByInventory = createAsyncActions(FETCH_LABELS_BY_INVENTORY);

// 라벨 출력
export const printSavedLabel = createAsyncActions(PRINT_SAVED_LABEL);

// 바코드 생성
export const generateBarcode = createAsyncActions(GENERATE_BARCODE);
export const generateIssueLabel = createAsyncActions(GENERATE_ISSUE_LABEL);

// UI 액션 생성자
export const setLabelFilter = (filter) => ({
  type: SET_LABEL_FILTER,
  payload: filter,
});

export const clearLabelError = () => ({
  type: CLEAR_LABEL_ERROR,
});

export const resetLabelState = () => ({
  type: RESET_LABEL_STATE,
});