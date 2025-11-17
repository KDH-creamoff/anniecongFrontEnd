// 결재함 목록
export const selectApprovalInbox = (state) => state.approval.inbox.data;
export const selectApprovalInboxLoading = (state) => state.approval.inbox.loading;
export const selectApprovalInboxError = (state) => state.approval.inbox.error;

// 결재 상세
export const selectApprovalDetail = (state) => state.approval.detail.data;
export const selectApprovalDetailLoading = (state) => state.approval.detail.loading;
export const selectApprovalDetailError = (state) => state.approval.detail.error;

// 승인 작업
export const selectApproveOperation = (state) => state.approval.approveOperation.data;
export const selectApproveOperationLoading = (state) => state.approval.approveOperation.loading;
export const selectApproveOperationError = (state) => state.approval.approveOperation.error;

// 반려 작업
export const selectRejectOperation = (state) => state.approval.rejectOperation.data;
export const selectRejectOperationLoading = (state) => state.approval.rejectOperation.loading;
export const selectRejectOperationError = (state) => state.approval.rejectOperation.error;

// 문서 생성
export const selectCreateDocument = (state) => state.approval.createDocument?.data;
export const selectCreateDocumentLoading = (state) => state.approval.createDocument?.loading;
export const selectCreateDocumentError = (state) => state.approval.createDocument?.error;

// 필터
export const selectApprovalFilter = (state) => state.approval.filter;