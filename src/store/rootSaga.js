import { all } from 'redux-saga/effects';

// 각 도메인 사가 import
import authSaga from './modules/auth/sagas';
import userSaga from './modules/user/sagas';
import inventorySaga from './modules/inventory/sagas';
import basicSaga from './modules/basic/sagas';
import manufacturingSaga from './modules/manufacturing/sagas';
// import shippingSaga from './modules/shipping/sagas';
// import receivingSaga from './modules/receiving/sagas';
// import approvalSaga from './modules/approval/sagas';
// import dashboardSaga from './modules/dashboard/sagas';

/**
 * 모든 사가를 통합하는 루트 사가
 */
export default function* rootSaga() {
  yield all([
    // 각 도메인의 사가
    authSaga(),
    userSaga(),
    inventorySaga(),
    basicSaga(),
    manufacturingSaga(),
    // shippingSaga(),
    // receivingSaga(),
    // approvalSaga(),
    // dashboardSaga(),
  ]);
}
