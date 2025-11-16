import { call, put, takeLatest } from 'redux-saga/effects';
import { approvalAPI } from '../../../api';
import {
  FETCH_APPROVAL_INBOX,
  FETCH_APPROVAL_DETAIL,
  APPROVE_REQUEST,
  REJECT_REQUEST,
  fetchApprovalInbox,
  fetchApprovalDetail,
  approveRequest,
  rejectRequest,
} from './actions';

// ==================== 결재함 목록 조회 ====================
function* fetchApprovalInboxSaga() {
  try {
    const response = yield call(approvalAPI.getInbox);
    yield put(fetchApprovalInbox.success(response.data));
  } catch (error) {
    yield put(fetchApprovalInbox.failure(error.response?.data?.message || '결재함 목록을 불러오지 못했습니다.'));
  }
}

// ==================== 결재 상세 조회 ====================
function* fetchApprovalDetailSaga(action) {
  try {
    const response = yield call(approvalAPI.getApproval, action.payload);
    yield put(fetchApprovalDetail.success(response.data));
  } catch (error) {
    yield put(fetchApprovalDetail.failure(error.response?.data?.message || '결재 상세 정보를 불러오지 못했습니다.'));
  }
}

// ==================== 결재 승인 ====================
function* approveRequestSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(approvalAPI.approve, id, data);
    yield put(approveRequest.success(response.data));
    // 승인 후 결재함 목록 새로고침
    yield put(fetchApprovalInbox.request());
  } catch (error) {
    yield put(approveRequest.failure(error.response?.data?.message || '결재 승인에 실패했습니다.'));
  }
}

// ==================== 결재 반려 ====================
function* rejectRequestSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(approvalAPI.reject, id, data);
    yield put(rejectRequest.success(response.data));
    // 반려 후 결재함 목록 새로고침
    yield put(fetchApprovalInbox.request());
  } catch (error) {
    yield put(rejectRequest.failure(error.response?.data?.message || '결재 반려에 실패했습니다.'));
  }
}

// ==================== Root Saga ====================
export default function* approvalSaga() {
  yield takeLatest(FETCH_APPROVAL_INBOX.REQUEST, fetchApprovalInboxSaga);
  yield takeLatest(FETCH_APPROVAL_DETAIL.REQUEST, fetchApprovalDetailSaga);
  yield takeLatest(APPROVE_REQUEST.REQUEST, approveRequestSaga);
  yield takeLatest(REJECT_REQUEST.REQUEST, rejectRequestSaga);
}