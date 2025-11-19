import { call, put, takeLatest } from 'redux-saga/effects';
import { itemsAPI, bomsAPI, factoriesAPI, storageConditionsAPI, processesAPI } from '../../../api';
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
  DELETE_STORAGE_CONDITION,
  FETCH_FACTORIES,
  FETCH_FACTORY_BY_ID,
  CREATE_FACTORY,
  UPDATE_FACTORY,
  DELETE_FACTORY,
  FETCH_PROCESSES,
  ADD_FACTORY_PROCESSES,
  fetchItems,
  fetchItemById,
  fetchItemByCode,
  createItem,
  updateItem,
  deleteItem,
  fetchBoms,
  fetchBomById,
  createBom,
  updateBom,
  deleteBom,
  fetchStorageConditions,
  fetchStorageCondition,
  createStorageCondition,
  updateStorageCondition,
  deleteStorageCondition,
  fetchFactories,
  fetchFactoryById,
  createFactory,
  updateFactory,
  deleteFactory,
  fetchProcesses,
  addFactoryProcesses,
} from './actions';

// ==================== 목데이터 ====================
// 원재료 마스터 데이터 (필요 시 사용)
// eslint-disable-next-line no-unused-vars
const rawMaterialMaster = [
  { code: 'RAW001', name: '닭고기(가슴살)' },
  { code: 'RAW002', name: '당근' },
  { code: 'RAW003', name: '양파' },
  { code: 'RAW004', name: '감자' },
  { code: 'RAW005', name: '대파' },
  { code: 'RAW006', name: '마늘' },
  { code: 'RAW007', name: '생강' },
  { code: 'RAW008', name: '간장' },
  { code: 'RAW009', name: '설탕' },
  { code: 'RAW010', name: '참기름' },
  { code: 'RAW011', name: '소금' },
  { code: 'RAW012', name: '후추' },
  { code: 'RAW013', name: '고춧가루' },
  { code: 'RAW014', name: '식용유' },
  { code: 'RAW015', name: '돼지고기(삼겹살)' },
  { code: 'RAW016', name: '소고기(불고기용)' },
  { code: 'RAW017', name: '두부' },
  { code: 'RAW018', name: '배추' },
  { code: 'RAW019', name: '무' },
  { code: 'RAW020', name: '애호박' },
  { code: 'RAW021', name: '버섯(표고)' },
  { code: 'RAW022', name: '버섯(양송이)' },
  { code: 'RAW023', name: '파프리카(빨강)' },
  { code: 'RAW024', name: '파프리카(노랑)' },
  { code: 'RAW025', name: '브로콜리' },
  { code: 'RAW026', name: '양배추' },
  { code: 'RAW027', name: '청경채' },
  { code: 'RAW028', name: '시금치' },
  { code: 'RAW029', name: '숙주' },
  { code: 'RAW030', name: '콩나물' },
];

let mockItems = [
  {
    id: 1,
    code: 'RAW001',
    name: '닭가슴살',
    category: '원재료',
    factoryId: 1,
    storageConditionId: '냉장',
    shelfLife: 7,
    shortage: 100,
    unit: 'kg',
    wholesalePrice: 5000,
    totalQuantity: 250,
  },
  {
    id: 2,
    code: 'FIN001',
    name: '콩부장쿠키',
    category: '완제품',
    factoryId: 2,
    storageConditionId: '실온',
    shelfLife: 30,
    shortage: 50,
    unit: 'box',
    wholesalePrice: 15000,
    totalQuantity: 120,
  },
  {
    id: 3,
    code: 'RAW002',
    name: '밀가루',
    category: '원재료',
    factoryId: 1,
    storageConditionId: '실온',
    shelfLife: 180,
    shortage: 200,
    unit: 'kg',
    wholesalePrice: 1500,
    totalQuantity: 500,
  },
  {
    id: 4,
    code: 'SEMI001',
    name: '반죽',
    category: '반재료',
    factoryId: 2,
    storageConditionId: '냉동',
    shelfLife: 90,
    shortage: 80,
    unit: 'kg',
    wholesalePrice: 3000,
    totalQuantity: 150,
  },
  {
    id: 5,
    code: 'CONS001',
    name: '포장박스',
    category: '소모품',
    factoryId: 1,
    storageConditionId: '실온',
    shelfLife: 999,
    shortage: 500,
    unit: 'ea',
    wholesalePrice: 500,
    totalQuantity: 1200,
  },
];

function* fetchItemsSaga(action) {
  try {
    const response = yield call(itemsAPI.getItems, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: [...] }
    const items = response.data?.data || response.data || [];
    const itemsArray = Array.isArray(items) ? items : [];
    
    yield put(fetchItems.success(itemsArray));
  } catch (error) {
    yield put(fetchItems.failure(error.response?.data?.message || '품목 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchItemByIdSaga(action) {
  try {
    const response = yield call(itemsAPI.getItemById, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const item = response.data?.data || response.data;
    
    if (item) {
      yield put(fetchItemById.success(item));
    } else {
      yield put(fetchItemById.failure('품목을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchItemById.failure(error.response?.data?.message || '품목 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* fetchItemByCodeSaga(action) {
  try {
    const response = yield call(itemsAPI.getItemByCode, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const item = response.data?.data || response.data;
    
    if (item) {
      yield put(fetchItemByCode.success(item));
    } else {
      yield put(fetchItemByCode.failure('품목을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchItemByCode.failure(error.response?.data?.message || '품목 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createItemSaga(action) {
  try {
    // 백엔드 API 형식에 맞게 데이터 변환
    const payload = action.payload;
    const itemData = {
      code: payload.code,
      name: payload.name,
      category: payload.category,
      unit: payload.unit,
      factory_id: payload.factoryId,
      shortage: payload.shortage,
      expiration_date: payload.shelfLife,
      wholesale_price: payload.wholesalePrice,
    };
    
    const response = yield call(itemsAPI.createItem, itemData);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const newItem = response.data?.data || response.data;
    
    yield put(createItem.success(newItem));
    
    // 목록 새로고침
    yield put(fetchItems.request());
  } catch (error) {
    yield put(createItem.failure(error.response?.data?.message || '품목 등록에 실패했습니다.'));
  }
}

function* updateItemSaga(action) {
  try {
    const { id, data } = action.payload;
    
    // 백엔드 API 형식에 맞게 데이터 변환
    const updateData = {
      code: data.code,
      name: data.name,
      category: data.category,
      unit: data.unit,
      factoryId: data.factoryId,
      shortage: data.shortage,
      expiration_date: data.shelfLife,
      wholesalePrice: data.wholesalePrice,
    };
    
    const response = yield call(itemsAPI.updateItem, id, updateData);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const updatedItem = response.data?.data || response.data;
    
    yield put(updateItem.success(updatedItem));
    
    // 목록 새로고침
    yield put(fetchItems.request());
  } catch (error) {
    yield put(updateItem.failure(error.response?.data?.message || '품목 수정에 실패했습니다.'));
  }
}

function* deleteItemSaga(action) {
  try {
    yield call(itemsAPI.deleteItem, action.payload);
    yield put(deleteItem.success({ id: action.payload }));
    
    // 목록 새로고침
    yield put(fetchItems.request());
  } catch (error) {
    yield put(deleteItem.failure(error.response?.data?.message || '품목 삭제에 실패했습니다.'));
  }
}

// BOM 목데이터
let mockBoms = [
  {
    id: 1,
    name: '애니콩 펫디너 비프',
    bomName: '애니콩 펫디너 비프',
    description: '비프 펫디너 제조용 BOM',
    updatedAt: '2025-10-13',
    updated_at: '2025-10-13',
    materials: [
      { id: 1, code: 'RAW016', name: '소고기(불고기용)', amount: 180, unit: 'g' },
      { id: 2, code: 'RAW003', name: '양파', amount: 80, unit: 'g' },
      { id: 3, code: 'RAW006', name: '마늘', amount: 20, unit: 'g' },
    ],
    components: [
      { id: 1, itemCode: 'RAW016', item: { code: 'RAW016', name: '소고기(불고기용)', unit: 'g' }, quantity: 180, unit: 'g' },
      { id: 2, itemCode: 'RAW003', item: { code: 'RAW003', name: '양파', unit: 'g' }, quantity: 80, unit: 'g' },
      { id: 3, itemCode: 'RAW006', item: { code: 'RAW006', name: '마늘', unit: 'g' }, quantity: 20, unit: 'g' },
    ],
  },
  {
    id: 2,
    name: '애니콩 펫디너 치킨',
    bomName: '애니콩 펫디너 치킨',
    description: '치킨 펫디너 제조용 BOM',
    updatedAt: '2025-10-10',
    updated_at: '2025-10-10',
    materials: [
      { id: 4, code: 'RAW001', name: '닭가슴살', amount: 200, unit: 'g' },
      { id: 5, code: 'RAW002', name: '밀가루', amount: 50, unit: 'g' },
      { id: 6, code: 'RAW003', name: '양파', amount: 30, unit: 'g' },
    ],
    components: [
      { id: 4, itemCode: 'RAW001', item: { code: 'RAW001', name: '닭가슴살', unit: 'g' }, quantity: 200, unit: 'g' },
      { id: 5, itemCode: 'RAW002', item: { code: 'RAW002', name: '밀가루', unit: 'g' }, quantity: 50, unit: 'g' },
      { id: 6, itemCode: 'RAW003', item: { code: 'RAW003', name: '양파', unit: 'g' }, quantity: 30, unit: 'g' },
    ],
  },
  {
    id: 3,
    name: '콩부장쿠키',
    bomName: '콩부장쿠키',
    description: '콩부장쿠키 제조용 BOM',
    updatedAt: '2025-09-28',
    updated_at: '2025-09-28',
    materials: [
      { id: 7, code: 'RAW002', name: '밀가루', amount: 2, unit: 'kg' },
      { id: 8, code: 'RAW001', name: '닭가슴살', amount: 0.5, unit: 'kg' },
      { id: 9, code: 'CONS001', name: '포장박스', amount: 1, unit: 'ea' },
    ],
    components: [
      { id: 7, itemCode: 'RAW002', item: { code: 'RAW002', name: '밀가루', unit: 'kg' }, quantity: 2, unit: 'kg' },
      { id: 8, itemCode: 'RAW001', item: { code: 'RAW001', name: '닭가슴살', unit: 'kg' }, quantity: 0.5, unit: 'kg' },
      { id: 9, itemCode: 'CONS001', item: { code: 'CONS001', name: '포장박스', unit: 'ea' }, quantity: 1, unit: 'ea' },
    ],
  },
];

// 보관 조건 목데이터 (StorageTemperature 컴포넌트 데이터)
let mockStorageConditions = [
  {
    id: 1,
    name: '상온',
    title: '상온 보관',
    temperature: '15°C - 25°C',
    minTemp: 15,
    maxTemp: 25,
    humidity: '40% - 60%',
    items: ['건조 식료', '포장재'],
  },
  {
    id: 2,
    name: '냉장',
    title: '냉장 보관',
    temperature: '0°C ~ 5°C',
    minTemp: 0,
    maxTemp: 5,
    humidity: '85% - 95%',
    items: ['신선 육류', '야채류', '반제품'],
  },
  {
    id: 3,
    name: '냉동',
    title: '냉동 보관',
    temperature: '-18°C 이하',
    minTemp: -18,
    maxTemp: -18,
    humidity: 'N/A',
    items: ['완제품', '냉동 육류'],
  },
];

// 공장 정보 목데이터 (FactoryInfo 컴포넌트 데이터)
let mockFactories = [
  {
    id: 1,
    name: '애니콩 의성 공장',
    address: '경북 의성군 안계면 용기5길 12 애니콩 본사',
    processes: ['원재료 입고', '절단', '세척', '전처리', '농산물 가공'],
  },
  {
    id: 2,
    name: '애니콩 상주 공장',
    address: '경북 상주시 냉림1길 66 애니콩 건물 상주지사',
    processes: ['혼합/배합', '조리/제이킹', '포장', '냉동보관'],
  },
];

function* fetchBomsSaga(action) {
  try {
    const response = yield call(bomsAPI.getBoms, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: { rows: [...], count: number } }
    const boms = response.data?.data?.rows || response.data?.rows || response.data?.data || response.data || [];
    const bomsArray = Array.isArray(boms) ? boms : [];
    
    yield put(fetchBoms.success(bomsArray));
  } catch (error) {
    yield put(fetchBoms.failure(error.response?.data?.message || 'BOM 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchBomByIdSaga(action) {
  try {
    const response = yield call(bomsAPI.getBom, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const bom = response.data?.data || response.data;
    
    if (bom) {
      yield put(fetchBomById.success(bom));
    } else {
      yield put(fetchBomById.failure('BOM을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchBomById.failure(error.response?.data?.message || 'BOM 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createBomSaga(action) {
  try {
    // 백엔드 API 형식에 맞게 데이터 변환
    const payload = action.payload;
    const bomData = {
      name: payload.name,
      code: payload.code,
      description: payload.description,
      lines: payload.lines || payload.components || [],
    };
    
    const response = yield call(bomsAPI.createBom, bomData);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const newBom = response.data?.data || response.data;
    
    yield put(createBom.success(newBom));
    
    // 목록 새로고침
    yield put(fetchBoms.request());
  } catch (error) {
    yield put(createBom.failure(error.response?.data?.message || 'BOM 등록에 실패했습니다.'));
  }
}

function* updateBomSaga(action) {
  try {
    const { id, data } = action.payload;
    
    // 백엔드 API 형식에 맞게 데이터 변환
    const updateData = {
      name: data.name,
      description: data.description,
      lines: data.lines || data.components || [],
    };
    
    const response = yield call(bomsAPI.updateBom, id, updateData);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const updatedBom = response.data?.data || response.data;
    
    yield put(updateBom.success(updatedBom));
    
    // 목록 새로고침
    yield put(fetchBoms.request());
  } catch (error) {
    yield put(updateBom.failure(error.response?.data?.message || 'BOM 수정에 실패했습니다.'));
  }
}

function* deleteBomSaga(action) {
  try {
    yield call(bomsAPI.deleteBom, action.payload);
    yield put(deleteBom.success({ id: action.payload }));
    
    // 목록 새로고침
    yield put(fetchBoms.request());
  } catch (error) {
    yield put(deleteBom.failure(error.response?.data?.message || 'BOM 삭제에 실패했습니다.'));
  }
}

// ==================== 보관 조건(Storage) Saga ====================
function* fetchStorageConditionsSaga(action) {
  try {
    const response = yield call(storageConditionsAPI.getStorageConditions);
    
    // 백엔드 응답 형식: { ok: true, data: [...] }
    const conditions = response.data?.data || response.data || [];
    const conditionsArray = Array.isArray(conditions) ? conditions : [];
    
    yield put(fetchStorageConditions.success(conditionsArray));
  } catch (error) {
    yield put(fetchStorageConditions.failure(error.response?.data?.message || '보관 조건 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchStorageConditionSaga(action) {
  try {
    const response = yield call(storageConditionsAPI.getStorageCondition, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const storage = response.data?.data || response.data;
    
    if (storage) {
      yield put(fetchStorageCondition.success(storage));
    } else {
      yield put(fetchStorageCondition.failure('보관 조건을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchStorageCondition.failure(error.response?.data?.message || '보관 조건 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createStorageConditionSaga(action) {
  try {
    const response = yield call(storageConditionsAPI.createStorageCondition, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const newStorage = response.data?.data || response.data;
    
    yield put(createStorageCondition.success(newStorage));
    
    // 목록 새로고침
    yield put(fetchStorageConditions.request());
  } catch (error) {
    yield put(createStorageCondition.failure(error.response?.data?.message || '보관 조건 등록에 실패했습니다.'));
  }
}

function* updateStorageConditionSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(storageConditionsAPI.updateStorageCondition, id, data);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const updatedStorage = response.data?.data || response.data;
    
    yield put(updateStorageCondition.success(updatedStorage));
    
    // 목록 새로고침
    yield put(fetchStorageConditions.request());
  } catch (error) {
    yield put(updateStorageCondition.failure(error.response?.data?.message || '보관 조건 수정에 실패했습니다.'));
  }
}

function* deleteStorageConditionSaga(action) {
  try {
    yield call(storageConditionsAPI.deleteStorageCondition, action.payload);
    yield put(deleteStorageCondition.success({ id: action.payload }));
    
    // 목록 새로고침
    yield put(fetchStorageConditions.request());
  } catch (error) {
    yield put(deleteStorageCondition.failure(error.response?.data?.message || '보관 조건 삭제에 실패했습니다.'));
  }
}

// ==================== 공장 정보(Factory) Saga ====================
function* fetchFactoriesSaga(action) {
  try {
    const response = yield call(factoriesAPI.getFactories);
    
    // 백엔드 응답 형식: { ok: true, data: [...] }
    const factories = response.data?.data || response.data || [];
    const factoriesArray = Array.isArray(factories) ? factories : [];
    
    yield put(fetchFactories.success(factoriesArray));
  } catch (error) {
    yield put(fetchFactories.failure(error.response?.data?.message || '공장 정보를 불러오는데 실패했습니다.'));
  }
}

function* fetchFactoryByIdSaga(action) {
  try {
    const response = yield call(factoriesAPI.getFactory, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const factory = response.data?.data || response.data;
    
    if (factory) {
      yield put(fetchFactoryById.success(factory));
    } else {
      yield put(fetchFactoryById.failure('공장을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchFactoryById.failure(error.response?.data?.message || '공장 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createFactorySaga(action) {
  try {
    const response = yield call(factoriesAPI.createFactory, action.payload);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const newFactory = response.data?.data || response.data;
    
    yield put(createFactory.success(newFactory));
    
    // 목록 새로고침
    yield put(fetchFactories.request());
  } catch (error) {
    yield put(createFactory.failure(error.response?.data?.message || '공장 등록에 실패했습니다.'));
  }
}

function* updateFactorySaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(factoriesAPI.updateFactory, id, data);
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const updatedFactory = response.data?.data || response.data;
    
    yield put(updateFactory.success(updatedFactory));
    
    // 목록 새로고침
    yield put(fetchFactories.request());
  } catch (error) {
    yield put(updateFactory.failure(error.response?.data?.message || '공장 수정에 실패했습니다.'));
  }
}

function* deleteFactorySaga(action) {
  try {
    yield call(factoriesAPI.deleteFactory, action.payload);
    yield put(deleteFactory.success({ id: action.payload }));
    
    // 목록 새로고침
    yield put(fetchFactories.request());
  } catch (error) {
    yield put(deleteFactory.failure(error.response?.data?.message || '공장 삭제에 실패했습니다.'));
  }
}

// ==================== 프로세스 관리 Saga ====================
function* fetchProcessesSaga() {
  try {
    const response = yield call(processesAPI.getProcesses);
    
    // 백엔드 응답 형식: { ok: true, data: [...] }
    const processes = response.data?.data || response.data || [];
    const processesArray = Array.isArray(processes) ? processes : [];
    
    yield put(fetchProcesses.success(processesArray));
  } catch (error) {
    yield put(fetchProcesses.failure(error.response?.data?.message || '프로세스 목록을 불러오는데 실패했습니다.'));
  }
}

function* addFactoryProcessesSaga(action) {
  try {
    const { factoryId, processIds } = action.payload;
    
    // 백엔드 API 형식: POST /api/factories/:id/processes { processIds: [...] }
    const response = yield call(factoriesAPI.addProcesses, factoryId, { processIds });
    
    // 백엔드 응답 형식: { ok: true, data: {...} }
    const updatedFactory = response.data?.data || response.data;
    
    yield put(addFactoryProcesses.success(updatedFactory));
    
    // 공장 목록 새로고침
    yield put(fetchFactories.request());
  } catch (error) {
    yield put(addFactoryProcesses.failure(error.response?.data?.message || '공정 추가에 실패했습니다.'));
  }
}

export default function* basicSaga() {
  yield takeLatest(FETCH_ITEMS.REQUEST, fetchItemsSaga);
  yield takeLatest(FETCH_ITEM_BY_ID.REQUEST, fetchItemByIdSaga);
  yield takeLatest(FETCH_ITEM_BY_CODE.REQUEST, fetchItemByCodeSaga);
  yield takeLatest(CREATE_ITEM.REQUEST, createItemSaga);
  yield takeLatest(UPDATE_ITEM.REQUEST, updateItemSaga);
  yield takeLatest(DELETE_ITEM.REQUEST, deleteItemSaga);
  yield takeLatest(FETCH_BOMS.REQUEST, fetchBomsSaga);
  yield takeLatest(FETCH_BOM_BY_ID.REQUEST, fetchBomByIdSaga);
  yield takeLatest(CREATE_BOM.REQUEST, createBomSaga);
  yield takeLatest(UPDATE_BOM.REQUEST, updateBomSaga);
  yield takeLatest(DELETE_BOM.REQUEST, deleteBomSaga);
  yield takeLatest(FETCH_STORAGE_CONDITIONS.REQUEST, fetchStorageConditionsSaga);
  yield takeLatest(FETCH_STORAGE_CONDITION.REQUEST, fetchStorageConditionSaga);
  yield takeLatest(CREATE_STORAGE_CONDITION.REQUEST, createStorageConditionSaga);
  yield takeLatest(UPDATE_STORAGE_CONDITION.REQUEST, updateStorageConditionSaga);
  yield takeLatest(DELETE_STORAGE_CONDITION.REQUEST, deleteStorageConditionSaga)
  yield takeLatest(FETCH_FACTORIES.REQUEST, fetchFactoriesSaga);
  yield takeLatest(FETCH_FACTORY_BY_ID.REQUEST, fetchFactoryByIdSaga);
  yield takeLatest(CREATE_FACTORY.REQUEST, createFactorySaga);
  yield takeLatest(UPDATE_FACTORY.REQUEST, updateFactorySaga);
  yield takeLatest(DELETE_FACTORY.REQUEST, deleteFactorySaga);
  yield takeLatest(FETCH_PROCESSES.REQUEST, fetchProcessesSaga);
  yield takeLatest(ADD_FACTORY_PROCESSES.REQUEST, addFactoryProcessesSaga);
}
