import { createAsyncState } from '../../../utils/sagaUtils';
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
  SET_LABEL_FILTER,
  CLEAR_LABEL_ERROR,
  RESET_LABEL_STATE,
} from './actions';

const initialState = {
  printers: createAsyncState([]),
  template: createAsyncState(null),
  templateOperation: createAsyncState(null),
  labels: createAsyncState([]),
  labelsByBarcode: createAsyncState([]),
  labelsByInventory: createAsyncState([]),
  printOperation: createAsyncState(null),
  barcode: createAsyncState(null),
  issueLabel: createAsyncState(null),
  filter: {
    barcode: '',
    inventoryId: '',
  },
};

const labelReducer = (state = initialState, action) => {
  switch (action.type) {
    // 프린터 목록 조회
    case FETCH_PRINTERS.REQUEST:
      return { ...state, printers: { ...state.printers, loading: true, error: null } };
    case FETCH_PRINTERS.SUCCESS:
      return { ...state, printers: { data: action.payload, loading: false, error: null } };
    case FETCH_PRINTERS.FAILURE:
      return { ...state, printers: { ...state.printers, loading: false, error: action.error } };

    // 라벨 템플릿 저장
    case SAVE_TEMPLATE.REQUEST:
      return { ...state, templateOperation: { ...state.templateOperation, loading: true, error: null } };
    case SAVE_TEMPLATE.SUCCESS:
      return { ...state, templateOperation: { data: action.payload, loading: false, error: null } };
    case SAVE_TEMPLATE.FAILURE:
      return { ...state, templateOperation: { ...state.templateOperation, loading: false, error: action.error } };

    // 라벨 템플릿 조회
    case FETCH_LABEL_TEMPLATE.REQUEST:
      return { ...state, template: { ...state.template, loading: true, error: null } };
    case FETCH_LABEL_TEMPLATE.SUCCESS:
      return { ...state, template: { data: action.payload, loading: false, error: null } };
    case FETCH_LABEL_TEMPLATE.FAILURE:
      return { ...state, template: { ...state.template, loading: false, error: action.error } };

    // 전체 라벨 목록 조회
    case FETCH_ALL_LABELS.REQUEST:
      return { ...state, labels: { ...state.labels, loading: true, error: null } };
    case FETCH_ALL_LABELS.SUCCESS:
      return { ...state, labels: { data: action.payload, loading: false, error: null } };
    case FETCH_ALL_LABELS.FAILURE:
      return { ...state, labels: { ...state.labels, loading: false, error: action.error } };

    // 바코드로 라벨 조회
    case FETCH_LABELS_BY_BARCODE.REQUEST:
      return { ...state, labelsByBarcode: { ...state.labelsByBarcode, loading: true, error: null } };
    case FETCH_LABELS_BY_BARCODE.SUCCESS:
      return { ...state, labelsByBarcode: { data: action.payload, loading: false, error: null } };
    case FETCH_LABELS_BY_BARCODE.FAILURE:
      return { ...state, labelsByBarcode: { ...state.labelsByBarcode, loading: false, error: action.error } };

    // 재고ID로 라벨 조회
    case FETCH_LABELS_BY_INVENTORY.REQUEST:
      return { ...state, labelsByInventory: { ...state.labelsByInventory, loading: true, error: null } };
    case FETCH_LABELS_BY_INVENTORY.SUCCESS:
      return { ...state, labelsByInventory: { data: action.payload, loading: false, error: null } };
    case FETCH_LABELS_BY_INVENTORY.FAILURE:
      return { ...state, labelsByInventory: { ...state.labelsByInventory, loading: false, error: action.error } };

    // 라벨 출력
    case PRINT_SAVED_LABEL.REQUEST:
      return { ...state, printOperation: { ...state.printOperation, loading: true, error: null } };
    case PRINT_SAVED_LABEL.SUCCESS:
      return { ...state, printOperation: { data: action.payload, loading: false, error: null } };
    case PRINT_SAVED_LABEL.FAILURE:
      return { ...state, printOperation: { ...state.printOperation, loading: false, error: action.error } };

    // 바코드 생성
    case GENERATE_BARCODE.REQUEST:
      return { ...state, barcode: { ...state.barcode, loading: true, error: null } };
    case GENERATE_BARCODE.SUCCESS:
      return { ...state, barcode: { data: action.payload, loading: false, error: null } };
    case GENERATE_BARCODE.FAILURE:
      return { ...state, barcode: { ...state.barcode, loading: false, error: action.error } };

    // 출고 라벨 생성
    case GENERATE_ISSUE_LABEL.REQUEST:
      return { ...state, issueLabel: { ...state.issueLabel, loading: true, error: null } };
    case GENERATE_ISSUE_LABEL.SUCCESS:
      return { ...state, issueLabel: { data: action.payload, loading: false, error: null } };
    case GENERATE_ISSUE_LABEL.FAILURE:
      return { ...state, issueLabel: { ...state.issueLabel, loading: false, error: action.error } };

    // UI 상태 관리
    case SET_LABEL_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case CLEAR_LABEL_ERROR:
      return {
        ...state,
        printers: { ...state.printers, error: null },
        template: { ...state.template, error: null },
        templateOperation: { ...state.templateOperation, error: null },
        labels: { ...state.labels, error: null },
        labelsByBarcode: { ...state.labelsByBarcode, error: null },
        labelsByInventory: { ...state.labelsByInventory, error: null },
        printOperation: { ...state.printOperation, error: null },
        barcode: { ...state.barcode, error: null },
        issueLabel: { ...state.issueLabel, error: null },
      };

    case RESET_LABEL_STATE:
      return initialState;

    default:
      return state;
  }
};

export default labelReducer;
