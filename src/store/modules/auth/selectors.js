/**
 * ==================== Auth Selectors ====================
 *
 * Selector란 무엇인가요?
 * - Redux 상태에서 필요한 데이터를 가져오는 함수
 * - 컴포넌트에서 useSelector와 함께 사용
 *
 * 왜 Selector를 사용하나요?
 * 1. 재사용성: 여러 컴포넌트에서 같은 상태를 가져올 때 중복 코드 제거
 * 2. 유지보수: 상태 구조가 바뀌어도 selector만 수정하면 됨
 * 3. 성능: 필요한 데이터만 선택적으로 가져옴
 * 4. 가독성: state.auth.isAuthenticated 대신 selectIsAuthenticated(state)
 *
 * 사용 예시:
 * const isAuthenticated = useSelector(selectIsAuthenticated);
 * const user = useSelector(selectCurrentUser);
 */

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

/**
 * ==================== 컴포넌트에서 사용 예시 ====================
 *
 * import { useSelector } from 'react-redux';
 * import { selectIsAuthenticated, selectCurrentUser, selectAuthLoading } from '../store/modules/auth/selectors';
 *
 * function MyComponent() {
 *   const isAuthenticated = useSelector(selectIsAuthenticated);
 *   const user = useSelector(selectCurrentUser);
 *   const loading = useSelector(selectAuthLoading);
 *
 *   if (loading) return <div>로딩 중...</div>;
 *   if (!isAuthenticated) return <div>로그인이 필요합니다</div>;
 *
 *   return <div>환영합니다, {user.name}님!</div>;
 * }
 */
