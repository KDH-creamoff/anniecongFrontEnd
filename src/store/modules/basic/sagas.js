import { put, takeLatest, delay } from 'redux-saga/effects';
// import { itemsAPI, bomsAPI, storageAPI } from '../../../api'; // TODO: 백엔드 준비 시 주석 해제
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
} from './actions';

// ==================== 목데이터 ====================
let mockItems = [
  {
    id: 1,
    code: 'RAW001',
    name: '닭가슴살',
    category: 'RawMaterial',
    factoryId: 1,
    storageConditionId: '냉장',
    shortage: 100,
    unit: 'kg',
    wholesalePrice: 5000,
  },
  {
    id: 2,
    code: 'FIN001',
    name: '콩부장쿠키',
    category: 'Finished',
    factoryId: 2,
    storageConditionId: '실온',
    shortage: 50,
    unit: 'box',
    wholesalePrice: 15000,
  },
];

function* fetchItemsSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(itemsAPI.getItems, action.payload);
    // yield put(fetchItems.success(response.data));

    // 임시 목데이터 사용
    yield delay(500);
    yield put(fetchItems.success(mockItems));
  } catch (error) {
    yield put(fetchItems.failure(error.response?.data?.message || '품목 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchItemByIdSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(itemsAPI.getItemById, action.payload);
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
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
let mockBoms = [];

// 보관 조건 목데이터
let mockStorageConditions = [
  { id: 1, name: '냉동', minTemp: -18, maxTemp: -10 },
  { id: 2, name: '냉장', minTemp: 0, maxTemp: 10 },
  { id: 3, name: '실온', minTemp: 15, maxTemp: 25 },
];

function* fetchBomsSaga(/* action */) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(bomsAPI.getBomById, action.payload);
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(bomsAPI.createBom, action.payload);
    // yield put(createBom.success(response.data));

    yield delay(500);
    const newBom = {
      id: mockBoms.length + 1,
      ...action.payload,
    };
    mockBoms = [...mockBoms, newBom];
    yield put(createBom.success(newBom));
  } catch (error) {
    yield put(createBom.failure(error.response?.data?.message || 'BOM 등록에 실패했습니다.'));
  }
}

function* updateBomSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const { id, data } = action.payload;
    // const response = yield call(bomsAPI.updateBom, id, data);
    // yield put(updateBom.success(response.data));

    yield delay(500);
    const { id, data } = action.payload;
    const index = mockBoms.findIndex((b) => b.id === id);
    if (index !== -1) {
      mockBoms[index] = { ...mockBoms[index], ...data };
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
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(bomsAPI.deleteBom, action.payload);
    // yield put(deleteBom.success(response.data));

    yield delay(500);
    mockBoms = mockBoms.filter((b) => b.id !== action.payload);
    yield put(deleteBom.success({ id: action.payload }));
  } catch (error) {
    yield put(deleteBom.failure(error.response?.data?.message || 'BOM 삭제에 실패했습니다.'));
  }
}

function* fetchStorageConditionsSaga(/* action */) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(storageAPI.getStorage, action.payload);
    // yield put(fetchStorageConditions.success(response.data));

    yield delay(500);
    yield put(fetchStorageConditions.success(mockStorageConditions));
  } catch (error) {
    yield put(fetchStorageConditions.failure(error.response?.data?.message || '보관 조건 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchStorageConditionSaga(action) {
  try {
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(storageAPI.getStorage, action.payload);
    // yield put(fetchStorageCondition.success(response.data));

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
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const response = yield call(storageAPI.createStorage, action.payload);
    // yield put(createStorageCondition.success(response.data));

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
    // TODO: 백엔드 준비 시 아래 코드로 교체
    // const { id, data } = action.payload;
    // const response = yield call(storageAPI.updateStorage, id, data);
    // yield put(updateStorageCondition.success(response.data));

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
}
