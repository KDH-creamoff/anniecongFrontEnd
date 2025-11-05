/**
 * User 모듈 셀렉터
 * 컴포넌트에서 상태를 조회할 때 사용
 */

// ==================== 사용자 목록 ====================
export const selectUsers = (state) => state.user.users.data;
export const selectUsersLoading = (state) => state.user.users.loading;
export const selectUsersError = (state) => state.user.users.error;

// ==================== 사용자 상세 ====================
export const selectUserDetail = (state) => state.user.userDetail.data;
export const selectUserDetailLoading = (state) => state.user.userDetail.loading;
export const selectUserDetailError = (state) => state.user.userDetail.error;

// ==================== 접근 로그 ====================
export const selectAccessLogs = (state) => state.user.accessLogs.data;
export const selectAccessLogsLoading = (state) => state.user.accessLogs.loading;
export const selectAccessLogsError = (state) => state.user.accessLogs.error;

// ==================== 생성/수정/삭제 상태 ====================
export const selectCreateUserStatus = (state) => state.user.createStatus;
export const selectUpdateUserStatus = (state) => state.user.updateStatus;
export const selectDeleteUserStatus = (state) => state.user.deleteStatus;

// ==================== UI 상태 ====================
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectPagination = (state) => state.user.pagination;

// ==================== 파생 데이터 셀렉터 ====================
// 활성 사용자만 필터링
export const selectActiveUsers = (state) => {
  const users = selectUsers(state);
  return users ? users.filter((user) => user.status === 'active') : [];
};

// 특정 역할의 사용자 필터링
export const selectUsersByRole = (role) => (state) => {
  const users = selectUsers(state);
  return users ? users.filter((user) => user.role === role) : [];
};

// 사용자 총 수
export const selectTotalUsers = (state) => {
  const users = selectUsers(state);
  return users ? users.length : 0;
};

// 로딩 상태 통합
export const selectIsAnyLoading = (state) => {
  return (
    selectUsersLoading(state) ||
    selectUserDetailLoading(state) ||
    selectAccessLogsLoading(state) ||
    state.user.createStatus.loading ||
    state.user.updateStatus.loading ||
    state.user.deleteStatus.loading
  );
};
