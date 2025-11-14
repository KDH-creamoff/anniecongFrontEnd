
/**
 * 로그인 여부 확인
 * 사용처: 로그인/로그아웃 버튼 표시, 페이지 접근 권한 체크
 */
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

/**
 * 현재 로그인한 사용자 정보
 * 사용처: 사용자 프로필 표시, 사용자 이름 표시
 */
export const selectCurrentUser = (state) => state.auth.user;

/**
 * API 요청 로딩 상태
 * 사용처: 로그인 버튼에 "로딩 중..." 표시, 스피너 표시
 */
export const selectAuthLoading = (state) => state.auth.loading;

/**
 * 에러 메시지
 * 사용처: 로그인 실패 시 에러 메시지 표시
 */
export const selectAuthError = (state) => state.auth.error;

/**
 * 인증 토큰
 * 사용처: API 요청 시 토큰 확인 (보통은 자동으로 처리됨)
 */
export const selectAuthToken = (state) => state.auth.token;
