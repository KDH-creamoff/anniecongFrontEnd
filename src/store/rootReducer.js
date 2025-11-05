import { combineReducers } from 'redux';

// 각 도메인 리듀서 import
import authReducer from './modules/auth/reducer';
import userReducer from './modules/user/reducer';
import inventoryReducer from './modules/inventory/reducer';
// import manufacturingReducer from './modules/manufacturing/reducer';
// import shippingReducer from './modules/shipping/reducer';
// import receivingReducer from './modules/receiving/reducer';
// import approvalReducer from './modules/approval/reducer';
// import basicReducer from './modules/basic/reducer';
// import dashboardReducer from './modules/dashboard/reducer';

const rootReducer = combineReducers({
  // 각 도메인별 리듀서
  auth: authReducer,
  user: userReducer,
  inventory: inventoryReducer,
  // 나머지 모듈은 필요에 따라 추가
  // manufacturing: manufacturingReducer,
  // shipping: shippingReducer,
  // receiving: receivingReducer,
  // approval: approvalReducer,
  // basic: basicReducer,
  // dashboard: dashboardReducer,
});

export default rootReducer;
