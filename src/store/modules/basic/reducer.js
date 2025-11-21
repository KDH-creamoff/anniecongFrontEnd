import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_ITEMS,
  FETCH_ITEM_BY_ID,
  FETCH_ITEM_BY_CODE,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_BOMS,
  FETCH_BOM_BY_ID,
  CREATE_BOM,
  UPDATE_BOM,
  DELETE_BOM,
  FETCH_STORAGE_CONDITIONS,
  FETCH_STORAGE_CONDITION,
  CREATE_STORAGE_CONDITION,
  UPDATE_STORAGE_CONDITION,
  FETCH_FACTORIES,
  FETCH_FACTORY_BY_ID,
  CREATE_FACTORY,
  UPDATE_FACTORY,
  DELETE_FACTORY,
  FETCH_PROCESSES,
  CREATE_PROCESS,
  ADD_FACTORY_PROCESSES,
  REMOVE_FACTORY_PROCESS,
  SET_BASIC_FILTER,
  CLEAR_BASIC_ERROR,
  RESET_BASIC_STATE,
  DELETE_STORAGE_CONDITION,
  ADD_STORAGE_CONDITION_ITEMS,
  REMOVE_STORAGE_CONDITION_ITEM,
} from './actions';

const initialState = {
  items: createAsyncState([]),
  itemDetail: createAsyncState(null),
  itemOperation: createAsyncState(null),
  boms: createAsyncState([]),
  bomDetail: createAsyncState(null),
  bomOperation: createAsyncState(null),
  storageConditions: createAsyncState([]),
  storageConditionDetail: createAsyncState(null),
  storageOperation: createAsyncState(null),
  addStorageConditionItems: createAsyncState(null),
  removeStorageConditionItem: createAsyncState(null),
  factories: createAsyncState([]),
  factoryDetail: createAsyncState(null),
  factoryOperation: createAsyncState(null),
  processes: createAsyncState([]),
  factoryProcessOperation: createAsyncState(null),
  removeFactoryProcess: createAsyncState(null),
  filter: {
    category: '',
    factoryId: '',
    code: '',
    name: '',
  },
};

const basicReducer = (state = initialState, action) => {
  switch (action.type) {
    // 품목 목록 조회
    case FETCH_ITEMS.REQUEST:
      return { ...state, items: { ...state.items, loading: true, error: null } };
    case FETCH_ITEMS.SUCCESS:
      return { ...state, items: { data: action.payload, loading: false, error: null } };
    case FETCH_ITEMS.FAILURE:
      return { ...state, items: { ...state.items, loading: false, error: action.error } };

    // 품목 상세 조회 (ID)
    case FETCH_ITEM_BY_ID.REQUEST:
      return { ...state, itemDetail: { ...state.itemDetail, loading: true, error: null } };
    case FETCH_ITEM_BY_ID.SUCCESS:
      return { ...state, itemDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_ITEM_BY_ID.FAILURE:
      return { ...state, itemDetail: { ...state.itemDetail, loading: false, error: action.error } };

    // 품목 상세 조회 (Code)
    case FETCH_ITEM_BY_CODE.REQUEST:
      return { ...state, itemDetail: { ...state.itemDetail, loading: true, error: null } };
    case FETCH_ITEM_BY_CODE.SUCCESS:
      return { ...state, itemDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_ITEM_BY_CODE.FAILURE:
      return { ...state, itemDetail: { ...state.itemDetail, loading: false, error: action.error } };

    // 품목 등록
    case CREATE_ITEM.REQUEST:
      return { ...state, itemOperation: { ...state.itemOperation, loading: true, error: null } };
    case CREATE_ITEM.SUCCESS:
      return { ...state, itemOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_ITEM.FAILURE:
      return { ...state, itemOperation: { ...state.itemOperation, loading: false, error: action.error } };

    // 품목 수정
    case UPDATE_ITEM.REQUEST:
      return { ...state, itemOperation: { ...state.itemOperation, loading: true, error: null } };
    case UPDATE_ITEM.SUCCESS:
      return { ...state, 
        items: { 
          ...state.items,
          data: state.items.data.map((item) =>
            item.id === action.payload.id ? action.payload : item
            ),
          }, 
        itemOperation: { data: action.payload, loading: false, error: null } };
    case UPDATE_ITEM.FAILURE:
      return { ...state, itemOperation: { ...state.itemOperation, loading: false, error: action.error } };

    // 품목 삭제
    case DELETE_ITEM.REQUEST:
      return { ...state, itemOperation: { ...state.itemOperation, loading: true, error: null } };
    case DELETE_ITEM.SUCCESS:
      return { ...state, itemOperation: { data: action.payload, loading: false, error: null } };
    case DELETE_ITEM.FAILURE:
      return { ...state, itemOperation: { ...state.itemOperation, loading: false, error: action.error } };

    // BOM 목록 조회
    case FETCH_BOMS.REQUEST:
      return { ...state, boms: { ...state.boms, loading: true, error: null } };
    case FETCH_BOMS.SUCCESS:
      return { ...state, boms: { data: action.payload, loading: false, error: null } };
    case FETCH_BOMS.FAILURE:
      return { ...state, boms: { ...state.boms, loading: false, error: action.error } };

    // BOM 상세 조회
    case FETCH_BOM_BY_ID.REQUEST:
      // null이면 bomDetail 초기화
      if (action.payload === null) {
        return { ...state, bomDetail: { data: null, loading: false, error: null } };
      }
      return { ...state, bomDetail: { ...state.bomDetail, loading: true, error: null } };
    case FETCH_BOM_BY_ID.SUCCESS:
      return { ...state, bomDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_BOM_BY_ID.FAILURE:
      return { ...state, bomDetail: { ...state.bomDetail, loading: false, error: action.error } };

    // BOM 등록
    case CREATE_BOM.REQUEST:
      return { ...state, bomOperation: { ...state.bomOperation, loading: true, error: null } };
    case CREATE_BOM.SUCCESS:
      return { ...state, bomOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_BOM.FAILURE:
      return { ...state, bomOperation: { ...state.bomOperation, loading: false, error: action.error } };

    // BOM 수정
    case UPDATE_BOM.REQUEST:
      return { ...state, bomOperation: { ...state.bomOperation, loading: true, error: null } };
    case UPDATE_BOM.SUCCESS:
      return { ...state, bomOperation: { data: action.payload, loading: false, error: null } };
    case UPDATE_BOM.FAILURE:
      return { ...state, bomOperation: { ...state.bomOperation, loading: false, error: action.error } };

    // BOM 삭제
    case DELETE_BOM.REQUEST:
      return { ...state, bomOperation: { ...state.bomOperation, loading: true, error: null } };
    case DELETE_BOM.SUCCESS:
      return { ...state, bomOperation: { data: action.payload, loading: false, error: null } };
    case DELETE_BOM.FAILURE:
      return { ...state, bomOperation: { ...state.bomOperation, loading: false, error: action.error } };

    // 보관 조건 목록 조회
    case FETCH_STORAGE_CONDITIONS.REQUEST:
      return { ...state, storageConditions: { ...state.storageConditions, loading: true, error: null } };
    case FETCH_STORAGE_CONDITIONS.SUCCESS:
      return { ...state, storageConditions: { data: action.payload, loading: false, error: null } };
    case FETCH_STORAGE_CONDITIONS.FAILURE:
      return { ...state, storageConditions: { ...state.storageConditions, loading: false, error: action.error } };

    // 보관 조건 상세 조회
    case FETCH_STORAGE_CONDITION.REQUEST:
      return { ...state, storageConditionDetail: { ...state.storageConditionDetail, loading: true, error: null } };
    case FETCH_STORAGE_CONDITION.SUCCESS:
      return { ...state, storageConditionDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_STORAGE_CONDITION.FAILURE:
      return { ...state, storageConditionDetail: { ...state.storageConditionDetail, loading: false, error: action.error } };

    // 보관 조건 등록
    case CREATE_STORAGE_CONDITION.REQUEST:
      return { ...state, storageOperation: { ...state.storageOperation, loading: true, error: null } };
    case CREATE_STORAGE_CONDITION.SUCCESS:
      return { ...state, storageOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_STORAGE_CONDITION.FAILURE:
      return { ...state, storageOperation: { ...state.storageOperation, loading: false, error: action.error } };

    // 보관 조건 수정
    case UPDATE_STORAGE_CONDITION.REQUEST:
      return { ...state, storageOperation: { ...state.storageOperation, loading: true, error: null } };
    case UPDATE_STORAGE_CONDITION.SUCCESS:
      return {
        ...state,
        storageConditions: {
          ...state.storageConditions,
          data: state.storageConditions.data.map((storage) =>
            storage.id === action.payload.id ? action.payload : storage
          ),
        },
        storageOperation: { data: action.payload, loading: false, error: null }
      };
    // BOM 삭제
    case DELETE_STORAGE_CONDITION.REQUEST:
      return { ...state, storageOperation: { ...state.storageOperation, loading: true, error: null } };
    case DELETE_STORAGE_CONDITION.SUCCESS:
      return { ...state, storageOperation: { data: action.payload, loading: false, error: null } };
    case DELETE_STORAGE_CONDITION.FAILURE:
      return { ...state, storageOperation: { ...state.storageOperation, loading: false, error: action.error } };
    case UPDATE_STORAGE_CONDITION.FAILURE:
      return { ...state, storageOperation: { ...state.storageOperation, loading: false, error: action.error } };

    // 보관 조건에 적용 품목 추가
    case ADD_STORAGE_CONDITION_ITEMS.REQUEST:
      return { ...state, addStorageConditionItems: { ...state.addStorageConditionItems, loading: true, error: null } };
    case ADD_STORAGE_CONDITION_ITEMS.SUCCESS:
      return {
        ...state,
        storageConditions: {
          ...state.storageConditions,
          data: state.storageConditions.data.map((storage) =>
            storage.id === action.payload.id ? action.payload : storage
          ),
        },
        addStorageConditionItems: { data: action.payload, loading: false, error: null }
      };
    case ADD_STORAGE_CONDITION_ITEMS.FAILURE:
      return { ...state, addStorageConditionItems: { ...state.addStorageConditionItems, loading: false, error: action.error } };

    // 보관 조건에서 적용 품목 제거
    case REMOVE_STORAGE_CONDITION_ITEM.REQUEST:
      return { ...state, removeStorageConditionItem: { ...state.removeStorageConditionItem, loading: true, error: null } };
    case REMOVE_STORAGE_CONDITION_ITEM.SUCCESS:
      return {
        ...state,
        storageConditions: {
          ...state.storageConditions,
          data: state.storageConditions.data.map((storage) =>
            storage.id === action.payload.id ? action.payload : storage
          ),
        },
        removeStorageConditionItem: { data: action.payload, loading: false, error: null }
      };
    case REMOVE_STORAGE_CONDITION_ITEM.FAILURE:
      return { ...state, removeStorageConditionItem: { ...state.removeStorageConditionItem, loading: false, error: action.error } };

    // 공장 목록 조회
    case FETCH_FACTORIES.REQUEST:
      return { ...state, factories: { ...state.factories, loading: true, error: null } };
    case FETCH_FACTORIES.SUCCESS:
      return { ...state, factories: { data: action.payload, loading: false, error: null } };
    case FETCH_FACTORIES.FAILURE:
      return { ...state, factories: { ...state.factories, loading: false, error: action.error } };

    // 공장 상세 조회
    case FETCH_FACTORY_BY_ID.REQUEST:
      return { ...state, factoryDetail: { ...state.factoryDetail, loading: true, error: null } };
    case FETCH_FACTORY_BY_ID.SUCCESS:
      return { ...state, factoryDetail: { data: action.payload, loading: false, error: null } };
    case FETCH_FACTORY_BY_ID.FAILURE:
      return { ...state, factoryDetail: { ...state.factoryDetail, loading: false, error: action.error } };

    // 공장 등록
    case CREATE_FACTORY.REQUEST:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: true, error: null } };
    case CREATE_FACTORY.SUCCESS:
      return { ...state, factoryOperation: { data: action.payload, loading: false, error: null } };
    case CREATE_FACTORY.FAILURE:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: false, error: action.error } };

    // 공장 수정
    case UPDATE_FACTORY.REQUEST:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: true, error: null } };
    case UPDATE_FACTORY.SUCCESS:
      return {
        ...state,
        factories: {
          ...state.factories,
          data: state.factories.data.map((factory) =>
            factory.id === action.payload.id ? action.payload : factory
          ),
        },
        factoryOperation: { data: action.payload, loading: false, error: null }
      };
    case UPDATE_FACTORY.FAILURE:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: false, error: action.error } };

    // 공장 삭제
    case DELETE_FACTORY.REQUEST:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: true, error: null } };
    case DELETE_FACTORY.SUCCESS:
      return { ...state, factoryOperation: { data: action.payload, loading: false, error: null } };
    case DELETE_FACTORY.FAILURE:
      return { ...state, factoryOperation: { ...state.factoryOperation, loading: false, error: action.error } };

    // 프로세스 목록 조회
    case FETCH_PROCESSES.REQUEST:
      return { ...state, processes: { ...state.processes, loading: true, error: null } };
    case FETCH_PROCESSES.SUCCESS:
      return { ...state, processes: { data: action.payload, loading: false, error: null } };
    case FETCH_PROCESSES.FAILURE:
      return { ...state, processes: { ...state.processes, loading: false, error: action.error } };

    // 공정 생성
    case CREATE_PROCESS.REQUEST:
      return { ...state, processes: { ...state.processes, loading: true, error: null } };
    case CREATE_PROCESS.SUCCESS:
      return {
        ...state,
        processes: {
          ...state.processes,
          data: [...state.processes.data, action.payload],
          loading: false,
          error: null
        }
      };
    case CREATE_PROCESS.FAILURE:
      return { ...state, processes: { ...state.processes, loading: false, error: action.error } };

    // 공장에 공정 추가
    case ADD_FACTORY_PROCESSES.REQUEST:
      return { ...state, factoryProcessOperation: { ...state.factoryProcessOperation, loading: true, error: null } };
    case ADD_FACTORY_PROCESSES.SUCCESS:
      return {
        ...state,
        factories: {
          ...state.factories,
          data: state.factories.data.map((factory) =>
            factory.id === action.payload.id ? action.payload : factory
          ),
        },
        factoryProcessOperation: { data: action.payload, loading: false, error: null }
      };
    case ADD_FACTORY_PROCESSES.FAILURE:
      return { ...state, factoryProcessOperation: { ...state.factoryProcessOperation, loading: false, error: action.error } };

    // 공장에서 공정 제거
    case REMOVE_FACTORY_PROCESS.REQUEST:
      return { ...state, removeFactoryProcess: { ...state.removeFactoryProcess, loading: true, error: null } };
    case REMOVE_FACTORY_PROCESS.SUCCESS:
      return {
        ...state,
        factories: {
          ...state.factories,
          data: state.factories.data.map((factory) =>
            factory.id === action.payload.id ? action.payload : factory
          ),
        },
        removeFactoryProcess: { data: action.payload, loading: false, error: null }
      };
    case REMOVE_FACTORY_PROCESS.FAILURE:
      return { ...state, removeFactoryProcess: { ...state.removeFactoryProcess, loading: false, error: action.error } };

    // UI 상태 관리
    case SET_BASIC_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case CLEAR_BASIC_ERROR:
      return {
        ...state,
        items: { ...state.items, error: null },
        itemDetail: { ...state.itemDetail, error: null },
        itemOperation: { ...state.itemOperation, error: null },
        boms: { ...state.boms, error: null },
        bomDetail: { ...state.bomDetail, error: null },
        bomOperation: { ...state.bomOperation, error: null },
        storageConditions: { ...state.storageConditions, error: null },
        storageConditionDetail: { ...state.storageConditionDetail, error: null },
        storageOperation: { ...state.storageOperation, error: null },
        addStorageConditionItems: { ...state.addStorageConditionItems, error: null },
        removeStorageConditionItem: { ...state.removeStorageConditionItem, error: null },
        factories: { ...state.factories, error: null },
        factoryDetail: { ...state.factoryDetail, error: null },
        factoryOperation: { ...state.factoryOperation, error: null },
        processes: { ...state.processes, error: null },
        factoryProcessOperation: { ...state.factoryProcessOperation, error: null },
        removeFactoryProcess: { ...state.removeFactoryProcess, error: null },
      };

    case RESET_BASIC_STATE:
      return initialState;

    default:
      return state;
  }
};

export default basicReducer;
