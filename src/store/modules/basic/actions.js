import { createRequestTypes, createAsyncActions } from '../../../utils/sagaUtils';

// ==================== 액션 타입 ====================

// 품목 관리
export const FETCH_ITEMS = createRequestTypes('basic/FETCH_ITEMS');
export const FETCH_ITEM_BY_ID = createRequestTypes('basic/FETCH_ITEM_BY_ID');
export const FETCH_ITEM_BY_CODE = createRequestTypes('basic/FETCH_ITEM_BY_CODE');
export const CREATE_ITEM = createRequestTypes('basic/CREATE_ITEM');
export const UPDATE_ITEM = createRequestTypes('basic/UPDATE_ITEM');
export const DELETE_ITEM = createRequestTypes('basic/DELETE_ITEM');

// 공장 정보 관리
export const FETCH_FACTORIES = createRequestTypes('basic/FETCH_FACTORIES');
export const FETCH_FACTORY_BY_ID = createRequestTypes('basic/FETCH_FACTORY_BY_ID');
export const CREATE_FACTORY = createRequestTypes('basic/CREATE_FACTORY');
export const UPDATE_FACTORY = createRequestTypes('basic/UPDATE_FACTORY');
export const DELETE_FACTORY = createRequestTypes('basic/DELETE_FACTORY');

// BOM 관리
export const FETCH_BOMS = createRequestTypes('basic/FETCH_BOMS');
export const FETCH_BOM_BY_ID = createRequestTypes('basic/FETCH_BOM_BY_ID');
export const CREATE_BOM = createRequestTypes('basic/CREATE_BOM');
export const UPDATE_BOM = createRequestTypes('basic/UPDATE_BOM');
export const DELETE_BOM = createRequestTypes('basic/DELETE_BOM');

// 보관 조건 관리
export const FETCH_STORAGE_CONDITIONS = createRequestTypes('basic/FETCH_STORAGE_CONDITIONS');
export const FETCH_STORAGE_CONDITION = createRequestTypes('basic/FETCH_STORAGE_CONDITION');
export const CREATE_STORAGE_CONDITION = createRequestTypes('basic/CREATE_STORAGE_CONDITION');
export const UPDATE_STORAGE_CONDITION = createRequestTypes('basic/UPDATE_STORAGE_CONDITION');
export const DELETE_STORAGE_CONDITION = createRequestTypes('basic/DELETE_STORAGE_CONDITION');

// UI 상태 관리
export const SET_BASIC_FILTER = 'basic/SET_BASIC_FILTER';
export const CLEAR_BASIC_ERROR = 'basic/CLEAR_BASIC_ERROR';
export const RESET_BASIC_STATE = 'basic/RESET_BASIC_STATE';

// ==================== 액션 생성자 ====================

// 품목 관리
export const fetchItems = createAsyncActions(FETCH_ITEMS);
export const fetchItemById = createAsyncActions(FETCH_ITEM_BY_ID);
export const fetchItemByCode = createAsyncActions(FETCH_ITEM_BY_CODE);
export const createItem = createAsyncActions(CREATE_ITEM);
export const updateItem = createAsyncActions(UPDATE_ITEM);
export const deleteItem = createAsyncActions(DELETE_ITEM);

// BOM 관리
export const fetchBoms = createAsyncActions(FETCH_BOMS);
export const fetchBomById = createAsyncActions(FETCH_BOM_BY_ID);
export const createBom = createAsyncActions(CREATE_BOM);
export const updateBom = createAsyncActions(UPDATE_BOM);
export const deleteBom = createAsyncActions(DELETE_BOM);

// 보관 조건 관리
export const fetchStorageConditions = createAsyncActions(FETCH_STORAGE_CONDITIONS);
export const fetchStorageCondition = createAsyncActions(FETCH_STORAGE_CONDITION);
export const createStorageCondition = createAsyncActions(CREATE_STORAGE_CONDITION);
export const updateStorageCondition = createAsyncActions(UPDATE_STORAGE_CONDITION);

// 공장 정보 관리
export const fetchFactories = createAsyncActions(FETCH_FACTORIES);
export const fetchFactoryById = createAsyncActions(FETCH_FACTORY_BY_ID);
export const createFactory = createAsyncActions(CREATE_FACTORY);
export const updateFactory = createAsyncActions(UPDATE_FACTORY);
export const deleteFactory = createAsyncActions(DELETE_FACTORY);

// UI 액션 생성자
export const setBasicFilter = (filter) => ({
  type: SET_BASIC_FILTER,
  payload: filter,
});

export const clearBasicError = () => ({
  type: CLEAR_BASIC_ERROR,
});

export const resetBasicState = () => ({
  type: RESET_BASIC_STATE,
});
