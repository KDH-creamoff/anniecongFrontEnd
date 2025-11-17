import { all } from 'redux-saga/effects';

// 각 도메인 사가 import
import authSaga from './modules/auth/sagas';
import userSaga from './modules/user/sagas';
import inventorySaga from './modules/inventory/sagas';
import basicSaga from './modules/basic/sagas';
import manufacturingSaga from './modules/manufacturing/sagas';
// import labelSaga from './modules/label/sagas'; // ⚠️ 미사용: Label 페이지에서 labelAPI를 직접 호출함
import issuingSaga from './modules/issuing/sagas';
import dashSaga from './modules/dash/sagas';
// import receivingSaga from './modules/receiving/sagas';
// import shippingSaga from './modules/shipping/sagas';
import approvalSaga from './modules/approval/sagas';

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
    // labelSaga(), // ⚠️ 비활성화: Label.jsx와 SavedLabelList.jsx에서 labelAPI 직접 호출
    issuingSaga(),
    dashSaga(),
    // receivingSaga(),
    // shippingSaga(),
    approvalSaga(),
  ]);
}
