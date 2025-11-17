import { put, takeLatest, delay } from 'redux-saga/effects';
import { itemsAPI, bomsAPI, factoriesAPI, storageConditionsAPI } from '../../../api';
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
    // const response = yield call(itemsAPI.getItems, action.payload);
    // yield put(fetchItems.success(response.data));

    yield delay(500);
    yield put(fetchItems.success(mockItems));
  } catch (error) {
    yield put(fetchItems.failure(error.response?.data?.message || '품목 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchItemByIdSaga(action) {
  try {
    // const response = yield call(itemsAPI.getItem, action.payload);
    // yield put(fetchItemById.success(response.data));

    yield delay(500);
    const item = mockItems.find((item) => item.id === action.payload);
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
    // TODO: 백엔드에 getItemByCode API 없음 - 임시 목데이터 사용
    // const response = yield call(itemsAPI.getItemByCode, action.payload);
    // yield put(fetchItemByCode.success(response.data));

    yield delay(500);
    const item = mockItems.find((item) => item.code === action.payload);
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
    // const response = yield call(itemsAPI.createItem, action.payload);
    // yield put(createItem.success(response.data));

    yield delay(500);
    const newItem = {
      id: mockItems.length + 1,
      ...action.payload,
    };
    mockItems = [...mockItems, newItem];
    yield put(createItem.success(newItem));
  } catch (error) {
    yield put(createItem.failure(error.response?.data?.message || '품목 등록에 실패했습니다.'));
  }
}

function* updateItemSaga(action) {
  try {
    // const { id, data } = action.payload;
    // const response = yield call(itemsAPI.updateItem, id, data);
    // yield put(updateItem.success(response.data));

    yield delay(500);
    const { id, data } = action.payload;
    const index = mockItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockItems[index] = { ...mockItems[index], ...data };
      yield put(updateItem.success(mockItems[index]));
    } else {
      yield put(updateItem.failure('품목을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateItem.failure(error.response?.data?.message || '품목 수정에 실패했습니다.'));
  }
}

function* deleteItemSaga(action) {
  try {
    // const response = yield call(itemsAPI.deleteItem, action.payload);
    // yield put(deleteItem.success(response.data));

    yield delay(500);
    mockItems = mockItems.filter((item) => item.id !== action.payload);
    yield put(deleteItem.success({ id: action.payload }));
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
    // const response = yield call(bomsAPI.getBoms, action.payload);
    // yield put(fetchBoms.success(response.data));

    yield delay(500);
    yield put(fetchBoms.success(mockBoms));
  } catch (error) {
    yield put(fetchBoms.failure(error.response?.data?.message || 'BOM 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchBomByIdSaga(action) {
  try {
    // const response = yield call(bomsAPI.getBom, action.payload);
    // yield put(fetchBomById.success(response.data));

    yield delay(500);
    const bom = mockBoms.find((b) => b.id === action.payload);
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
    // const response = yield call(bomsAPI.createBom, action.payload);
    // yield put(createBom.success(response.data));

    yield delay(500);
    const currentDate = new Date().toISOString().split('T')[0];
    const newBom = {
      id: mockBoms.length + 1,
      ...action.payload,
      updatedAt: currentDate,
      updated_at: currentDate,
    };
    mockBoms = [...mockBoms, newBom];
    yield put(createBom.success(newBom));
  } catch (error) {
    yield put(createBom.failure(error.response?.data?.message || 'BOM 등록에 실패했습니다.'));
  }
}

function* updateBomSaga(action) {
  try {
    // const { id, data } = action.payload;
    // const response = yield call(bomsAPI.updateBom, id, data);
    // yield put(updateBom.success(response.data));

    yield delay(500);
    const { id, data } = action.payload;
    const index = mockBoms.findIndex((b) => b.id === id);
    if (index !== -1) {
      // 업데이트 날짜 자동 갱신
      const currentDate = new Date().toISOString().split('T')[0];
      mockBoms[index] = {
        ...mockBoms[index],
        ...data,
        updatedAt: currentDate,
        updated_at: currentDate,
      };
      yield put(updateBom.success(mockBoms[index]));
    } else {
      yield put(updateBom.failure('BOM을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateBom.failure(error.response?.data?.message || 'BOM 수정에 실패했습니다.'));
  }
}

function* deleteBomSaga(action) {
  try {
    // const response = yield call(bomsAPI.deleteBom, action.payload);
    // yield put(deleteBom.success(response.data));

    yield delay(500);
    mockBoms = mockBoms.filter((b) => b.id !== action.payload);
    yield put(deleteBom.success({ id: action.payload }));
  } catch (error) {
    yield put(deleteBom.failure(error.response?.data?.message || 'BOM 삭제에 실패했습니다.'));
  }
}

// ==================== 보관 조건(Storage) Saga ====================
function* fetchStorageConditionsSaga(action) {
  try {
    // const response = yield call(storageConditionsAPI.getStorageConditions);
    // yield put(fetchStorageConditions.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchStorageConditions.success(mockStorageConditions));
  } catch (error) {
    yield put(fetchStorageConditions.failure(error.response?.data?.message || '보관 조건 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchStorageConditionSaga(action) {
  try {
    // const response = yield call(storageConditionsAPI.getStorageCondition, action.payload);
    // yield put(fetchStorageCondition.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const storage = mockStorageConditions.find((s) => s.id === action.payload);
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
    // const response = yield call(storageConditionsAPI.createStorageCondition, action.payload);
    // yield put(createStorageCondition.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const newStorage = {
      id: mockStorageConditions.length + 1,
      ...action.payload,
    };
    mockStorageConditions = [...mockStorageConditions, newStorage];
    yield put(createStorageCondition.success(newStorage));
  } catch (error) {
    yield put(createStorageCondition.failure(error.response?.data?.message || '보관 조건 등록에 실패했습니다.'));
  }
}

function* updateStorageConditionSaga(action) {
  try {
    // const { id, data } = action.payload;
    // const response = yield call(storageConditionsAPI.updateStorageCondition, id, data);
    // yield put(updateStorageCondition.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const { id, data } = action.payload;
    const index = mockStorageConditions.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockStorageConditions[index] = { ...mockStorageConditions[index], ...data };
      yield put(updateStorageCondition.success(mockStorageConditions[index]));
    } else {
      yield put(updateStorageCondition.failure('보관 조건을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateStorageCondition.failure(error.response?.data?.message || '보관 조건 수정에 실패했습니다.'));
  }
}

function* deleteStorageConditionSaga(action) {
  try {
    // const response = yield call(storageConditionsAPI.deleteStorageCondition, action.payload);
    // yield put(deleteStorageCondition.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    mockStorageConditions = mockStorageConditions.filter((s) => s.id !== action.payload);
    yield put(deleteStorageCondition.success({ id: action.payload }));
  } catch (error) {
    yield put(deleteStorageCondition.failure(error.response?.data?.message || '보관 조건 삭제에 실패했습니다.'));
  }
}

// ==================== 공장 정보(Factory) Saga ====================
function* fetchFactoriesSaga(action) {
  try {
    // const response = yield call(factoriesAPI.getFactories);
    // yield put(fetchFactories.success(response.data));

    yield delay(500);
    yield put(fetchFactories.success(mockFactories));
  } catch (error) {
    yield put(fetchFactories.failure(error.response?.data?.message || '공장 조건을 불러오는데 실패했습니다.'));
  }
}

function* fetchFactoryByIdSaga(action) {
  try {
    // const response = yield call(factoriesAPI.getFactory, action.payload);
    // yield put(fetchFactoryById.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const factory = mockFactories.find((f) => f.id === action.payload);
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
    // const response = yield call(factoriesAPI.createFactory, action.payload);
    // yield put(createFactory.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const newFactory = {
      id: mockFactories.length + 1,
      ...action.payload,
    };
    mockFactories = [...mockFactories, newFactory];
    yield put(createFactory.success(newFactory));
  } catch (error) {
    yield put(createFactory.failure(error.response?.data?.message || '공장 등록에 실패했습니다.'));
  }
}

function* updateFactorySaga(action) {
  try {
    // const { id, data } = action.payload;
    // const response = yield call(factoriesAPI.updateFactory, id, data);
    // yield put(updateFactory.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    const { id, data } = action.payload;
    const index = mockFactories.findIndex((f) => f.id === id);
    if (index !== -1) {
      mockFactories[index] = { ...mockFactories[index], ...data };
      yield put(updateFactory.success(mockFactories[index]));
    } else {
      yield put(updateFactory.failure('공장을 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateFactory.failure(error.response?.data?.message || '공장 수정에 실패했습니다.'));
  }
}

function* deleteFactorySaga(action) {
  try {
    // const response = yield call(factoriesAPI.deleteFactory, action.payload);
    // yield put(deleteFactory.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    mockFactories = mockFactories.filter((f) => f.id !== action.payload);
    yield put(deleteFactory.success({ id: action.payload }));
  } catch (error) {
    yield put(deleteFactory.failure(error.response?.data?.message || '공장 삭제에 실패했습니다.'));
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
}
