import { combineReducers } from 'redux';

// 각 도메인 리듀서 import
import authReducer from './modules/auth/reducer';
import userReducer from './modules/user/reducer';
import inventoryReducer from './modules/inventory/reducer';
import basicReducer from './modules/basic/reducer';
import receivingReducer from './modules/receiving/reducer';
import manufacturingReducer from './modules/manufacturing/reducer';
import labelReducer from './modules/label/reducer';
import issuingReducer from './modules/issuing/reducer';
import dashReducer from './modules/dash/reducer';
import shippingReducer from './modules/shipping/reducer';
import approvalReducer from './modules/approval/reducer';

const rootReducer = combineReducers({
  // 각 도메인별 리듀서
  auth: authReducer,
  user: userReducer,
  inventory: inventoryReducer,
  basic: basicReducer,
  receiving: receivingReducer,
  manufacturing: manufacturingReducer,
  label: labelReducer,
  issuing: issuingReducer,
  dash: dashReducer,
  shipping: shippingReducer,
  approval: approvalReducer,
});

export default rootReducer;
